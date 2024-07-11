import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { EmployeeTable } from './components/EmpoyeeTable/EmployeeTable';
import { EmployeeLineItem } from './interfaces/employees';
import { useEmployee } from './hooks/useEmployee';
import EmployeeModal from './components/EmployeeModal/EmployeeModal';
import EmployeeDeleteModal from './components/EmployeeDeleteModal/EmployeeDeleteModal';
import { writeEmployeesToExcel } from './utils/excel';

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
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Social Pro Tech Task</Typography>
        <Box>
          <Button
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={async () => {
              if (employees.length) {
                await writeEmployeesToExcel(employees);
              } else {
                alert('No employees to export');
              }
            }}
          >
            Export
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSelectedEmployee(undefined);
              setIsModalOpen(true);
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
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
