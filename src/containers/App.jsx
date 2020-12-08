import React, { Fragment } from 'react';

import List from './List';

import '../styles/App.scss';

function App() {
  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark border-bottom border-white">
        <a href="/" className="navbar-brand">
          ReactApp
        </a>
      </nav>
      <main className="bg-dark">
        <div className="container">
          <List />
        </div>
      </main>
    </Fragment>
  );
}

export default App;
