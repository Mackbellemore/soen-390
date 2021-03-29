import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Table,
  Tag,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import PropTypes from 'prop-types';

const DefectsTable = ({ bike, defects }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
      <IconButton
        colorScheme="blue"
        variant="unstyled"
        icon={<InfoOutlineIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{bike}'s Defect List</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} overflowX="auto">
            <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
              <Thead>
                <Tr>
                  <StyledTableHeader>Ticket ID</StyledTableHeader>
                  <StyledTableHeader>Part Name</StyledTableHeader>
                  <StyledTableHeader>Defect Type</StyledTableHeader>
                  <StyledTableHeader>Status of Defect</StyledTableHeader>
                  <StyledTableHeader>Desc of Solution</StyledTableHeader>
                </Tr>
              </Thead>
              <Tbody>
                {defects.map((defect) => (
                  <StyledTableRow key={defect.id}>
                    <StyledTableCell>{defect.id}</StyledTableCell>
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
                      <Tag size="md" variant="solid" colorScheme={handleStatusColor(defect.status)}>
                        {defect.status}
                      </Tag>
                    </StyledTableCell>
                    <StyledTableCell width="30%">{defect.description}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

DefectsTable.propTypes = {
  bike: PropTypes.string,
  defects: PropTypes.array,
};

export default DefectsTable;
