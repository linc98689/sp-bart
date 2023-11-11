import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './routes/NavBar';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className={ styles.app_header}>
      <BrowserRouter>
        <NavBar/>
        <AppRouter />
      </BrowserRouter>
    </div> 
  );
}

export default App;
