import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableSortLabel,
} from '@mui/material';
import { EmployeeTableRow } from './EmployeeTableRow';
import { EmployeeTableRowSkeleton } from './EmployeeTableRowSkeleton';
import { NoRows } from './NoRows';
import { EmployeeLineItem } from '../../interfaces/employees';
import { useState } from 'react';

type Order = 'asc' | 'desc';
interface TableColumns {
  id: string;
  label: string;
  sortable: boolean;
}

interface EmployeeTableProps {
  loading: boolean;
  employees: EmployeeLineItem[];
  handleEditEmployee: (employee: EmployeeLineItem) => void;
  handleDeleteEmployee: (employee: EmployeeLineItem) => void;
}

const tableColumns: TableColumns[] = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'phone', label: 'Phone', sortable: true },
  { id: 'occupation', label: 'Occupation', sortable: true },
  { id: 'actions', label: 'Actions', sortable: false },
];

export const EmployeeTable = ({
  loading,
  employees,
  handleEditEmployee,
  handleDeleteEmployee,
}: EmployeeTableProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof EmployeeLineItem>('name');

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property as keyof EmployeeLineItem);
  };

  const sortedEmployees = [...employees];
  sortedEmployees.sort((a, b) => {
    if (
      (a[orderBy] < b[orderBy] && order === 'asc') ||
      (a[orderBy] > b[orderBy] && order === 'desc')
    ) {
      return -1;
    }
    if (
      (b[orderBy] > a[orderBy] && order === 'asc') ||
      (b[orderBy] < a[orderBy] && order === 'desc')
    ) {
      return 1;
    }
    return 0;
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableColumns.map((column) => (
              <TableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 10 }, (_, index) => (
                <EmployeeTableRowSkeleton key={index} />
              ))
            : sortedEmployees?.map((row) => {
                return (
                  <EmployeeTableRow
                    employee={row}
                    handleEditEmployee={handleEditEmployee}
                    handleDeleteEmployee={handleDeleteEmployee}
                  />
                );
              })}

          {!loading && !employees.length ? (
            <NoRows title={'Employees'} />
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
