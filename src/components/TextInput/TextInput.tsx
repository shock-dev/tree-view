import React, { ChangeEvent } from 'react';
import s from './TextInput.module.scss';

interface TextInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  full?: boolean
}

const TextInput = ({
  value,
  onChange,
  full = false
}: TextInputProps) => {
  return (
    <input
      type="text"
      className={s.input}
      style={{ width: full ? '100%' : 'auto' }}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};

export default TextInput;
