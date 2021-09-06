import React from 'react';
import clsx from 'clsx';
import s from './TreeListHead.module.scss';
import sprite from '../../assets/img/[icons].svg';

interface TreeListHeadProps {
  symbol: string
  count: number
  isOpen: boolean
  toggle: () => void
}

const TreeListHead = ({
  symbol,
  count,
  isOpen,
  toggle
}: TreeListHeadProps) => {
  return (
    <div className={s.wrapper} onClick={toggle}>
      <svg className={clsx(s.arrows, { [s.rotated]: isOpen })}>
        <use href={`${sprite}#double-arrows`} />
      </svg>
      <span className={s.bold}>{symbol}</span> ({count})
    </div>
  );
};

export default TreeListHead;
