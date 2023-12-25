import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import GlobalProvider from "./context";

function App() {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
}

export default App;
