import { ChevronRightIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
} from '@chakra-ui/react';
import { StyledTableCell, StyledTableRow } from 'components/common/Table.jsx';
import { salesStatus } from 'constants.js';
import useSales from 'hooks/useSales.jsx';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getOneBike } from 'utils/api/bikes.js';
import AboutBike from './AboutBike.jsx';

const SaleRow = ({ sale }) => {
  const { isLoading, data } = useQuery(`bikes/${sale.bikeId}`, () => getOneBike(sale.bikeId));
  const {
    isInfoModalOpen,
    onInfoModalOpen,
    onInfoModalClose,
    handleStatusColor,
    handleStatusChange,
  } = useSales(sale);

  if (isLoading) {
    return (
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell>
          <InfoOutlineIcon />
        </StyledTableCell>
      </StyledTableRow>
    );
  }

  return (
    <StyledTableRow onClick={onInfoModalOpen} cursor="pointer">
      <StyledTableCell>{data.data.name}</StyledTableCell>
      <StyledTableCell>{sale.customerName}</StyledTableCell>
      <StyledTableCell>{sale.quantity}</StyledTableCell>
      <StyledTableCell>${sale.quantity * data.data.sellingPrice}</StyledTableCell>
      <StyledTableCell>
        <Tag size="md" variant="solid" colorScheme={handleStatusColor(sale.status)}>
          {sale.status}
        </Tag>
      </StyledTableCell>
      <StyledTableCell>
        <InfoOutlineIcon />
        <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sale ID: {sale._id}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <AboutBike bikeId={data.data._id} />
              <Heading size="md" m={3}>
                About the sale
              </Heading>
              <Text>Customer Name: {sale.customerName}</Text>
              <Text>Customer Email: {sale.customerEmail}</Text>
              <Text>Quantity sold: {sale.quantity}</Text>
              <Text>
                Profits:{' '}
                {sale.quantity * data.data.sellingPrice - sale.quantity * data.data.costPrice}$
              </Text>
            </ModalBody>
            <ModalFooter>
              <Menu isLazy="true">
                <MenuButton as={Button} rightIcon={<ChevronRightIcon />} mr={3}>
                  Change Status
                </MenuButton>
                <MenuList>
                  {salesStatus
                    .filter((thisStatus) => thisStatus !== sale.status)
                    .map((thisStatus) => (
                      <MenuItem key={thisStatus} onClick={() => handleStatusChange(thisStatus)}>
                        {thisStatus}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </StyledTableCell>
    </StyledTableRow>
  );
};

SaleRow.propTypes = {
  sale: PropTypes.object.isRequired,
};

export default SaleRow;
