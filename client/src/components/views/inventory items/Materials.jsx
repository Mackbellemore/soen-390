import React, { Fragment } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption, Heading, Image } from '@chakra-ui/react';
import Loader from 'components/common/Loader';
import { getMaterials } from 'utils/api/materials.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from '../../common/Table';

const Materials = () => {
  const { isLoading, isSuccess, data } = useQuery('materials', getMaterials);

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Materials
        </Heading>
        <Image
          src="/images/noResults.png"
          alt="No results illustration"
          width="100%"
          height="100%"
        />
      </>
    );
  }

  return (
    <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
      <TableCaption placement="top">List of materials</TableCaption>
      <Thead>
        <Tr>
          <StyledTableHeader>Name</StyledTableHeader>
          <StyledTableHeader>Description</StyledTableHeader>
          <StyledTableHeader>Stock</StyledTableHeader>
          <StyledTableHeader>Weight</StyledTableHeader>
          <StyledTableHeader>Price</StyledTableHeader>
        </Tr>
      </Thead>
      <Tbody>
        {isSuccess &&
          data.data.map((material) => (
            <Fragment key={material.id}>
              <StyledTableRow>
                <StyledTableCell>{material.name}</StyledTableCell>
                <StyledTableCell>{material.description}</StyledTableCell>
                <StyledTableCell>{material.stock}</StyledTableCell>
                <StyledTableCell>{material.weight}</StyledTableCell>
                <StyledTableCell>{material.price}</StyledTableCell>
              </StyledTableRow>
            </Fragment>
          ))}
      </Tbody>
    </Table>
  );
};

export default Materials;
