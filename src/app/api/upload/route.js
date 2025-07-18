import { currentUser } from '@clerk/nextjs/server';
import { isAdmin } from '@/src/lib/isAdmin';
import cloudinary from '@/src/lib/cloudinary';

export async function POST(req) {
  const user = await currentUser();
  if (!isAdmin(user)) return new Response('Unauthorized', { status: 401 });
  const data = await req.formData();
  const file = data.get('file');
  if (!file) return new Response('No file uploaded', { status: 400 });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    }).end(buffer);
  });
  return Response.json({ url: upload.secure_url });
} 