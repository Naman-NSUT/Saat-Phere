import { dbConnect } from '@/src/lib/db';
import Order from '@/models/Order';
import { currentUser } from '@clerk/nextjs/server';
import { isAdmin } from '@/src/lib/isAdmin';

export async function GET(req) {
  await dbConnect();
  const user = await currentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  if (isAdmin(user)) {
    const orders = await Order.find().populate('items.productId').populate('shippingAddress');
    return Response.json(orders);
  } else {
    const orders = await Order.find({ userId: user.id }).populate('items.productId').populate('shippingAddress');
    return Response.json(orders);
  }
}

export async function POST(req) {
  await dbConnect();
  const user = await currentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const data = await req.json();
  const order = await Order.create({
    userId: user.id,
    ...data,
  });
  return Response.json(order);
} 