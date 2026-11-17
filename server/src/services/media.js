// Uploads images to Cloudinary so the owner can change product / offer photos
// from the admin dashboard without editing files.
import crypto from 'node:crypto';

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.CLOUDINARY_FOLDER ?? 'mahadharshni-herblab';

export const mediaConfigured = Boolean(CLOUD && KEY && SECRET);

const DATA_URL = /^data:(image\/(?:png|jpe?g|webp|gif));base64,([A-Za-z0-9+/=\s]+)$/;

export async function uploadImage(dataUrl) {
  if (!mediaConfigured) throw Object.assign(new Error('Image upload is not configured on the server.'), { status: 503 });
  const match = DATA_URL.exec(String(dataUrl ?? ''));
  if (!match) throw Object.assign(new Error('Please choose a PNG, JPG, WEBP or GIF image.'), { status: 400 });

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .createHash('sha1')
    .update(`folder=${FOLDER}&timestamp=${timestamp}${SECRET}`)
    .digest('hex');

  const form = new FormData();
  form.append('file', dataUrl);
  form.append('api_key', KEY);
  form.append('timestamp', String(timestamp));
  form.append('folder', FOLDER);
  form.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: 'POST', body: form });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw Object.assign(new Error(body?.error?.message ?? `Cloudinary upload failed (${res.status})`), { status: 502 });
  }
  return { url: body.secure_url, width: body.width, height: body.height };
}
