// src/pages/CustomerForm.tsx
'use client';
import { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

export default function CustomerForm({ onSubmit, initialData = {} }: {
  onSubmit: (data: any) => void;
  initialData?: any;
}) {
  const [form, setForm] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, price: parseFloat(form.price) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="name" label="Customer Name" value={form.name} onChange={handleChange} required />
        <Input name="contactNumber" label="Contact Number" value={form.contactNumber} onChange={handleChange} required />
        <Input name="email" label="Email" value={form.email} onChange={handleChange} />
        <Input name="address" label="Address" value={form.address} onChange={handleChange} />
        <Input name="installedModel" label="Model" value={form.installedModel} onChange={handleChange} />
        <Input name="price" label="Price" value={form.price} onChange={handleChange} type="number" />
        <Input name="invoiceNumber" label="Invoice #" value={form.invoiceNumber} onChange={handleChange} />
        <Input name="serialNumber" label="Serial #" value={form.serialNumber} onChange={handleChange} />
        <Select name="warranty" label="Warranty" value={form.warranty} onChange={handleChange} options={[1, 2, 3, 4, 5]} />
        <Select name="amcRenewed" label="AMC Renewed" value={form.amcRenewed} onChange={handleChange} options={[1, 2, 3, 4, 5]} />
      </div>

      <Button variant="primary" type="submit">
        Save Customer
      </Button>
    </form>
  );
}

function Select({ name, label, value, onChange, options }: any) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-600 mb-1">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        {options.map((opt: number) => (
          <option key={opt} value={opt}>{opt} Year</option>
        ))}
      </select>
    </div>
  );
}
