import { IBranch } from '../types/branch';
import { ITree } from '../types/tree';

/*
 * Функция для преобразования массива веток
 * в дерево вида { A: [el, el..] }
 */
const fillTree = (list: IBranch[]): ITree => {
  const tree: ITree = {};

  for (let i = 0; i < list.length; i++) {
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

  return tree;
};

export default fillTree;
