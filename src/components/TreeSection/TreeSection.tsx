import React, { useEffect, useState } from 'react';
import TreeListHead from '../TreeListHead';
import TreeList from '../TreeList';
import { IBranch } from '../../types/branch';
import filter from '../../utils/filter';

interface TreeSectionProps {
  letter: string
  list: IBranch[]
  forceOpen: boolean
}

const compressList = (items: IBranch[], limit: number): IBranch[] => {
  const isPresentMain = items.some((el) => el.main);
  let compressedList;

  if (isPresentMain) {
    compressedList = Array.from(filter(items, (i: IBranch) => i.main, limit));
  } else {
    compressedList = items.slice(0, limit - 1);
  }

  return compressedList;
};

const TreeSection = ({
  letter,
  list,
  forceOpen
}: TreeSectionProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  return (
    <div>
      <TreeListHead
        symbol={letter}
        count={list.length}
        isOpen={open}
        toggle={() => setOpen(!open)}
      />
      <TreeList
        list={open || forceOpen ? list : compressList(list, 5)}
      />
    </div>
  );
};

export default TreeSection;
