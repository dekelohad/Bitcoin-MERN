import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useDispatch } from 'react-redux';
import { setStockCurrency } from '../features/stock/stockSlice';

const CurrencyPicker = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('US');

  const handleCurrencyChange = (country) => {
    setSelected(country);
    let currency;
    if (country === 'US') {
      currency = 'USD';
    } else {
      currency = 'ILS';
    }
    dispatch(setStockCurrency({ currency }));
  };

  return (
    <>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(country) => handleCurrencyChange(country)}
        selectButtonClassName="menu-flags-button"
        countries={['US', 'IL']}
        customLabels={{
          US: 'USD',
          IL: 'NIS',
        }}
      />
    </>
  );
};

export default CurrencyPicker;
