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
  // console.log(forceOpen);
  //
  // if (forceOpen) {
  //   setOpen(true);
  // }

  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  const prepareList = (items: IBranch[]): IBranch[] => {
    let list: typeof items;

    if (!open || !forceOpen) {
      const isPresentMain = items.some((el) => el.main);
      const limit = 5;

      if (isPresentMain) {
        list = Array.from(filter(items, (i: IBranch) => i.main, limit));
      } else {
        list = items.slice(0, limit - 1);
      }
    } else {
      list = items;
    }

    return list.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
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
