import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { HashRouter as Router } from "react-router-dom"

import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(

  <Router>
    <ConfigProvider>
      <App />
    </ConfigProvider>

  </Router>
  //   <React.StrictMode>
  // </React.StrictMode>
);
