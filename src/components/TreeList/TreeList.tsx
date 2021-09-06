import React from 'react';
import TreeListElement from '../TreeListElement/TreeListElement';
import { IBranch } from '../../types/branch';
import { useDispatch } from 'react-redux';
import { deleteBranchRequest, updateBranchRequest } from '../../store/actions';

interface TreeListProps {
  list: IBranch[]
}

const TreeList = ({
  list
}: TreeListProps) => {
  const dispatch = useDispatch();

  const updateBranch = (old: IBranch, value: string) => {
    dispatch(updateBranchRequest(old, value));
  };

  const deleteBranch = (id: IBranch['_id']) => {
    dispatch(deleteBranchRequest(id));
  };

  return (
    <ul>
      {list.map((item, index) =>
        <TreeListElement
          key={`${item.title} ${index}`}
          title={item.title}
          onUpdate={(value) => updateBranch(item, value)}
          onDelete={() => deleteBranch(item._id)}
        />
      )}
    </ul>
  );
};

export default TreeList;
