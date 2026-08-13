import fs from "fs";
import path from "path";
import mongoose, { Schema } from "mongoose";
import dns from "dns";
import { defaultContent } from "../src/lib/content/defaults";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch {}

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  for (const line of envConfig.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  }
}

const contentSchema = new Schema({
  pageId: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);

async function syncAll() {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to URI:", uri ? uri.substring(0, 35) + "..." : "NONE");
  await mongoose.connect(uri!, { bufferCommands: false });

  for (const [pageId, data] of Object.entries(defaultContent)) {
    const res = await Content.findOneAndUpdate(
      { pageId },
      { $set: { data, updatedAt: new Date() } },
      { upsert: true, new: true },
    );
    console.log(`[Synced Page] -> pageId: "${pageId}" updated in MongoDB Atlas.`);
  }

  console.log("All page content successfully synced into MongoDB Atlas!");
  process.exit(0);
}

syncAll().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
