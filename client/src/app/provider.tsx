import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import {store,persistor} from './../stores/store';
import { PersistGate } from "redux-persist/integration/react";

interface ProviderProps {
  children: ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
    </>
  );
};

export default Providers;
