// src/components/Input/Input.tsx
'use client';

import React from 'react';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ name, label, value, onChange, type = 'text', required = false }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border-2 border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

export default Input;
