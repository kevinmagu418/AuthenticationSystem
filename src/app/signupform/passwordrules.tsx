// app/signup/PasswordRules.tsx
'use client';

import React from 'react';
import { passwordRules } from '../../../lib/passwordRules';

interface Props {
  password: string;
}

export const PasswordRules: React.FC<Props> = ({ password }) => {
  return (
    <ul className="mt-4 space-y-2">
      {passwordRules.map((rule, i) => {
        const passed = rule.test(password);
        return (
          <li key={i} className={`flex items-center text-sm ${passed ? 'text-green-600' : 'text-red-500'}`}>
            <span className="mr-2">{passed ? '✔️' : '❌'}</span>
            {rule.name}
          </li>
        );
      })}
    </ul>
  );
};
