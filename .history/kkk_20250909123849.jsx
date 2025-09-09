import {Routes,Route} from 'react-router-dom';
import App from './App';

function Main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
    </Routes>
  )
}

export default Main
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main.js';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);

