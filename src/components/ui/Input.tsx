// src/components/Input/Input.tsx
"use client";

import React, { useId } from "react";

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  type,
  required,
  placeholder,
}) => {
  const uniqueId = useId();
  return (
    <div className="flex flex-col w-full max-w-md">
      <label htmlFor={uniqueId} className="text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-400 rounded-md px-4 py-2.5 mt-2 w-full text-base
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

export default Input;
