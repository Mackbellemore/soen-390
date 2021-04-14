import { Heading, Flex, Text, Center, Box } from '@chakra-ui/react';
import useWindowSize from 'hooks/useWindowSize';
import { productionData, plData } from 'components/Planning/PlanningData.js';
import Head from 'next/head';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const PlanningHeader = () => (
  <>
    <Head>
      <title>ERP - Planning</title>
    </Head>
    <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
      Planning
    </Heading>
  </>
);

const Planning = () => {
  const windowSize = useWindowSize();

  return (
    <>
      <PlanningHeader />
      <Flex flexDirection="column">
        <Box>
          <Text fontSize="2xl" align="center">
            Expected Production
          </Text>
          {productionData.length > 0 && (
            <Center border="1px" borderColor="gray.200" boxShadow="xl" borderTopRadius="xl">
              <BarChart
                width={windowSize.width / 1.5}
                height={windowSize.height / 1.5}
                data={productionData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" margin="10px" />
                <Bar name="Road Bike" dataKey="roadBike" fill="#5be7c4" />
                <Bar name="Mountain Bike" dataKey="mountainBike" fill="#4fc1e9" />
                <Bar name="Others" dataKey="others" fill="#7a57d1" />
              </BarChart>
            </Center>
          )}
        </Box>
        <Box>
          <Text fontSize="2xl" align="center">
            Expected Profit & Loss
          </Text>
          {plData.length > 0 && (
            <Center border="1px" borderColor="gray.200" boxShadow="xl" borderTopRadius="xl">
              <BarChart
                width={windowSize.width / 1.5}
                height={windowSize.height / 1.5}
                data={plData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar name="Revenue" dataKey="revenue" fill="#ff008e" />
                <Bar name="Cost" dataKey="cost" fill="#124e96" />
                <Bar name="Profit" dataKey="profit" fill="#0d8abc" />
              </BarChart>
            </Center>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Planning;
