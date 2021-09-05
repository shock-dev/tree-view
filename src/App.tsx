import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesRequest } from './store/actions';
import { selectBranches, selectStatus } from './store/selectors';
import Tree from './components/Tree/Tree';
import Loader from './components/Loader/Loader';
import { Status } from './store/types';

const App = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const loading = useSelector(selectStatus) !== (Status.DONE || Status.CREATING);

  useEffect(() => {
    dispatch(fetchBranchesRequest());
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Иерархического дерево</h1>
        {loading && <Loader />}
      </div>
      <Tree items={branches} />
    </div>
  );
};

export default App;
