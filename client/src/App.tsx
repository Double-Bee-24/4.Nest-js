import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StarwarsMainPage from "./pages/StarwarsMainPage/StarwarsMainPage";
import Table from "./components/Table/Table";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StarwarsMainPage />,
    },
    {
      path: "/table/:tableName",
      element: <Table />,
    },
    { path: "login", element: <LoginPage /> },
    { path: "admin", element: <AdminPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
