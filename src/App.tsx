import React, { useState, useContext, createContext } from 'react';
import './App.css';
import './normalize.css';

import Header from './components/header/Header';
import GroupComponent from './group/GroupComponent';
import ContactComponent from './contact/ContactComponent';
import SidebarComponent from './sidebar/SidebarComponent';

// const ThemeContext = createContext('light');
const ShowedSidebar = createContext(false);
function App() {
  const [showedSlider, setShowedSlider] = useState(false);
  return (
    <ShowedSidebar.Provider value={showedSlider}>
      <div className="App  ">
        <div className="app--wrapper bg-gray">
          <SidebarComponent showedSlider={showedSlider} setShowedSlider={setShowedSlider} />
          <div className="page--wrapper">
            <Header showedSlider={showedSlider} setShowedSlider={setShowedSlider} />

            <GroupComponent id="0" name="Группа крови" />
          </div>
        </div>
      </div>
    </ShowedSidebar.Provider>
  );
}

export default App;
