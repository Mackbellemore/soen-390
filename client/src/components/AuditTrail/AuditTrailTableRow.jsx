import {
  Heading,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { StyledTableCell, StyledTableRow } from 'components/common/Table.jsx';
import { Fragment } from 'react';
import JSONTree from 'react-json-tree';

const jsonTheme = {
  scheme: 'bright',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c',
};

const AuditTrailTableRow = ({ log }) => {
  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose,
  } = useDisclosure();

  return (
    <StyledTableRow>
      <StyledTableCell>{log.email}</StyledTableCell>
      <StyledTableCell>{log.action}</StyledTableCell>
      <StyledTableCell>{log.date}</StyledTableCell>
      <StyledTableCell>
        {log.meta && (
          <>
            <InfoOutlineIcon onClick={onInfoModalOpen} cursor="pointer" />
            <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Heading size="md" m={3}>
                    Log Metadata
                  </Heading>
                  <JSONTree
                    data={log.meta}
                    hideRoot={true}
                    theme={jsonTheme}
                    shouldExpandNode={() => true}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

AuditTrailTableRow.propTypes = {
  log: PropTypes.object.isRequired,
};

export default AuditTrailTableRow;
