import React, {type ReactElement}from "react";
import {
  RouterProvider,
} from "react-router-dom";
import { AppRouter } from "./navigation";
import { UserProvider } from "./utils/UserProvider";


const MainPage = (): ReactElement=> {

  return (
    <UserProvider>
        <RouterProvider router={AppRouter} />
    </UserProvider>
  );
};

export default MainPage;
