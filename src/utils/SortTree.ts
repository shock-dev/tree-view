import { ITree } from '../types/tree';
import { SortBy } from '../types/sort';

const sortTree = (tree: ITree, sortBy: SortBy): ITree => {
  const treeKeys = Object.keys(tree);

  if (sortBy === 'ASC') {
    treeKeys.sort();
  } else {
    treeKeys.sort((a, b) => {
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });
  }

  const sortedTree: ITree = {};

  for (let i = 0; i < treeKeys.length; i++) {
    const key = treeKeys[i];
    sortedTree[key] = tree[key];
  }


  return sortedTree;
};

export default sortTree;
