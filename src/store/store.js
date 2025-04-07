import { configureStore } from '@reduxjs/toolkit';
import contactsReduce from './reducers/contacts.js';

export const store = configureStore({
  reducer: {
    contacts: contactsReduce,
  },
});
