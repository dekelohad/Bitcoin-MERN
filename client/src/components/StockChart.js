import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchStock,
  selectStockDate,
  selectStockCurrency,
} from '../features/stock/stockSlice';

const StockChart = () => {
  const dispatch = useDispatch();
  const stockDate = useSelector(selectStockDate);
  const chartCurrency = useSelector(selectStockCurrency);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchStokeByDate = async () => {
      const response = await dispatch(fetchStock({ date: stockDate }));
      if (response.payload) {
        const {
          closeILS,
          closeUSD,
          highILS,
          highUSD,
          lowILS,
          lowUSD,
          openILS,
          openUSD,
        } = response.payload;

        const stockValueInILS = [openILS, highILS, lowILS, closeILS];
        const stockValueInUSD = [openUSD, highUSD, lowUSD, closeUSD];
        if (chartCurrency === 'USD') {
          setChartData(stockValueInUSD);
        } else {
          setChartData(stockValueInILS);
        }
      }
    };
    fetchStokeByDate();
    return function cleanup() {
      setChartData([]);
    };
  }, [stockDate, dispatch, chartCurrency, setChartData]);

  const data = {
    labels: ['Open', 'High', 'Low', 'Close'],
    datasets: [
      {
        label: `Bitcoin Value  ${chartCurrency}`,
        data: chartData,
        backgroundColor: 'black',
        borderColor: 'black',
      },
    ],
  };
  return <Line data={data} />;
};

export default StockChart;
