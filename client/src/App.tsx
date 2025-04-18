import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StarwarsMainPage from "./pages/StarwarsMainPage/StarwarsMainPage";
import TablePage from "./pages/TablePage/TablePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import EntityDetailsPage from "./pages/EntityDetailsPage/EntityDetailsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StarwarsMainPage />,
    },
    {
      path: "/table/:tableName",
      element: <TablePage />,
    },
    { path: "table/:tableName/:id", element: <EntityDetailsPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "admin", element: <AdminPage /> },
    { path: "register", element: <RegisterPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
