import React from 'react';
import PlayBoard from '../containers/playboard';

const Home = () => (
  <div className="main-page">
      <div className="header-title">
          <h1 className="entry-title">BATTLESHIP v0.4</h1>
          <div className="divider gradient"></div>
          <div className="action-status">
              <div className="entry-task">
                  <span className="task-text">Place All Ships</span>
                  <span className="fa fa-arrow-down fa-2x task-icon"></span>
              </div>
          </div>
      </div>
    <PlayBoard />
  </div>
);

export default Home;
