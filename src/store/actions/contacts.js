import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactsRoutes } from '../constants/contacts.js';

export const fetchContacts = createAsyncThunk(ContactsRoutes.GetContacts, async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});
