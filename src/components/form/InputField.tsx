// components/form/InputField.tsx
'use client';

import React from 'react';

interface InputFieldProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  className = '',
}) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded ${className}`}
    />
  </div>
);
