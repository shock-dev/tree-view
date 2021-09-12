import React from 'react';
import { useSelector } from 'react-redux';
import TreeSection from '../TreeSection';
import { IBranch } from '../../types/branch';
import fillTree from '../../utils/fillTree';
import { Status } from '../../store/types';
import { selectStatus } from '../../store/selectors';

interface TreeProps {
  items: IBranch[]
  forceOpen: boolean
}

const Tree = ({
  items,
  forceOpen = false
}: TreeProps) => {
  const status = useSelector(selectStatus);

  if (!items.length && status === Status.DONE) {
    return <div>Нет элементов</div>;
  }

  if (!items.length) return null;

  const tree = fillTree(items);

  return (
    <div>
      {Object.keys(tree).map((key, index) =>
        <TreeSection
          key={`${key}-${index}`}
          letter={key.charAt(0).toUpperCase()}
          forceOpen={forceOpen}
          list={tree[key]}
        />
      )}
    </div>
  );
};

export default Tree;
