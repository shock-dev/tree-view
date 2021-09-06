import { IBranch } from '../types/branch';
import { ITree } from '../types/tree';
import { SortBy } from '../types/sort';

/*
 * Функция для преобразования массива веток
 * в дерево вида { A: [el, el..] }
 */
const fillTree = (list: IBranch[], sortBy: SortBy): ITree | undefined => {
  const { length } = list;

  if (length < 1) return;

  if (length < 2) {
    const el = list[0];

    return {
      [el.title.charAt(0).toLowerCase()]: [el]
    };
  }

  const tree: ITree = {};

  for (let i = 0; i < length; i++) {
    const el = list[i];
    const firstLetter = el.title.charAt(0).toLowerCase();

    /*
     * Создаем массив, если ключа нет
     * Иначе добавляем элемент в массив
     */
    firstLetter in tree ?
      tree[firstLetter].push(el) :
      tree[firstLetter] = [el];
  }

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

export default fillTree;
