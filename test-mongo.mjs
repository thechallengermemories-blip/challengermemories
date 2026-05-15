import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Dynamic import ensures mongoose loads AFTER dns is configured
const mongoose = (await import("mongoose")).default;

const URI = "mongodb+srv://joshi:gainx5398@challengermemories.0owtzyi.mongodb.net/space";

console.log("DNS servers:", dns.getServers());
console.log("Connecting...");

try {
  await mongoose.connect(URI, { serverSelectionTimeoutMS: 8000 });
  console.log("✅ Connected!");
  await mongoose.disconnect();
} catch (err) {
  console.error("❌ Failed:", err.message);
}