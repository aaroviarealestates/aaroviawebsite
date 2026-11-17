import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

const VIDEO_TYPES: Record<string, string> = {
  "video/mp4": ".mp4",
  "video/webm": ".webm",
};

export async function uploadMediaFile(
  value: FormDataEntryValue | null,
  options: { allowVideo?: boolean } = {},
): Promise<string | undefined> {
  if (!(value instanceof File) || value.size === 0) return undefined;

  const extension = options.allowVideo ? VIDEO_TYPES[value.type] : IMAGE_TYPES[value.type];
  if (!extension) {
    const acceptedTypes = options.allowVideo ? "MP4 or WebM video" : "JPEG, PNG, WebP, GIF, or AVIF image";
    throw new Error(`Unsupported media type. Choose a ${acceptedTypes}.`);
  }
  const maxSize = options.allowVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
  if (value.size > maxSize) throw new Error(`The uploaded file exceeds the ${options.allowVideo ? "50 MB" : "10 MB"} limit.`);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${randomUUID()}${extension}`;
  await writeFile(path.join(uploadDir, filename), Buffer.from(await value.arrayBuffer()));
  return `/uploads/${filename}`;
}
