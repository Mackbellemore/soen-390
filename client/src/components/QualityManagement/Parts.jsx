import React, { Fragment, useState, useRef } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  useToast,
  Link,
  Tag,
  Checkbox,
} from '@chakra-ui/react';
import Loader from 'components/common/Loader';
import { getDefects, createDefect, deleteDefects } from 'utils/api/defect.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination, Paper, TableContainer } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import { DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';

const Parts = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('defects', getDefects);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  // Modal (add new defect)
  const [partName, setPartName] = useState('');
  const type = useRef('');
  const status = useRef('');
  const description = useRef('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
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

  const handlePartNameInput = (e) => {
    setPartName(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    try {
      await createDefect({
        partName: partName,
        type: type.current.value,
        status: status.current.value,
        description: description.current.value,
      });
      toast({
        title: 'Request Sent',
        description: 'Defect has been created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
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
    setIsLoadingButton(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  const addDefectForm = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new Defect</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Part Name</FormLabel>
            <Input onChange={handlePartNameInput} value={partName} placeholder="Part name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Defect Type</FormLabel>
            <Select ref={type}>
              <option>Broken</option>
              <option>Reparable</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Defect Status</FormLabel>
            <Select ref={status}>
              <option>Solved</option>
              <option>Pending</option>
              <option>Ongoing</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea ref={description} placeholder="Description" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoadingButton}
            isDisabled={!partName}
            onClick={handleSubmit}
            colorScheme="blue"
            mr={3}
          >
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Defects
        </Heading>
        {addDefectForm()}
        <Link onClick={onOpen}>
          <NoResultImage />
        </Link>
      </>
    );
  }

  return (
    <Box overflowX="auto">
      <IconButton
        colorScheme="blue"
        variant="outline"
        aria-label="add"
        float="right"
        m={2}
        icon={<SmallAddIcon />}
        onClick={onOpen}
      />
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
      {addDefectForm()}
    </Box>
  );
};

export default Parts;
