import React, { ChangeEvent } from 'react';
import s from './Search.module.scss';

interface SearchProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = ({
  value,
  onChange
}: SearchProps) => {
  return (
    <input
      type="text"
      className={s.input}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Search;
