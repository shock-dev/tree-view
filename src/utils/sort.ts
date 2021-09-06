import { IBranch } from '../types/branch';
import { SortBy } from '../types/sort';

const sort = (items: IBranch[], sortBy: SortBy): IBranch[] => {
  switch (sortBy) {
    case 'ASC':
      return items.slice().sort( (a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });

    case 'DESC':
      return items.slice().sort( (a, b) => {
        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
      });

    default:
      return items;
  }
};

export default sort;
