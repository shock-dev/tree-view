import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesRequest } from './store/actions';
import { selectBranches, selectError, selectStatus } from './store/selectors';
import { Status } from './store/types';

import Loader from './components/Loader';
import RegisterCheckbox from './components/RegisterCheckbox';
import SortRadio from './components/SortRadio';
import CreatingForm from './components/CreatingForm';
import TextInput from './components/TextInput';
import Tree from './components/Tree';

import { SortBy } from './types/sort';
import radios from './resources/sort';
import sort from './utils/sort';

const App = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const loading = useSelector(selectStatus) !== Status.DONE;
  const error = useSelector(selectError);
  const [search, setSearch] = useState('');
  const [searchRegister, setSearchRegister] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('ASC');

  useEffect(() => {
    dispatch(fetchBranchesRequest());
  }, []);

  let sortedBranches = sort(branches, sortBy);

  if (search !== '') {
    sortedBranches = sortedBranches.filter((b) => {
      if (searchRegister) {
        return b.title.indexOf(search) !== -1;
      }

      return b.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Иерархическое дерево</h1>
        {error && <p>{error}</p>}
        {loading && <Loader />}
      </div>
      <div className="flex between align">
        <div>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <RegisterCheckbox
            checked={searchRegister}
            onChange={(e) => setSearchRegister(e.target.checked)}
          />
        </div>
        <div className="flex align">
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
          <CreatingForm />
        </div>
      </div>
      <Tree
        items={sortedBranches}
        forceOpen={!!search.length}
      />
    </div>
  );
};

export default App;
