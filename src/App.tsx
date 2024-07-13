import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { EmployeeTable } from './components/EmpoyeeTable/EmployeeTable';
import { EmployeeLineItem } from './interfaces/employees';
import { useEmployee } from './hooks/useEmployee';
import EmployeeModal from './components/EmployeeModal/EmployeeModal';
import EmployeeDeleteModal from './components/EmployeeDeleteModal/EmployeeDeleteModal';
import { writeEmployeesToExcel } from './utils/excel';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<EmployeeLineItem>();
  const {
    employees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    isLoading,
  } = useEmployee();

  return (
    <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 2,
          px: 3,
        }}
      >
        <img src="./logo_alt.png" alt={'Social Pro'} width="200px" />
      </Box>
      <Grid item xs={12} md={12} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            px: 2,
          }}
        >
          <Typography variant="h5">Employees</Typography>
          <Box>
            <Button
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={async () => {
                if (employees.length) {
                  await writeEmployeesToExcel(employees);
                } else {
                  alert('No employees to export');
                }
              }}
              startIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => {
                setSelectedEmployee(undefined);
                setIsModalOpen(true);
              }}
              startIcon={<AddIcon />}
            >
              Add employee
            </Button>
          </Box>
        </Box>
        <Paper>
          <EmployeeTable
            loading={isLoading}
            employees={employees}
            handleDeleteEmployee={(employee: EmployeeLineItem): void => {
              setIsDeleteModalOpen(true);
              setSelectedEmployee(employee);
            }}
            handleEditEmployee={(employee: EmployeeLineItem): void => {
              setIsModalOpen(true);
              setSelectedEmployee(employee);
            }}
          />
        </Paper>
      </Grid>
      {isModalOpen ? (
        <EmployeeModal
          loading={isLoading}
          existingEmployee={selectedEmployee}
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          handleClose={(): void => {
            setIsModalOpen(false);
            setSelectedEmployee(undefined);
          }}
        />
      ) : undefined}

      {isDeleteModalOpen && selectedEmployee && (
        <EmployeeDeleteModal
          loading={isLoading}
          existingEmployee={selectedEmployee}
          deleteEmployee={deleteEmployee}
          handleClose={(): void => {
            setIsDeleteModalOpen(false);
            setSelectedEmployee(undefined);
          }}
        />
      )}
    </Box>
  );
}

export default App;
