import React from 'react';
import './Dashboard.scss';
import StockChart from '../../components/StockChart';
import DatePicker from '../../components/DatePicker';
import CurrencyPicker from '../../components/CurrencyPicker';
import { useSelector } from 'react-redux';
import {
  selectStockDate,
  selectStockCurrency,
} from '../../features/stock/stockSlice';

const Dashboard = () => {
  const stockDate = useSelector(selectStockDate);
  const chartCurrency = useSelector(selectStockCurrency);
  return (
    <div className="dashboard">
      <h1>Bitcoin App</h1>
      <h2>
        Bitcoin Value in {stockDate} in {chartCurrency}{' '}
      </h2>
      <div className="picker">
        <DatePicker />
        <CurrencyPicker />
      </div>
      <StockChart />
    </div>
  );
};
export default Dashboard;
