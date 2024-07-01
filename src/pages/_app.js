
import { useState, createContext } from 'react';

export const SelectedCurrency = createContext();


function MyApp({ Component, pageProps }) {

  const [selectedCurrency, setSelectedCurrency] = useState(
    {
      Name: 'Usd',
      Value: 0.012
    }
  )
 
  return (
      <SelectedCurrency.Provider value={{selectedCurrency,setSelectedCurrency}}>
        <Component {...pageProps} />
      </SelectedCurrency.Provider>
  );
}

export default MyApp;
