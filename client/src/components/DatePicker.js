import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setStockDate } from '../features/stock/stockSlice';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    dispatch(setStockDate({ date: formattedDate }));
  };
  return (
    <div className="date__picker container">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label="Select a date"
          onChange={handleDateChange}
          value={selectedDate}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
