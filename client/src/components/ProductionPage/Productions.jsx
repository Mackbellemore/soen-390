import { Table, Thead, Tbody, Tr, Th, Heading } from '@chakra-ui/react';
import { Fragment } from 'react';
import { getProductions } from 'utils/api/productions';
import { useQuery } from 'react-query';
import Loader from 'components/common/Loader';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { NoResultImage } from 'components/common/Image.jsx';

const Productions = () => {
  const { isLoading, isSuccess, data } = useQuery('productions', getProductions);

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Productions
        </Heading>
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      {/* {console.log('hello')} */}
      {/* {console.log(data)} */}
      {/* {console.log(data.data)} */}
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Order ID</Th>
            <Th>Component</Th>
            <Th>Option 1</Th>
            <Th>Option 2</Th>
            <Th>Quantity</Th>
            <Th>Expected Start Date</Th>
            <Th>Expected End Date</Th>
            <Th>Actual Start Date</Th>
            <Th>Actual End Date</Th>
            <Th>Manufacture</Th>
            <Th>Note</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((production) => (
            <Fragment key={production.id}>
              <StyledTableRow>
                <StyledTableCell>{production.status}</StyledTableCell>
                <StyledTableCell>{production.orderID}</StyledTableCell>
                <StyledTableCell>{production.component}</StyledTableCell>
                <StyledTableCell>{production.option1}</StyledTableCell>
                <StyledTableCell>{production.option2}</StyledTableCell>
                <StyledTableCell>{production.quantity}</StyledTableCell>
                <StyledTableCell>{production.expectedStartDate}</StyledTableCell>
                <StyledTableCell>{production.expectedEndDate}</StyledTableCell>
                <StyledTableCell>{production.actualStartDate}</StyledTableCell>
                <StyledTableCell>{production.actualEndDate}</StyledTableCell>
                <StyledTableCell>{production.note}</StyledTableCell>
              </StyledTableRow>
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default Productions;
