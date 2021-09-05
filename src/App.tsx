import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesRequest } from './store/actions';
import { selectBranches, selectStatus } from './store/selectors';
import Tree from './components/Tree/Tree';
import Loader from './components/Loader/Loader';
import { Status } from './store/types';
import Search from './components/Search/Search';
import RegisterCheckbox from './components/RegisterCheckbox/RegisterCheckbox';
import SortRadio from './components/SortRadio/SortRadio';

export type SortBy = 'ASC' | 'DESC'

interface IRadio {
  title: 'A-Z' | 'Z-A'
  value: SortBy
}

const radios: IRadio[] = [
  { title: 'A-Z', value: 'ASC' },
  { title: 'Z-A', value: 'DESC' }
];

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectStatus) !== (Status.DONE || Status.CREATING);
  const [search, setSearch] = useState('');
  const [searchRegister, setSearchRegister] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('ASC');
  let branches = useSelector(selectBranches);

  useEffect(() => {
    dispatch(fetchBranchesRequest());
  }, []);

  if (search !== '') {
    branches = branches.filter((b) => {
      if (searchRegister) {
        return b.title.indexOf(search) !== -1;
      }

      return b.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Иерархического дерево</h1>
        {loading && <Loader />}
      </div>
      <div className="panel">
        <div>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <RegisterCheckbox
            checked={searchRegister}
            onChange={(e) => setSearchRegister(e.target.checked)}
          />
        </div>
        <div>
          {radios.map((r, index) =>
            <SortRadio
              key={index}
              name="sort"
              title={r.title}
              active={sortBy}
              value={r.value}
              onChange={(value) => setSortBy(value)}
            />
          )}
        </div>
      </div>
      <Tree
        key={search}
        items={branches}
        sortBy={sortBy}
        forceOpen={!!search.length}
      />
    </div>
  );
};

export default App;
