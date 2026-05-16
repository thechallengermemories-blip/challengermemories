/**
 * lib/compressMedia.ts
 *
 * Client-side compression before uploading to Cloudinary.
 *
 * IMAGES → converted to WebP at configurable quality (default 82 %)
 * VIDEOS → re-encoded via canvas frame-capture into WebM/VP8
 *           (works in all modern browsers without WASM / FFmpeg)
 *
 * Drop-in: takes a File, returns a (smaller) File with the same name.
 *
 * ─── TUNEABLE CONSTANTS ────────────────────────────────────────────────────
 */

const IMAGE_CONFIG = {
  /** Output quality 0–1. 0.82 is ~40–60 % smaller than lossless PNG/JPG. */
  quality: 0.82,
  /** Cap the longest edge (px). Set to Infinity to skip downscaling. */
  maxDimension: 2048,
  outputType: "image/webp" as const,
};

const VIDEO_CONFIG = {
  /**
   * Target bitrate in bits-per-second.
   * 2_500_000 = 2.5 Mbps — good for 1080p web video.
   * Lower for smaller files: 1_000_000 = 1 Mbps is fine for 720p.
   */
  videoBitsPerSecond: 2_500_000,
  audioBitsPerSecond: 128_000,
  /**
   * Preferred MIME types tried in order.
   * VP9/WebM gives the best compression; VP8/WebM is the safe fallback.
   * The browser picks the first one it supports.
   */
  preferredMimeTypes: [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ],
  /** Scale the longest video edge to this max (px). Null = no resize. */
  maxDimension: 1280,
  /** Frames per second for the canvas capture stream. */
  fps: 30,
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE COMPRESSION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compresses any browser-supported image (JPG/PNG/GIF/WebP/HEIC*)
 * to WebP and optionally resizes it.
 *
 * *HEIC requires the browser to decode it first; Safari does, Chrome doesn't.
 */
export async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // ── Compute output dimensions ──────────────────────────────────────────
      let { naturalWidth: w, naturalHeight: h } = img;
      const max = IMAGE_CONFIG.maxDimension;

      if (w > max || h > max) {
        if (w >= h) {
          h = Math.round((h / w) * max);
          w = max;
        } else {
          w = Math.round((w / h) * max);
          h = max;
        }
      }

      // ── Draw to canvas & export ────────────────────────────────────────────
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Image compression failed"));
          const outName = file.name.replace(/\.[^.]+$/, ".webp");
          resolve(new File([blob], outName, { type: IMAGE_CONFIG.outputType }));
        },
        IMAGE_CONFIG.outputType,
        IMAGE_CONFIG.quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = objectUrl;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO COMPRESSION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Re-encodes a video by:
 *   1. Playing it in a hidden <video> element
 *   2. Capturing frames via captureStream() → MediaRecorder → WebM
 *
 * This is pure browser-native — no WASM, no FFmpeg, no extra deps.
 *
 * Limitations (inherent to browser MediaRecorder):
 *   • Output is always WebM (VP8/VP9 + Opus audio)
 *   • Encoding speed depends on the client CPU
 *   • Very long videos (>15 min) may consume significant memory
 *
 * For heavy production workloads consider Cloudinary's on-the-fly
 * transcoding (f_auto, q_auto) as a Cloudinary-side alternative.
 */
export async function compressVideo(
  file: File,
  onProgress?: (pct: number) => void
): Promise<File> {
  // ── Pick the best supported MIME type ─────────────────────────────────────
  const mimeType = VIDEO_CONFIG.preferredMimeTypes.find((m) =>
    MediaRecorder.isTypeSupported(m)
  );
  if (!mimeType) {
    console.warn("[compressVideo] No supported WebM codec found — uploading original.");
    return file;
  }

  return new Promise((resolve, reject) => {
    const videoEl = document.createElement("video");
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.preload = "auto";
    videoEl.src = URL.createObjectURL(file);

    videoEl.onloadedmetadata = async () => {
      const duration = videoEl.duration;

      // ── Compute canvas size ──────────────────────────────────────────────
      let vw = videoEl.videoWidth;
      let vh = videoEl.videoHeight;
      const maxD = VIDEO_CONFIG.maxDimension;

      if (maxD && (vw > maxD || vh > maxD)) {
        if (vw >= vh) {
          vh = Math.round((vh / vw) * maxD);
          vw = maxD;
        } else {
          vw = Math.round((vw / vh) * maxD);
          vh = maxD;
        }
      }

      // ── Set up canvas capture ────────────────────────────────────────────
      const canvas = document.createElement("canvas");
      canvas.width = vw;
      canvas.height = vh;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      // captureStream is non-standard but supported in all modern browsers
      const stream = (canvas as any).captureStream(VIDEO_CONFIG.fps) as MediaStream;

      // ── Attempt to capture audio track from the video element ────────────
      try {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(videoEl);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination); // keep playback audio live
        dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t));
      } catch {
        // Audio capture may fail on some browsers/OS — video-only is fine
      }

      // ── MediaRecorder ────────────────────────────────────────────────────
      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: VIDEO_CONFIG.videoBitsPerSecond,
        audioBitsPerSecond: VIDEO_CONFIG.audioBitsPerSecond,
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        URL.revokeObjectURL(videoEl.src);
        const blob = new Blob(chunks, { type: mimeType.split(";")[0] });
        const outName = file.name.replace(/\.[^.]+$/, ".webm");
        resolve(new File([blob], outName, { type: "video/webm" }));
      };

      recorder.onerror = (e) => reject((e as any).error ?? new Error("MediaRecorder error"));

      // ── Draw loop: paint each frame to canvas ────────────────────────────
      let animFrame: number;

      const drawFrame = () => {
        if (videoEl.paused || videoEl.ended) return;
        ctx.drawImage(videoEl, 0, 0, vw, vh);
        onProgress?.(Math.min(99, (videoEl.currentTime / duration) * 100));
        animFrame = requestAnimationFrame(drawFrame);
      };

      videoEl.onended = () => {
        cancelAnimationFrame(animFrame);
        onProgress?.(100);
        recorder.stop();
      };

      // ── Start ────────────────────────────────────────────────────────────
      recorder.start(100); // collect data every 100 ms
      videoEl.play().then(drawFrame).catch(reject);
    };

    videoEl.onerror = () => {
      URL.revokeObjectURL(videoEl.src);
      reject(new Error("Failed to load video for compression"));
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED ENTRY POINT  ← use this in StoryForm
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compress a File based on its type.
 * Pass an optional `onProgress` callback (0–100) for videos.
 *
 * Usage in StoryForm.tsx:
 *
 *   import { compressMedia } from "@/lib/compressMedia";
 *
 *   // Inside handleSubmit, before building FormData:
 *   const compressed = await Promise.all(
 *     mediaFiles.map((m) => compressMedia(m.file, m.type))
 *   );
 *   compressed.forEach((file, i) => {
 *     formData.append(`media_${i}`, file);
 *     formData.append(`media_${i}_type`, mediaFiles[i].type);
 *   });
 */
export async function compressMedia(
  file: File,
  type: "image" | "video",
  onProgress?: (pct: number) => void
): Promise<File> {
  try {
    if (type === "image") return await compressImage(file);
    if (type === "video") return await compressVideo(file, onProgress);
    return file;
  } catch (err) {
    // If compression fails for any reason, fall back to the original file
    console.warn(`[compressMedia] Compression failed for "${file.name}", using original.`, err);
    return file;
  }
}