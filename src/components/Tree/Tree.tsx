import React from 'react';
import { IBranch } from '../../types/branch';
import fillTree from '../../utils/fillTree';
import TreeItem from '../TreeItem/TreeItem';
import { useSelector } from 'react-redux';
import { selectStatus } from '../../store/selectors';
import { Status } from '../../store/types';
import { SortBy } from '../../types/sort';

interface TreeListProps {
  items: IBranch[]
  sortBy: SortBy
  forceOpen: boolean
}

const Tree = ({
  items,
  sortBy,
  forceOpen
}: TreeListProps) => {
  const tree = fillTree(items, sortBy);
  const status = useSelector(selectStatus);

  if (!tree) return null;

  if (!tree && status === Status.DONE) {
    return <div>Нет элементов</div>;
  }

  return (
    <div>
      {Object.keys(tree).map((key) =>
        <TreeItem
          key={key}
          letter={key.charAt(0).toUpperCase()}
          forceOpen={forceOpen}
          list={tree[key]}
        />
      )}
    </div>
  );
};

export default Tree;
