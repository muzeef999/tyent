"use client";
import Input from "@/components/ui/Input";
import { Customers } from "@/types";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "sonner";


const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $name: String!
    $contactNumber: String!
    $email: String!
    $address: String!
    $warranty: Int!
    $installedModel: String!
    $price: Float!
    $invoiceNumber: String!
    $serialNumber: String!
    $amcRenewed: Int!
    $remarks: String
  ) {
    createCustomer(
      name: $name
      contactNumber: $contactNumber
      email: $email
      address: $address
      warranty: $warranty
      installedModel: $installedModel
      price: $price
      invoiceNumber: $invoiceNumber
      serialNumber: $serialNumber
      amcRenewed: $amcRenewed
      remarks: $remarks
    ) {
      id
      name
      email
    }
  }
`;

const Page = () => {
  const [form, setForm] = useState<Customers>({
    id: "",
    name: "",
    email: "",
    serialNumber: "",
    contactNumber: "",
    invoiceNumber: "",
    price: 1,
    installedModel: "",
    warranty: 0,
    amcRenewed: 0,
    serviceHistory: [],
    upcomingServices: [],
    address: "",
    remarks: "",
  });


    const [createCustomer,] = useMutation(CREATE_CUSTOMER);


  const oneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const formSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCustomer({
        variables: {
          ...form,
          warranty: Number(form.warranty),
          price: Number(form.price),
          amcRenewed: Number(form.amcRenewed),
        },
      });
      setForm({
        id: "",
        name: "",
        contactNumber: "",
        email: "",
        address: "",
        warranty: 1,
        installedModel: "",
        price: 0,
        invoiceNumber: "",
        serialNumber: "",
        amcRenewed: 1,
        remarks: "",
        serviceHistory: [],
        upcomingServices: [],
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <>
      <form
        onSubmit={formSubmit}
        className="w-full max-w-4xl mx-auto p-6  space-y-6"
      >
        {/* Customer Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="text"
            name="name"
            placeholder="Customer Name"
            label="Customer Name"
            value={form.name}
            onChange={oneChangeHandler}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={form.email}
            onChange={oneChangeHandler}
            required
          />
          <Input
            type="tel"
            name="contactNumber"
            placeholder="Phone Number"
            label="Phone Number"
            value={form.contactNumber}
            onChange={oneChangeHandler}
            required
          />
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number (e.g., INV12345)"
            label="Invoice Number"
            value={form.invoiceNumber}
            onChange={oneChangeHandler}
            required
          />
          <Input
            type="text"
            name="serialNumber"
            placeholder="Serial Number (e.g., SN-1234-5678)"
            label="Serial Number"
            value={form.serialNumber}
            onChange={oneChangeHandler}
            required
          />
          <Input
            type="number"
            name="price"
            placeholder="Enter Price (e.g., 1500)"
            label="Price"
            value={form.price.toString()}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) || 0 })
            }
            required
          />

          {/* Installed Model Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Installed Model</label>
            <select
              name="installedModel"
              value={form.installedModel}
              onChange={(e) =>
                setForm({ ...form, installedModel: e.target.value })
              }
              required
              className="border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>
                Select Installed Model
              </option>
              <option value="nmp-5">NMP-5</option>
              <option value="nmp-7">NMP-7</option>
              <option value="nmp-9">NMP-9</option>
              <option value="nmp-11">NMP-11</option>
              <option value="uce-9">UCE-9</option>
              <option value="uce-11">UCE-11</option>
              <option value="uce-13">UCE-13</option>
            </select>
          </div>

          {/* Warranty & AMC */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Warranty (Years)</label>
            <select
              name="warranty"
              value={form.warranty}
              onChange={(e) =>
                setForm({ ...form, warranty: parseInt(e.target.value) })
              }
              required
              className="border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={form.warranty} disabled>
                Select Warranty
              </option>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year} Year{year > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1">AMC Renewed (Years)</label>
            <select
              name="amcRenewed"
              value={form.amcRenewed}
              onChange={(e) =>
                setForm({ ...form, amcRenewed: parseInt(e.target.value) })
              }
              required
              className="border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={form.amcRenewed} disabled>
                Select AMC Renewed
              </option>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year} Year{year > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address and Remarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })} // onChange handler
              placeholder="Enter Address"
              rows={3}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="remarks" className="text-sm mb-1">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={form.remarks}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })} // onChange handler
              placeholder="Enter Remarks"
              rows={3}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-primary-dark transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}


export default Page;
