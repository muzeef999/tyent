// src/graphql/resolvers/customer.ts

import Customer from "@/models/Customer";

export const customerResolvers = {
  Query: {
    getCustomers: async () => {
      return await Customer.find();
    },
    getCustomerById: async (_: unknown, { id }: { id: string }) => {
      return await Customer.findById(id);
    },
  },

  Mutation: {
    createCustomer: async (_: unknown, args: unknown) => {
      return await Customer.create(args);
    },
    updateCustomer: async (_: unknown, { id, ...rest }: { id: string; [key: string]: unknown }) => {
      return await Customer.findByIdAndUpdate(id, rest, { new: true });
    },
    deleteCustomer: async (_: unknown, { id }: { id: string }) => {
      await Customer.findByIdAndDelete(id);
      return "Customer deleted successfully";
    },
  },
};
