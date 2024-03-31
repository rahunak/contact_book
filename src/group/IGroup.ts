import IContact from "../contact/IContact";

export default interface IGroup {
  id: string;
  name: string,
  contact?: IContact;
}
