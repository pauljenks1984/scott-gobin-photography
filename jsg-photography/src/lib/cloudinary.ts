import axios from "axios";

export type CloudinaryImage = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  tags?: string[];
  context?: Record<string,string>;
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const DEFAULT_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "photography";

export async function fetchImagesByFolder(folder: string = DEFAULT_FOLDER): Promise<CloudinaryImage[]> {
  // Cloudinary provides a JSON list URL for folders in the format:
  // https://res.cloudinary.com/<cloud_name>/image/list/<folder>.json
  // Note: This works when you enable "Auto derived resources" in Cloudinary or upload a list.
  // Alternatively you can use the Admin API from a server-side function.
  try {
    const path = folder.replace(/^\/+/, ""); // strip leading slash
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${encodeURIComponent(path)}.json`;
    const res = await axios.get(url);
    const resources = res.data.resources || [];
    return resources.map((r: any) => ({
      asset_id: r.asset_id,
      public_id: r.public_id,
      secure_url: r.secure_url,
      width: r.width,
      height: r.height,
      tags: r.tags,
      context: r.context && r.context.custom ? r.context.custom : undefined
    }));
  } catch (err) {
    console.error("Error fetching Cloudinary images:", err && err.toString());
    return [];
  }
}
