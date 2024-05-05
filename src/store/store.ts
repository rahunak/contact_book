
import React from 'react';
import IContact from '../contact/IContact';
import IGroup from '../group/IGroup';
import { StoreContextType } from './contactsReducer';

export interface IState {
  contacts: Map<string, IContact>,
  groups: IGroup[],
}

export const StoreContext = React.createContext<StoreContextType | null>(null);

/* Example of state. */
// export let DbStorage = {
//   contacts:
//     new Map([
//       ['1', { id: '1', name: 'Idris', phone: '+32342342', group: '1q' }],
//       ['2', { id: '2', name: 'Leor', phone: '32342342', group: '2q' }],
//       ['3', { id: '3', name: 'Elroi', phone: '32342342', group: '3q' }],
//     ]
//     ),
//   groups: [{ id: '1', name: "groupName", contacts: ['1', '2', '3'] }]
// };
