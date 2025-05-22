'use client';
import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

type CustomerFormData = {
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  installedModel: string;
  price: string | number;
  invoiceNumber: string;
  serialNumber: string;
  warranty: number;
  amcRenewed: number;
};

type CustomerFormProps = {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: Partial<CustomerFormData>;
};

export default function CustomerForm({ onSubmit, initialData = {} }: CustomerFormProps) {
  const [form, setForm] = useState<CustomerFormData>({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
    installedModel: '',
    price: '',
    invoiceNumber: '',
    serialNumber: '',
    warranty: 1,
    amcRenewed: 1,
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: parseFloat(form.price.toString()) || 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="name" label="Customer Name" value={form.name} onChange={handleChange} required type="text" />
        <Input name="contactNumber" label="Contact Number" value={form.contactNumber} onChange={handleChange} required type="text" />
        <Input name="email" label="Email" value={form.email} onChange={handleChange} type="email" />
        <Input name="address" label="Address" value={form.address} onChange={handleChange} type="text" />
        <Input name="installedModel" label="Model" value={form.installedModel} onChange={handleChange} type="text" />
        <Input name="price" label="Price" value={form.price.toString()} onChange={handleChange} type="number" />
        <Input name="invoiceNumber" label="Invoice #" value={form.invoiceNumber} onChange={handleChange} type="text" />
        <Input name="serialNumber" label="Serial #" value={form.serialNumber} onChange={handleChange} type="text" />
        <Select name="warranty" label="Warranty" value={form.warranty} onChange={handleChange} options={[1, 2, 3, 4, 5]} />
        <Select name="amcRenewed" label="AMC Renewed" value={form.amcRenewed} onChange={handleChange} options={[1, 2, 3, 4, 5]} />
      </div>

      <Button variant="primary" type="submit">
        Save Customer
      </Button>
    </form>
  );
}

type SelectProps = {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: number[];
};

function Select({ name, label, value, onChange, options }: SelectProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-600 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt} Year
          </option>
        ))}
      </select>
    </div>
  );
}
