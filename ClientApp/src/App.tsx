import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MasterLayout } from "./Layouts/MasterLayout.tsx";
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux/store/store.ts";
import SyncToken from "./Services/Utilities/utility.ts";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#34336c" },
    },
  });

  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <BrowserRouter>
          <SyncToken />
          <MasterLayout></MasterLayout>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
