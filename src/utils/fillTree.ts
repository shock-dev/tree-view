import { IBranch } from '../types/branch';
import { ITree } from '../types/tree';

/*
 * Функция для преобразования массива веток
 * в объект для шаблона
 */
const fillTree = (list: IBranch[]): ITree | undefined => {
  const { length } = list;

  if (length < 1) return;

  if (length < 2) {
    const el = list[0];

    return {
      [el.title.charAt(0).toLowerCase()]: {
        open: false,
        items: [el]
      }
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
      tree[firstLetter].items.push(el) :
      tree[firstLetter] = { open: false, items: [el] };
  }

  return tree;
};

export default fillTree;
