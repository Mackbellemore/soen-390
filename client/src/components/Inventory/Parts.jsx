import { Heading, Table, Tbody, Thead, Tr } from '@chakra-ui/react';
import { TablePagination } from '@material-ui/core';
import ExportFiles from 'components/common/ExportFiles.jsx';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import usePagination from 'hooks/usePagination.jsx';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { getParts } from 'utils/api/parts.js';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';

const Parts = () => {
  const { isLoading, isSuccess, data } = useQuery('parts', getParts);
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { setSearchInput, searchData } = useSearch();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Parts
        </Heading>
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <Search handleSearch={setSearchInput} />
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
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
            searchData(data.data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((part) => (
                <Fragment key={part._id}>
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
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ExportFiles section="parts" data={data.data} />
    </>
  );
};

export default Parts;
