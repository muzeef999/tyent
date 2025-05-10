import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { NextRequest, NextResponse } from 'next/server';

// export const POST =  async(req: Request) => {
//   try {
//     await dbConnect();
//     const body = await req.json();

//     const validated = CustomerSchema.parse(body);

//     const newCustomer = await Customer.create(validated);
//     return NextResponse.json(newCustomer, { status: 201 });
//   } catch (error: unknown) {
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error occurred' }, { status: 500 });
//   }
// }

export const GET = async(req:NextRequest)  => {
  
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  try {

    await dbConnect();
    const customers = await Customer.find().skip((page -1) * limit).limit(limit).lean();

    const total = await Customer.countDocuments();
    return NextResponse.json({customers, total});
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error occurred' }, { status: 500 });
  }
}

