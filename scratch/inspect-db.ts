import fs from "fs";
import path from "path";
import mongoose, { Schema } from "mongoose";
import dns from "dns";

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
  pageId: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
});

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);

async function inspect() {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to URI:", uri ? uri.substring(0, 30) + "..." : "NONE");
  await mongoose.connect(uri!, { bufferCommands: false });
  const docs = await Content.find({}).lean();
  console.log("Documents found in MongoDB Content collection:", docs.length);
  for (const doc of docs) {
    const dataKeys = Object.keys((doc as any).data || {});
    console.log(`PageID: ${(doc as any).pageId} -> Data Keys:`, dataKeys);
  }
  process.exit(0);
}

inspect().catch((err) => {
  console.error("Inspect error:", err);
  process.exit(1);
});
