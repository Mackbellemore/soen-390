import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Heading, IconButton, Table, Tag, Tbody, Thead, Tr } from '@chakra-ui/react';
import { Paper, TableContainer, TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import AddDefectModal from 'components/QualityManagement/AddDefectModal.jsx';
import useQualityPartsTable from 'hooks/useQualityPartsTable.jsx';
import React, { Fragment } from 'react';

const Parts = () => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleStatusColor,
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
  } = useQualityPartsTable();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Defects
        </Heading>
        <AddDefectModal showButton={true} />
        <NoResultImage />
      </>
    );
  }

  return (
    <Box overflowX="auto">
      <AddDefectModal />
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
                  Ticket ID
                </Checkbox>
              </StyledTableHeader>
              <StyledTableHeader>Product Name</StyledTableHeader>
              <StyledTableHeader>Defect Type</StyledTableHeader>
              <StyledTableHeader>Status of Defect</StyledTableHeader>
              <StyledTableHeader>Desc of Solution</StyledTableHeader>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess &&
              data.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((defect) => (
                  <Fragment key={defect._id}>
                    <StyledTableRow>
                      <StyledTableCell>
                        <Checkbox
                          onChange={(event) => handleOnChange(event, defect._id)}
                          isChecked={isSelected(defect._id)}
                        >
                          {defect.id}
                        </Checkbox>
                      </StyledTableCell>
                      <StyledTableCell>{defect.partName}</StyledTableCell>
                      <StyledTableCell>
                        <Tag
                          size="md"
                          variant="solid"
                          colorScheme={defect.type === 'Broken' ? 'red' : 'orange'}
                        >
                          {defect.type}
                        </Tag>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Tag
                          size="md"
                          variant="solid"
                          colorScheme={handleStatusColor(defect.status)}
                        >
                          {defect.status}
                        </Tag>
                      </StyledTableCell>
                      <StyledTableCell>{defect.description}</StyledTableCell>
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
      </TableContainer>
    </Box>
  );
};

export default Parts;
