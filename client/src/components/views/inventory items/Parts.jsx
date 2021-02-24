import React, { Fragment } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption } from '@chakra-ui/react';
import Loader from 'components/common/Loader';
import { getParts } from 'utils/api/parts.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from '../../common/Table';

const Parts = () => {
  const { isLoading, isSuccess, data } = useQuery('parts', getParts);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
      <TableCaption placement="top">List of parts</TableCaption>
      <Thead>
        <Tr>
          <StyledTableHeader>Name</StyledTableHeader>
          <StyledTableHeader>Description</StyledTableHeader>
          <StyledTableHeader>Quality</StyledTableHeader>
          <StyledTableHeader>Type</StyledTableHeader>
          <StyledTableHeader>Color</StyledTableHeader>
          <StyledTableHeader>Finish</StyledTableHeader>
          <StyledTableHeader>Grade</StyledTableHeader>
          <StyledTableHeader>Detail</StyledTableHeader>
        </Tr>
      </Thead>
      <Tbody>
        {isSuccess &&
          data.data.map((part) => (
            <Fragment key={part.id}>
              <StyledTableRow>
                <StyledTableCell>{part.name}</StyledTableCell>
                <StyledTableCell>{part.description}</StyledTableCell>
                <StyledTableCell>{part.quality}</StyledTableCell>
                <StyledTableCell>{part.type}</StyledTableCell>
                <StyledTableCell>{part.color}</StyledTableCell>
                <StyledTableCell>{part.finish}</StyledTableCell>
                <StyledTableCell>{part.grade}</StyledTableCell>
                <StyledTableCell>{part.detail}</StyledTableCell>
              </StyledTableRow>
            </Fragment>
          ))}
      </Tbody>
    </Table>
  );
};

export default Parts;
