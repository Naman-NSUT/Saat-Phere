import { dbConnect } from '@/src/lib/db';
import Order from '@/models/Order';
import { currentUser } from '@clerk/nextjs/server';
import { isAdmin } from '@/src/lib/isAdmin';

export async function GET(req, { params }) {
  await dbConnect();
  const user = await currentUser();
  const order = await Order.findById(params.id).populate('items.productId').populate('shippingAddress');
  if (!order) return new Response('Not found', { status: 404 });
  if (!isAdmin(user) && order.userId !== user.id) return new Response('Unauthorized', { status: 401 });
  return Response.json(order);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const user = await currentUser();
  if (!isAdmin(user)) return new Response('Unauthorized', { status: 401 });
  const data = await req.json();
  const order = await Order.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(order);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const user = await currentUser();
  if (!isAdmin(user)) return new Response('Unauthorized', { status: 401 });
  await Order.findByIdAndDelete(params.id);
  return new Response('Deleted', { status: 204 });
} 