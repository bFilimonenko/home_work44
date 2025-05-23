import './ContactForm.css';
import { Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useMask } from '@react-input/mask';

import { PAGES } from '../../layouts/MainLayout/constants.js';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedContactSelector } from '../../store/selectors/contacts.js';
import { ContactsContext } from '../../contexts/ContactsContext/context.jsx';
import { addContact, editContact } from '../../store/reducers/contacts.js';

export const ContactForm = () => {
  const { validateContact } = useContext(ContactsContext);
  const navigate = useNavigate();
  const selectedContact = useSelector(getSelectedContactSelector);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [validationError, setValidationError] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const namePattern = /^[A-Za-zА-Яа-яЁёІіЇїЄє]{0,15}$/;
  const phonePattern = useMask({
    mask: '+38(___)-___-__-__',
    replacement: { _: /\d/ },
  });

  const handleSave = () => {
    const validationErrors = validateContact(formValue);

    if (validationErrors) {
      setValidationError(
        validationErrors.reduce((acc, key) => {
          acc[key] = 'This field is required';
          return acc;
        }, {}),
      );

      return;
    }

    if (selectedContact) {
      dispatch(editContact(formValue));
      navigate(PAGES.LIST);
      return;
    }

    dispatch(addContact(formValue));
    navigate(PAGES.LIST);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'firstName':
        !namePattern.test(event.target.value)
          ? setValidationError((prev) => ({ ...prev, firstName: 'Only letters are available' }))
          : setValidationError((prev) => ({ ...prev, firstName: '' }));

        setFormValue({ ...formValue, firstName: `${event.target.value}` });
        break;
      case 'lastName':
        !namePattern.test(event.target.value)
          ? setValidationError((prev) => ({ ...prev, lastName: 'Only letters are available' }))
          : setValidationError((prev) => ({ ...prev, lastName: '' }));
        setFormValue({ ...formValue, lastName: `${event.target.value}` });
        break;
      case 'phone':
        event.target.value.length < 18
          ? setValidationError((prev) => ({ ...prev, phone: 'Only numbers are available' }))
          : setValidationError((prev) => ({ ...prev, phone: '' }));
        setFormValue({ ...formValue, phone: `${event.target.value}` });
        break;
    }
  };

  useEffect(() => {
    if (!selectedContact) return;

    setFormValue({
      firstName: selectedContact.firstName,
      lastName: selectedContact.lastName,
      phone: selectedContact.phone,
    });
  }, [selectedContact]);

  return (
    <>
      <form className="contact-form">
        <TextField
          label="First Name"
          variant="filled"
          name="firstName"
          value={formValue.firstName}
          onChange={handleChange}
          error={validationError.firstName}
          helperText={validationError.firstName}
        />
        <TextField
          label="Last Name"
          variant="filled"
          name="lastName"
          value={formValue.lastName}
          onChange={handleChange}
          error={validationError.lastName}
          helperText={validationError.lastName}
        />
        <TextField
          label="Phone"
          variant="filled"
          name="phone"
          value={formValue.phone}
          onChange={handleChange}
          inputRef={phonePattern}
          error={validationError.phone}
          helperText={validationError.phone}
        />

        <div className="form-control">
          <Button variant="contained" color="primary" onClick={() => navigate(PAGES.LIST)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={Object.values(validationError).some((err) => !!err)}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
