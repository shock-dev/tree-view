import React from 'react';
import s from './SortRadio.module.scss';
import { SortBy } from '../../App';

interface SortRadioProps {
  title: string
  name: string
  value: SortBy
  active: SortBy
  onChange: (value: SortBy) => void
}

const SortRadio = ({
  title,
  name,
  value,
  active,
  onChange
}: SortRadioProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        className={s.input}
        onChange={() => onChange(value)}
        checked={active === value}
        hidden
      />
      <span className={s.span}>{title}</span>
    </label>
  );
};

export default SortRadio;
