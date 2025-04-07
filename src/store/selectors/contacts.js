import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (state) => state.contacts;

export const getContactsSelector = createSelector(
  [selectContacts],
  (contacts) => contacts.contacts,
);

export const getContactsLoadingSelector = createSelector(
  [selectContacts],
  (contacts) => contacts.isLoading,
);

export const getSelectedContactSelector = createSelector(
  [selectContacts],
  (contacts) => contacts.selectedContact,
);
