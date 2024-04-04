import React, { useState, createContext, useReducer } from 'react';
import './App.css';
import './normalize.css';

import Header from './components/header/Header';
import GroupComponent from './group/GroupComponent';
import SidebarComponent from './sidebar/SidebarComponent';
import { contactsReducer, ActionType, loadState, initialState, StoreContextType } from './store/contactsReducer';
import { DbStorage, IState } from './store/store';
import IContact from './contact/IContact';

export const Store = createContext<StoreContextType | null>(null);
const ShowedSidebar = createContext(false);
function App() {
  const [showedSlider, setShowedSlider] = useState(false);

  const [records, dispatch] = useReducer(contactsReducer, loadState());

  return (
    <ShowedSidebar.Provider value={showedSlider}>
      <Store.Provider value={{ records: records || initialState, dispatch }}>
        <div className="App  ">
          <div className="app--wrapper bg-gray">
            <SidebarComponent showedSlider={showedSlider} setShowedSlider={setShowedSlider} />
            <div className="page--wrapper">
              <Header showedSlider={showedSlider} setShowedSlider={setShowedSlider} />
              {
                // records.groups && records.groups.map(group => {
                //   return <GroupComponent key={group.id} id={group.id} name={group.name} contactsIds={group.contactsIds} />
                // })
              }

            </div>
          </div>
        </div>
      </Store.Provider>
    </ShowedSidebar.Provider>
  );
}

export default App;
