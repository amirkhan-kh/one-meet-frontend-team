import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store-config";
import { ChakraProvider } from "@chakra-ui/react"; 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider> 
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
