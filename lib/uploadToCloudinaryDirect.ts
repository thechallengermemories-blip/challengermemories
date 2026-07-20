// Place at: lib/uploadToCloudinaryDirect.ts

type SignatureData = {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
  eager?: string | null;
};

/**
 * Uploads a file directly from the browser to Cloudinary, bypassing our
 * own API route entirely. Uses XMLHttpRequest (not fetch) because fetch
 * has no upload-progress event.
 */
export function uploadFileDirectToCloudinary(
  file: File | Blob,
  resourceType: "image" | "video",
  sigData: SignatureData,
  onProgress?: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`;
        console.log("🟢 [direct upload] target URL:", url);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sigData.apiKey);
    formData.append("timestamp", String(sigData.timestamp));
    formData.append("signature", sigData.signature);
    formData.append("folder", sigData.folder);

    // Must match exactly what the server signed in /api/cloudinary-signature
    if (sigData.eager) {
      formData.append("eager", sigData.eager);
      formData.append("eager_async", "true");
    }

    xhr.open("POST", url);

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable && onProgress) {
        onProgress((evt.loaded / evt.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve(res.secure_url as string);
        } catch {
          reject(new Error("Unexpected response from Cloudinary."));
        }
      } else {
        console.error("Cloudinary upload failed:", xhr.responseText);
        reject(new Error(`Upload failed (${xhr.status}). Please try again.`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload."));
    xhr.send(formData);
  });
}