import React, { useEffect, useState } from 'react';
import TreeListHead from '../TreeListHead/TreeListHead';
import TreeList from '../TreeList/TreeList';
import { IBranch } from '../../types/branch';
import filter from '../../utils/filter';

interface TreeItemProps {
  letter: string
  list: IBranch[]
  forceOpen: boolean
}

const TreeItem = ({
  letter,
  list,
  forceOpen
}: TreeItemProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  const prepareList = (items: IBranch[]): IBranch[] => {
    if (open || forceOpen) {
      return items;
    }

    let compressedList;

    const isPresentMain = items.some((el) => el.main);
    const limit = 5;

    if (isPresentMain) {
      compressedList = Array.from(filter(items, (i: IBranch) => i.main, limit));
    } else {
      compressedList = items.slice(0, limit - 1);
    }

    return compressedList;
  };

  return (
    <div>
      <TreeListHead
        symbol={letter}
        count={list.length}
        isOpen={open}
        toggle={() => setOpen(!open)}
      />
      <TreeList list={prepareList(list)} />
    </div>
  );
};

export default TreeItem;
