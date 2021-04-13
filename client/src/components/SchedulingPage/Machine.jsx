import React, { Fragment } from 'react';
import { Box, Table, Thead, Tbody, Tr, Heading, IconButton, Checkbox } from '@chakra-ui/react';
import Loader from 'components/common/Loader.jsx';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination, Paper, TableContainer } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import { DeleteIcon } from '@chakra-ui/icons';
import AddMachineModal from 'components/SchedulingPage/AddMachineModal.jsx';
import useMachineTable from 'hooks/useMachineTable.jsx';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const Machines = () => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    handleSelectAllClick,
    handleOnChange,
    handleDelete,
    isLoading,
    isSuccess,
    page,
    rowsPerPage,
    data,
    selected,
  } = useMachineTable();
  const { setSearchInput, searchData } = useSearch();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No machines.
        </Heading>
        <AddMachineModal showButton={true} />
        <NoResultImage />
      </>
    );
  }
  return (
    <>
      <AddMachineModal />
      <IconButton
        colorScheme="blue"
        variant="outline"
        aria-label="delete"
        float="right"
        m={2}
        icon={<DeleteIcon />}
        onClick={handleDelete}
        isDisabled={selected.length === 0}
      />
      <Search handleSearch={setSearchInput} />
      <Box overflowX="auto">
        <TableContainer component={Paper}>
          <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
            <Thead>
              <Tr>
                <StyledTableHeader>
                  <Checkbox
                    isIndeterminate={selected.length > 0 && selected.length < data.data.length}
                    isChecked={data.data.length > 0 && selected.length === data.data.length}
                    onChange={handleSelectAllClick}
                  >
                    Machine ID
                  </Checkbox>
                </StyledTableHeader>
                <StyledTableHeader>Machine name</StyledTableHeader>
                <StyledTableHeader>Status</StyledTableHeader>
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess &&
                searchData(data.data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((machine) => (
                    <Fragment key={machine._id}>
                      <StyledTableRow>
                        <StyledTableCell>
                          <Checkbox
                            onChange={(event) => handleOnChange(event, machine._id)}
                            isChecked={isSelected(machine._id)}
                          >
                            {machine._id.substr(machine._id.length - 3)}
                          </Checkbox>
                        </StyledTableCell>
                        <StyledTableCell>{machine.machineName}</StyledTableCell>
                        <StyledTableCell>{machine.status}</StyledTableCell>
                      </StyledTableRow>
                    </Fragment>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ExportFiles section="machine" data={data.data} />
    </>
  );
};

export default Machines;
