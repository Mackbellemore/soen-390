import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  Heading,
  IconButton,
  Table,
  Tag,
  Tbody,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { Paper, TableContainer, TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import AddDefectModal from 'components/QualityManagement/AddDefectModal.jsx';
import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { deleteDefects, getDefects } from 'utils/api/defect.js';

const Parts = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('defects', getDefects);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const toast = useToast();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleStatusColor = (status) => {
    switch (status) {
      case 'Solved':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Ongoing':
        return 'yellow';
    }
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = data.data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOnChange = (e, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDefects(selected);
      toast({
        title: 'Deleted',
        description: 'Defects have been deleted successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setSelected([]);
      refetch();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
      <AddDefectModal />
    </Box>
  );
};

export default Parts;
