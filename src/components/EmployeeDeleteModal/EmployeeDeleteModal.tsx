import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { EmployeeLineItem } from '../../interfaces/employees';

interface EmployeeDeleteModalProps {
  loading: boolean;
  existingEmployee: EmployeeLineItem;
  deleteEmployee: (employee: EmployeeLineItem) => void;
  handleClose: () => void;
}

export default function EmployeeDeleteModal({
  loading,
  existingEmployee,
  deleteEmployee,
  handleClose,
}: EmployeeDeleteModalProps) {
  return (
    <Dialog fullWidth open onClose={handleClose}>
      <DialogTitle>Delete employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {existingEmployee.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          color="error"
          onClick={async (): Promise<void> => {
            await deleteEmployee(existingEmployee);
            handleClose();
          }}
          disabled={loading}
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={handleClose}
          disabled={loading}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
