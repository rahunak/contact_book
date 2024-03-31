
import IContact from '../contact/IContact';
class DbStorage {
  contactStorage: IContact[] = [];
}
let initialStorage = {
  contactStorage: [{ id: '1', name: '1q', phone: '1q', group: '1q' },
  { id: '2', name: '2q', phone: '2q', group: '2q' },
{ id: '3', name: '3q', phone: '3q', group: '3q' }]
};
export default initialStorage;
