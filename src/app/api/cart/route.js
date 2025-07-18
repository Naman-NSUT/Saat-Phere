import { dbConnect } from '@/src/lib/db';
import Cart from '@/models/Cart';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  await dbConnect();
  const user = await currentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const cart = await Cart.findOne({ userId: user.id }).populate('items.productId');
  return Response.json(cart || { items: [] });
}

export async function POST(req) {
  await dbConnect();
  const user = await currentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const data = await req.json();
  const cart = await Cart.findOneAndUpdate(
    { userId: user.id },
    { $set: { items: data.items } },
    { upsert: true, new: true }
  );
  return Response.json(cart);
}

export async function DELETE() {
  await dbConnect();
  const user = await currentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  await Cart.findOneAndDelete({ userId: user.id });
  return new Response('Cart cleared', { status: 204 });
} 