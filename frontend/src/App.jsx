import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import AllSpots from "./components/Spots";
import SpotDetails from "./components/Spots/SpotDetails";
import SpotForm from "./components/Spots/CreateSpot";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllSpots />,
      },
      {
        path: "/spots/:id",
        element: <SpotDetails />,
      },
      {
        path: "/spots/new",
        element: <SpotForm isEdit={false} />,
      },
      {
        path: "/spots/:id/edit",
        element: <SpotForm isEdit={true} />,
      },
      {
        path: "/spots/current",
        element: <AllSpots />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
