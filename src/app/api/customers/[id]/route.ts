import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
  req: NextRequest,
  { params }: { params: Promise< { type: string; id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error: unknown) {
    return handleError(error);
  }
}

type ZodErrorWithIssues = Error & {
  issues?: unknown;
};

function handleError(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'issues' in error
  ) {
    const zodError = error as ZodErrorWithIssues;
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: zodError.issues,
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
}
