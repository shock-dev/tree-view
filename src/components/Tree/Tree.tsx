import React from 'react';
import { IBranch } from '../../types/branch';
import fillTree from '../../utils/fillTree';
import TreeItem from '../TreeItem/TreeItem';

interface TreeListProps {
  items: IBranch[];
}

const Tree = ({
  items
}: TreeListProps) => {
  const tree = fillTree(items);

  if (!tree) {
    return (
      <div>Нет элементов</div>
    );
  }

  return (
    <div>
      {Object.keys(tree).map((key) =>
        <TreeItem
          key={key}
          letter={key.charAt(0).toUpperCase()}
          list={tree[key]}
        />
      )}
    </div>
  );
};

export default Tree;
