import React, { useReducer, useState } from 'react';
import './App.css';
import './normalize.css';
import './assets/style/global.scss';
import Header from './components/header/Header';
import GroupComponent from './group/GroupComponent';
import SidebarComponent from './sidebar/SidebarComponent';
import { contactsReducer, loadState, initialState } from './store/contactsReducer';
import ContactComponent from './contact/ContactComponent';
import { StoreContext } from './store/store';
import { ShowedSidebarContext } from './sidebar/SidebarComponent';
import Accordion from './components/Accordion/Accordion';

function App() {
  const [showedSlider, setShowedSlider] = React.useState<boolean>(false);
  const [records, dispatch] = useReducer(contactsReducer, loadState());
  const [typeAddForm, setAddForm] = useState('contacts');
  console.log("App records", records);

  return (
    <ShowedSidebarContext.Provider value={{ showedSlider, setShowedSlider }}>
      <StoreContext.Provider value={{ records: records || initialState, dispatch }}>
        <div className="App  ">
          <div className="app--wrapper bg-gray">
            <SidebarComponent showedSlider={showedSlider} setShowedSlider={setShowedSlider} />
            <div className="page--wrapper">
              <Header setAddForm={setAddForm} />
              {
                records && records.groups && records.groups.map(group => {
                  return <GroupComponent key={group.id} id={group.id} name={group.name} contacts={group.contacts} />
                })
              }
              <div className="accordions--wrapper">
              <Accordion title="Контакты">
                {
                  records && Array.from(records.contacts.values()).map(contact => {
                    return <ContactComponent
                      key={contact.id}
                      contact={contact}
                      dispatch={dispatch}
                    />
                  })
                }
              </Accordion>              <Accordion title="Контакты">
                {
                  records && Array.from(records.contacts.values()).map(contact => {
                    return <ContactComponent
                      key={contact.id}
                      contact={contact}
                      dispatch={dispatch}
                    />
                  })
                }
              </Accordion>
              </div>


            </div>
          </div>
        </div>
      </StoreContext.Provider>
    </ShowedSidebarContext.Provider>
  );
}

export default App;
