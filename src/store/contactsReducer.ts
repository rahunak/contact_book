import IContact from "../contact/IContact";
import { IState } from "../store/store";
import { Dispatch } from 'react';

export const ADD_CONTACT = "ADD_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";

export interface StoreContextType {
  records: IState;
  dispatch: Dispatch<ActionType>;
}

export interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: IContact;
}

export interface UpdateContactAction {
  type: typeof UPDATE_CONTACT;
  payload: IContact;
}

export interface RemoveContactAction {
  type: typeof REMOVE_CONTACT;
  payload: { id: string };
}
export let initialState: IState = { contacts: new Map<string, IContact>(), groups: [] };

export type ActionType = AddContactAction | UpdateContactAction | RemoveContactAction;

export const contactsReducer = (state: IState = initialState, data: ActionType) => {
  switch (data.type) {
    case ADD_CONTACT: {
      let newContacts = new Map(state.contacts || []);
      newContacts.set(data.payload.id, data.payload);
      let newState = { ...state, contacts: newContacts };
      saveState(newState);
      return newState;
    }
    case UPDATE_CONTACT: {
      if (!state.contacts?.has(data.payload.id)) {
        return;
      }
      let oldContacts = state.contacts.get(data.payload.id);
      let newContact = { ...oldContacts, ...data.payload };
      let newContacts = state.contacts.set(data.payload.id, newContact);
      let newState = { ...state, newContacts };
      saveState(newState);
      return newState;
    }
    case REMOVE_CONTACT: {
      let updatedContacts = state.contacts.delete(data.payload.id);
      if (!updatedContacts) {
        console.error('You tried remove non existing contact', data.payload);
        return state;
      }

      let newState = { ...state, ...state.contacts };
      saveState(newState);
      return newState;
    }
    default:
      return state || initialState;
  }
}

const saveState = (state: IState) => {
  try {
    const stateToSerialize = {
      ...state,
      contacts: Array.from(state.contacts.entries())
    };
    const serializedState = JSON.stringify(stateToSerialize);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
}

export function loadState(): IState {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {
        ...initialState,
        contacts: new Map<string, IContact>()
      };
    }

    const deserializedObject = JSON.parse(serializedState);
    const contactsMap = Array.isArray(deserializedObject.contacts)
      ? new Map<string, IContact>(deserializedObject.contacts)
      : new Map<string, IContact>();

    return {
      ...deserializedObject,
      contacts: contactsMap
    };
  } catch (e) {
    console.error("Caught error", e);
    return {
      ...initialState,
      contacts: new Map<string, IContact>()
    };
  }
}
