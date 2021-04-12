import React, { Fragment } from 'react';
import { Box, Table, Thead, Tbody, Tr, Heading, IconButton, Checkbox } from '@chakra-ui/react';
import Loader from 'components/common/Loader.jsx';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination, Paper, TableContainer } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import { DeleteIcon } from '@chakra-ui/icons';
import AddSchedulingModal from 'components/SchedulingPage/AddSchedulingModal.jsx';
import useSchedulingTable from 'hooks/useSchedulingTable.jsx';
import { formatDateAndTime } from 'utils/dateFunctions.js';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const Schedulings = () => {
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
  } = useSchedulingTable();
  const { setSearchInput, searchData } = useSearch();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No schedulings.
        </Heading>
        <AddSchedulingModal showButton={true} />
        <NoResultImage />
      </>
    );
  }
  return (
    <Box overflowX="auto">
      <AddSchedulingModal />
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
                  Schedule ID
                </Checkbox>
              </StyledTableHeader>
              <StyledTableHeader>Start Time</StyledTableHeader>
              <StyledTableHeader>End Time</StyledTableHeader>
              <StyledTableHeader>Frequency</StyledTableHeader>
              <StyledTableHeader>Machine Name</StyledTableHeader>
              <StyledTableHeader>Quantity</StyledTableHeader>
              <StyledTableHeader>Production Part</StyledTableHeader>
              <StyledTableHeader>Cost</StyledTableHeader>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess &&
              searchData(data.data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((scheduling) => (
                  <Fragment key={scheduling._id}>
                    <StyledTableRow>
                      <StyledTableCell>
                        <Checkbox
                          onChange={(event) => handleOnChange(event, scheduling._id)}
                          isChecked={isSelected(scheduling._id)}
                        >
                          {scheduling._id.substr(scheduling._id.length - 3)}
                        </Checkbox>
                      </StyledTableCell>
                      <StyledTableCell>{formatDateAndTime(scheduling.startTime)}</StyledTableCell>
                      <StyledTableCell>{formatDateAndTime(scheduling.endTime)}</StyledTableCell>
                      <StyledTableCell>{scheduling.frequency}</StyledTableCell>
                      <StyledTableCell>{scheduling.machineName}</StyledTableCell>
                      <StyledTableCell>{scheduling.quantity}</StyledTableCell>
                      <StyledTableCell>{scheduling.partType}</StyledTableCell>
                      <StyledTableCell>{scheduling.cost}</StyledTableCell>
                    </StyledTableRow>
                  </Fragment>
                ))}
          </Tbody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={data.data.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <ExportFiles section="schedulings" data={data.data} />
      </TableContainer>
    </Box>
  );
};

export default Schedulings;
