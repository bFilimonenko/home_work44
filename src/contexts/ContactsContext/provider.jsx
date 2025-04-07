import { ContactsContext } from './context.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../../store/actions/contacts.js';

export const ContactsProvider = ({ children }) => {
  const dispatch = useDispatch();

  const validateContact = (formValue) => {
    const invalidKeys = Object.keys(formValue).filter((key) => !formValue[key]);

    if (invalidKeys.length > 0) {
      return invalidKeys;
    }

    return null;
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <ContactsContext.Provider value={{ validateContact }}>{children}</ContactsContext.Provider>
  );
};
