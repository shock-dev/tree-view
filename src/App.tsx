import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesRequest } from './store/actions';
import { selectBranches, selectError, selectStatus } from './store/selectors';
import Loader from './components/Loader/Loader';
import { Status } from './store/types';
import RegisterCheckbox from './components/RegisterCheckbox/RegisterCheckbox';
import SortRadio from './components/SortRadio/SortRadio';
import CreatingForm from './components/CreatingForm/CreatingForm';
import { SortBy } from './types/sort';
import radios from './resources/sort';
import TextInput from './components/TextInput/TextInput';
import sort from './utils/sort';
import TreeItem from './components/TreeItem/TreeItem';
import fillTree from './utils/fillTree';

const App = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const loading = useSelector(selectStatus) !== Status.DONE;
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [search, setSearch] = useState('');
  const [searchRegister, setSearchRegister] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('ASC');

  useEffect(() => {
    dispatch(fetchBranchesRequest());
  }, []);

  if (!branches.length && status === Status.DONE) {
    return <div>Нет элементов</div>;
  }

  if (!branches.length) return null;

  let sortedBranches = sort(branches, sortBy);

  if (search !== '') {
    sortedBranches = sortedBranches.filter((b) => {
      if (searchRegister) {
        return b.title.indexOf(search) !== -1;
      }

      return b.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

  const tree = fillTree(sortedBranches);

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
      <div>
        {Object.keys(tree).map((key, index) =>
          <TreeItem
            key={`${key}-${index}`}
            letter={key.charAt(0).toUpperCase()}
            forceOpen={!!search.length}
            list={tree[key]}
          />
        )}
      </div>
    </div>
  );
};

export default App;
