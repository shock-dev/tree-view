import React, { ChangeEvent } from 'react';
import s from './RegisterCheckbox.module.scss';

interface RegisterCheckboxProps {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RegisterCheckbox = ({
  checked,
  onChange
}: RegisterCheckboxProps) => {
  return (
    <label
      className={s.label}
      title={checked ? 'Отменить учет регистра' : 'Включить учет регистра'}
    >
      <input
        type="checkbox"
        className={s.input}
        checked={checked}
        onChange={onChange}
        hidden
      />
      <span className={s.span}>Aa</span>
    </label>
  );
};

export default RegisterCheckbox;
