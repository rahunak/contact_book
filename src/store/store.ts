
import IContact from '../contact/IContact';
import IGroup from '../group/IGroup';

export interface IState {
  contacts: Map<string, IContact> | null,
  groups: IGroup[] | null,
}

// export let DbStorage = {
//   contacts: [{ id: '1', name: 'Idris', phone: '+32342342', group: '1q' },
//   { id: '2', name: 'Leor', phone: '32342342', group: '2q' },
//   { id: '3', name: 'Elroi', phone: '32342342', group: '3q' }],
//   groups: [{ id: '1', name: "groupName", contactsIds: ['1', '2','3'] }]
// };

export let DbStorage = {
  contacts:
    new Map([
      ['1', { id: '1', name: 'Idris', phone: '+32342342', group: '1q' }],
      ['2', { id: '2', name: 'Leor', phone: '32342342', group: '2q' }],
      ['3', { id: '3', name: 'Elroi', phone: '32342342', group: '3q' }],
    ]
    ),
  groups: [{ id: '1', name: "groupName", contactsIds: ['1', '2', '3'] }]
};
