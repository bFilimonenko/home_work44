import './ContactsList.css';
import { Delete, Edit } from '@mui/icons-material';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { PAGES } from '../../layouts/MainLayout/constants.js';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { DeleteContactConfirmation } from '../DeleteContactConfirmation/DeleteContactConfirmation.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsLoadingSelector, getContactsSelector } from '../../store/selectors/contacts.js';
import { setSelectedContact } from '../../store/reducers/contacts.js';

export const ContactsList = () => {
  const navigate = useNavigate();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const contacts = useSelector(getContactsSelector);
  const isLoading = useSelector(getContactsLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedContact(null));
  }, []);

  return (
    <>
      <div className="contacts-table">
        <div className="header-container">
          <p className="first-name">FIRST NAME</p>
          <p className="last-name">LAST NAME</p>
          <p className="phone">PHONE</p>
          <p className="actions">ACTIONS</p>
        </div>

        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '80vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="contact table-row">
              <p className="first-name">{contact.firstName}</p>
              <p className="last-name">{contact.lastName}</p>
              <p className="phone">{contact.phone}</p>

              <p className="actions">
                <IconButton
                  color="info"
                  onClick={() => {
                    dispatch(setSelectedContact(contact));
                    navigate(PAGES.ADD);
                  }}
                >
                  <Edit />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => {
                    dispatch(setSelectedContact(contact));
                    setConfirmationOpen(true);
                  }}
                >
                  <Delete />
                </IconButton>
              </p>
            </div>
          ))
        )}
      </div>
      <DeleteContactConfirmation
        open={confirmationOpen}
        handleClose={() => setConfirmationOpen(false)}
      />
    </>
  );
};
