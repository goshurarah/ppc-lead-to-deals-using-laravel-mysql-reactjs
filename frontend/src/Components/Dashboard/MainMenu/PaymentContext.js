// PaymentContext.js
import React, { createContext, useState, useContext } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [leadsresponse, setleadsresponse] = useState(""); // Make sure this is defined correctly

  return (
    <PaymentContext.Provider value={{ leadsresponse, setleadsresponse }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};
