import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { CustomerSchema } from '@/zod/customer';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const customer = await Customer.findById(params.id);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();

    const validated = CustomerSchema.partial().parse(body); // allows partial updates

    const updated = await Customer.findByIdAndUpdate(params.id, validated, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deleted = await Customer.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof Error && 'issues' in error) {
    return NextResponse.json({ error: 'Validation failed', details: (error as any).issues }, { status: 400 });
  }
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
}
