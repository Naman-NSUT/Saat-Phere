import { dbConnect } from '@/src/lib/db';
import Product from '@/models/Product';
import { currentUser } from '@clerk/nextjs/server';
import { isAdmin } from '@/src/lib/isAdmin';

export async function GET(req, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id);
  if (!product) return new Response('Not found', { status: 404 });
  return Response.json(product);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const user = await currentUser();
  if (!isAdmin(user)) return new Response('Unauthorized', { status: 401 });
  const data = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(product);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const user = await currentUser();
  if (!isAdmin(user)) return new Response('Unauthorized', { status: 401 });
  await Product.findByIdAndDelete(params.id);
  return new Response('Deleted', { status: 204 });
} 