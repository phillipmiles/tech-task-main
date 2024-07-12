import { act } from 'react';
import { createDefaultEmployee } from '../interfaces/employees';
import { useEmployee } from './useEmployee';
import { renderHook } from '@testing-library/react';

// Mock the sleep function which itself is a mock of a server api request.
jest.mock('../utils/sleep', () => ({ sleep: jest.fn() }));

const testEmployeeName = 'John Doe';
const testEmployeePhone = '00000000';
const testEmployeeEmail = 'email@email.com';
const testEmployeeOccupation = 'Mafia Boss';

it('can add employee', async () => {
  const { result } = renderHook(() => useEmployee());
  const newEmployee = createDefaultEmployee();

  newEmployee.name = testEmployeeName;
  newEmployee.phone = testEmployeePhone;
  newEmployee.email = testEmployeeEmail;
  newEmployee.occupation = testEmployeeOccupation;

  await act(() => result.current.createEmployee(newEmployee));

  expect(result.current.employees[0].name).toEqual(testEmployeeName);
  expect(result.current.employees[0].phone).toEqual(testEmployeePhone);
  expect(result.current.employees[0].email).toEqual(testEmployeeEmail);
  expect(result.current.employees[0].occupation).toEqual(
    testEmployeeOccupation
  );
  expect(result.current.employees[0].id.length).toBeGreaterThan(0);
  expect(result.current.employees[0].created).toBeInstanceOf(Date);
});

it('can update employee', async () => {
  const { result } = renderHook(() => useEmployee());
  const newEmployee = createDefaultEmployee();

  newEmployee.name = testEmployeeName;
  newEmployee.phone = testEmployeePhone;
  newEmployee.email = testEmployeeEmail;
  newEmployee.occupation = testEmployeeOccupation;

  await act(() => result.current.createEmployee(newEmployee));
  await act(() =>
    result.current.updateEmployee({
      ...newEmployee,
      occupation: 'Mafia Henchman',
    })
  );
  expect(result.current.employees[0].occupation).toEqual('Mafia Henchman');
});

it('can delete employee', async () => {
  const { result } = renderHook(() => useEmployee());
  const newEmployee = createDefaultEmployee();

  newEmployee.name = testEmployeeName;
  newEmployee.phone = testEmployeePhone;
  newEmployee.email = testEmployeeEmail;
  newEmployee.occupation = testEmployeeOccupation;

  await act(() => result.current.createEmployee(newEmployee));
  await act(() => result.current.deleteEmployee(newEmployee));

  expect(result.current.employees.length).toEqual(0);
});
