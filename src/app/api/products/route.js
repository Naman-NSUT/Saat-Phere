import { dbConnect } from '@/src/lib/db';
import Product from '@/models/Product';
import { currentUser } from '@clerk/nextjs/server';
import { isAdmin } from '@/src/lib/isAdmin';

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return Response.json(products);
}

export async function POST(req) {
  await dbConnect();
  const user = await currentUser();
  if (!isAdmin(user)) return new Response('Unauthorized', { status: 401 });
  const data = await req.json();
  const product = await Product.create(data);
  return Response.json(product);
} 