import React, { Fragment, useState } from 'react';
import { IBranch } from '../../types/branch';
import fillTree from '../../utils/fillTree';
import TreeListHead from '../TreeListHead/TreeListHead';
import TreeList from '../TreeList/TreeList';
import { ITreeElement } from '../../types/tree';
import filter from '../../utils/filter';

interface TreeListProps {
  items: IBranch[];
}

const Tree = ({
  items
}: TreeListProps) => {
  const [tree, setTree] = useState(fillTree(items));

  if (!tree) {
    return (
      <div>Нет элементов</div>
    );
  }

  const toggleVisibleTreeList = (key: string) => {
    setTree((prev) => {
      const current = prev![key];
      return {
        ...prev,
        [key]: {
          ...current,
          open: !current.open
        }
      };
    });
  };

  const prepareList = ({ items, open }: ITreeElement): IBranch[] => {
    let list: typeof items;

    if (!open) {
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
      {Object.keys(tree).map((key) =>
        <Fragment key={key}>
          <TreeListHead
            symbol={key.toUpperCase()}
            count={tree[key].items.length}
            isOpen={tree[key].open}
            toggle={() => toggleVisibleTreeList(key)}
          />
          <TreeList list={prepareList(tree[key])} />
        </Fragment>
      )}
    </div>
  );
};

export default Tree;
