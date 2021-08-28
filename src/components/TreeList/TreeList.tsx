import React from 'react';
import TreeListElement from '../TreeListElement/TreeListElement';
import { IBranch } from '../../types/branch';

interface TreeListProps {
  list: IBranch[]
}

const TreeList = ({
  list
}: TreeListProps) => {
  return (
    <ul>
      {list.map((item, index) =>
        <TreeListElement
          key={index}
          title={item.title}
        />
      )}
    </ul>
  );
};

export default TreeList;
