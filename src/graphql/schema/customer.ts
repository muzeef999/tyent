// src/graphql/schema/customer.ts
import { gql } from "graphql-tag";

export const customerTypeDefs = gql`
  type Customer {
    id: ID!
    name: String!
    contactNumber: String!
    email: String!
    address: String!
    remarks: String
    installedModel: String!
    price: Float!
    invoiceNumber: String!
    serialNumber: String!
    warranty: Int!
    amcRenewed: Int!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getCustomers: [Customer!]!
    getCustomerById(id: ID!): Customer
  }

  extend type Mutation {
    createCustomer(
      name: String!
      contactNumber: String!
      email: String!
      address: String!
      warranty: Int!
      installedModel: String!
      price: Float!
      invoiceNumber: String!
      serialNumber: String!
      amcRenewed: Int!
      remarks: String
    ): Customer!

    updateCustomer(
      id: ID!
      name: String
      contactNumber: String
      email: String
      address: String
      warranty: Int
      installedModel: String
      price: Float
      invoiceNumber: String
      serialNumber: String
      amcRenewed: Int
      remarks: String
    ): Customer!

    deleteCustomer(id: ID!): String
  }
`;
