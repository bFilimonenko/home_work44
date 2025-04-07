import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from '../actions/contacts.js';

const initialState = { contacts: [], selectedContact: null, isLoading: false };

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts = [...state.contacts, { ...payload, id: state.contacts.at(-1).id + 1 }];
    },
    editContact: (state, { payload }) => {
      if (!state.selectedContact) return;
      state.contacts = state.contacts.reduce((acc, contact) => {
        if (contact.id !== state.selectedContact.id) {
          acc.push(contact);
        } else {
          acc.push({
            id: contact.id,
            ...payload,
          });
        }
        return acc;
      }, []);
    },
    setSelectedContact: (state, { payload }) => {
      state.selectedContact = payload;
    },
    deleteContact: (state) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== state.selectedContact.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (!payload) return;

        state.contacts = payload.map((el) => ({
          id: el.id,
          firstName: el.name.split(' ')[0],
          lastName: el.name.split(' ')[1],
          phone: el.phone,
        }));
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
        state.contacts = [];
      });
  },
});

export const { addContact, editContact, deleteContact, setSelectedContact } = contactsSlice.actions;

export default contactsSlice.reducer;
