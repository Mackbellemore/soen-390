import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { makeRequest } from '@/src/utils/api';
import Materials from './inventory items/Materials';

const Inventory = () => {
  const [items, setItems] = useState([]);

  const getItems = async (name) => {
    // const toast = useToast();
    try {
      const response = await makeRequest('get', name, {});
      setItems(response.data);
      console.log('in get method to items' + response.data);
      console.log('in get method' + items);
      //   let table = response.data.map((material) => (
      //     <Tr>
      //       <Td>{material.name}</Td>
      //       <Td>{material.description}</Td>
      //       <Td>{material.stock}</Td>
      //       <Td>{material.weight}</Td>
      //       <Td>{material.price}</Td>
      //     </Tr>
      //   ));
      //   setItems(newMaterials);

      //setCookie('userLoggedIn', true, { path: '/' });
      // uiStore.userLogIn();
      //history.push('/main');
    } catch {
      //   toast({
      //     position: 'top',
      //     title: 'An error occurred.',
      //     description: 'Unable to log in',
      //     status: 'error',
      //     duration: 2000,
      //     isClosable: true,
      //   });
    }
  };

  const tableItems = () => {};

  return (
    <>
      <Tabs isManual variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab onClick={() => getItems('materials')}>Materials</Tab>
          <Tab>Component</Tab>
          <Tab>Product</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p> materials table here </p>
            <Materials items={items} />
          </TabPanel>
          <TabPanel>
            <p> component table here </p>
          </TabPanel>
          <TabPanel>
            <p> product table here </p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button onClick={() => getItems('materials')}> Material Button </Button>
      <Table variant="striped" colorScheme="green">
        <TableCaption placement="top">List of materials</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Stock</Th>
            <Th>Weight</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        {<Tbody>{}</Tbody>}
      </Table>
    </>
  );
};

export default Inventory;
