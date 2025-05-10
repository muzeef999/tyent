// app/api/insert-customers/route.ts
import { NextRequest, NextResponse } from "next/server";
import  customerData from "./customers.json"
import connectMongo from "@/lib/mongodb";
import Customer from "@/models/Customer";

export const POST = async (req: NextRequest) => {
  try {
    
        await connectMongo();

        const result = await Customer.insertMany(customerData);



    return NextResponse.json({ message: "Data inserted successfully", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error inserting data", error }, { status: 500 });
  }
};
