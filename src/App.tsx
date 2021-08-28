import React from 'react';
import Tree from './components/Tree/Tree';
import branches from './mock/branches';

const App = () => {
  return (
    <div className="container">
      <h1 className="title">Иерархического дерево</h1>
      <Tree items={branches} />
    </div>
  );
};

export default App;
