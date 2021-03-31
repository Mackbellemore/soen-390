import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getOrders } from 'utils/api/orders.js';
import { getBikes } from 'utils/api/bikes.js';
import { getSales } from 'utils/api/sales';

const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - Number(yearStart)) / 86400000 + 1) / 7);
};

const useAccountingCharts = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [expenseIncomeData, setExpenseIncomeData] = useState([]);
  const [bikeData, setBikeData] = useState(new Map());
  const { isSuccess: isOrderSuccess, data: orderData } = useQuery('orders', getOrders);
  const { isSuccess: isSalesSuccess, data: salesData } = useQuery('sales', getSales);
  const { isSuccess: isBikesSuccess, data: bikesData } = useQuery('bikes', getBikes);

  useEffect(() => {
    if (isBikesSuccess) {
      setBikeData(new Map(bikesData.data.map((bike) => [bike._id, bike.sellingPrice])));
    }
  }, [bikesData?.data, isBikesSuccess]);

  useEffect(() => {
    const expenseIncomeMap = new Map();
    const ledgerMap = new Map();

    if (isOrderSuccess) {
      orderData.data.forEach((order) => {
        if (order.status === 'Rejected') return;

        let payable = ledgerMap.get('Payable')?.value ?? 0;
        payable += order.cost;
        ledgerMap.set('Payable', { ...ledgerMap.get('Payable'), name: 'Payable', value: payable });

        const weekNumber = getWeekNumber(new Date(order.orderDate));

        let expense = expenseIncomeMap.get(weekNumber)?.expense ?? 0;
        expense += order.cost;
        expenseIncomeMap.set(weekNumber, {
          ...expenseIncomeMap.get(weekNumber),
          name: `Week ${weekNumber}`,
          expense,
        });
      });
    }

    if (isSalesSuccess) {
      salesData.data.forEach((sale) => {
        if (sale.status === 'Cancelled') return;

        const sellingPrice = bikeData.get(sale.bikeId);

        let receivable = ledgerMap.get('Receivable')?.value ?? 0;
        receivable += sellingPrice * sale.quantity;
        ledgerMap.set('Receivable', {
          ...ledgerMap.get('Receivable'),
          name: 'Receivable',
          value: receivable,
        });

        const saleTimestamp = parseInt(sale._id.toString().substr(0, 8), 16) * 1000;
        const weekNumber = getWeekNumber(new Date(saleTimestamp));
        let income = expenseIncomeMap.get(weekNumber)?.income ?? 0;
        income += sellingPrice * sale.quantity;
        expenseIncomeMap.set(weekNumber, {
          ...expenseIncomeMap.get(weekNumber),
          name: `Week ${weekNumber}`,
          income: income,
        });
      });
    }

    setLedgerData(Array.from(ledgerMap.values()));
    setExpenseIncomeData(Array.from(expenseIncomeMap.values()));
  }, [bikeData, isOrderSuccess, isSalesSuccess, orderData?.data, salesData?.data]);

  return { ledgerData, expenseIncomeData };
};

export default useAccountingCharts;
