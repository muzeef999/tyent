// src/app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import Customer from "@/models/Customer";
import dbConnect from "@/lib/mongodb";
import { Customers } from "@/types";

// Connect to MongoDB
await dbConnect();

// Define GraphQL Schema
const typeDefs = gql`
  type Service {
    type: String!
    date: String
    status: String
    remarks: String
  }

  type Payment {
    amount: Float!
    status: String!
    mode: String!
    receivedDate: String
    pendingAmount: Float
    remarks: String
  }

  type Customer {
    id: ID!
    name: String!
    contactNumber: String!
    email: String!
    address: String!
    installedModel: String!
    price: Float!
    invoiceNumber: String!
    serialNumber: String!
    warranty: Int!
    amcRenewed: Int!
    serviceHistory: [Service!]
    upcomingServices: [Service!]
    payments: [Payment!]
    remarks: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getCustomers: [Customer!]!
    getCustomerById(id: ID!): Customer
    getCustomerServiceHistory:[CustomerServiceHistory!]!
  }

  type CustomerServiceHistory {
    name: String!
    email: String!
    contactNumber: String!
    price: Float!
    serviceHistory: [Service!]
  }

  type Mutation {
    createCustomer(
      name: String!
      contactNumber: String!
      email: String!
      address: String!
      installedModel: String!
      price: Float!
      invoiceNumber: String!
      serialNumber: String!
      warranty: Int!
      amcRenewed: Int!
      remarks: String
    ): Customer!

    updateCustomer(
      id: ID!
      name: String
      contactNumber: String
      email: String
      address: String
      installedModel: String
      price: Float
      invoiceNumber: String
      serialNumber: String
      warranty: Int
      amcRenewed: Int
      remarks: String
    ): Customer!

    deleteCustomer(id: ID!): String

    addService(
      customerId: ID!
      type: String!
      date: String
      status: String
      remarks: String
    ): Customer!

    addPayment(
      customerId: ID!
      amount: Float!
      status: String!
      mode: String!
      receivedDate: String
      pendingAmount: Float
      remarks: String
    ): Customer!
  }
`;

// Define Resolvers
const resolvers = {
  Query: {
    getCustomers: async () => {
      return await Customer.find();
    },
    getCustomerById: async (_: unknown, { id }: { id: string }) => {
      return await Customer.findById(id);
    },
    getCustomerServiceHistory: async () => {
      return await Customer.find().select("name email contactNumber price serviceHistory");
    },
  },
  Mutation: {
    createCustomer: async (_: unknown, customerInput: Customers) => {
      const newCustomer = new Customer(customerInput);
      await newCustomer.save();
      return newCustomer;
    },
    updateCustomer: async (_: unknown, { id, ...updates }: Customers) => {
      const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return updatedCustomer;
    },
    deleteCustomer: async (_: unknown, { id }: { id: string }) => {
      await Customer.findByIdAndDelete(id);
      return "Customer deleted successfully.";
    },
    addService: async (
      _: unknown,
      { customerId, type, date, status, remarks }: any
    ) => {
      const customer = await Customer.findById(customerId);
      if (!customer) throw new Error("Customer not found");

      customer.serviceHistory.push({ type, date, status, remarks });
      await customer.save();
      return customer;
    },
    addPayment: async (
      _: unknown,
      { customerId, amount, status, mode, receivedDate, pendingAmount, remarks }: any
    ) => {
      const customer = await Customer.findById(customerId);
      if (!customer) throw new Error("Customer not found");

      customer.payments.push({
        amount,
        status,
        mode,
        receivedDate,
        pendingAmount,
        remarks,
      });
      await customer.save();
      return customer;
    },
  },
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
export const DELETE = startServerAndCreateNextHandler(server);
export const PUT = startServerAndCreateNextHandler(server);
