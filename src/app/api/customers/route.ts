import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { CustomerSchema } from '@/zod/customer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validated = CustomerSchema.parse(body);

    const newCustomer = await Customer.create(validated);
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find().sort({ createdAt: -1 });
    return NextResponse.json(customers);
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
