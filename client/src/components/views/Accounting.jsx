import { Heading, SimpleGrid, Text, Center, Box } from '@chakra-ui/react';
import useAccountingCharts from 'hooks/useAccountingCharts';
import useWindowSize from 'hooks/useWindowSize';
import Head from 'next/head';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#ff1a1a', '#55c684'];

const Accounting = () => {
  const windowSize = useWindowSize();
  const { ledgerData, expenseIncomeData } = useAccountingCharts();

  return (
    <>
      <Head>
        <title>ERP - Accounting</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" my={5}>
        Accounting
      </Heading>
      <SimpleGrid columns={[1, null, 2]} spacing={5}>
        <Box>
          <Text fontSize="2xl" align="center">
            Expenses & Income
          </Text>
          {expenseIncomeData.length > 0 && (
            <Center border="1px" borderColor="gray.200" ml={5} boxShadow="xl" borderTopRadius="xl">
              <BarChart
                width={windowSize.width / 2.5}
                height={windowSize.height / 2.5}
                data={expenseIncomeData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="income" fill="#55c684" />
                <Bar dataKey="expense" fill="#ff1a1a" />
              </BarChart>
            </Center>
          )}
        </Box>
        <Box>
          <Text fontSize="2xl" align="center">
            General Ledger
          </Text>
          {ledgerData.length > 0 && (
            <Center border="1px" borderColor="gray.200" mr={5} boxShadow="xl" borderTopRadius="xl">
              <PieChart width={windowSize.width / 2.5} height={windowSize.height / 2.5}>
                <Legend verticalAlign="top" />
                <Pie data={ledgerData} dataKey="value" fill="#82ca9d" label>
                  {ledgerData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </Center>
          )}
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Accounting;
