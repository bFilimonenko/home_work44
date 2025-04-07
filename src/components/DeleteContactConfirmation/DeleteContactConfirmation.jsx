import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedContactSelector } from '../../store/selectors/contacts.js';
import { deleteContact } from '../../store/reducers/contacts.js';

export const DeleteContactConfirmation = ({ open, handleClose }) => {
  const selectedContact = useSelector(getSelectedContactSelector);
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Are you sure you want to delete this contact?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedContact && `Contact: '${selectedContact.firstName}'`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            dispatch(deleteContact());
            handleClose();
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
