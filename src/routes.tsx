import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import LogoOnlyLayout from "apps/layouts/LogoOnlyLayout";
import DashboardLayout from "apps/layouts/dashboard";
//
import Page404 from "apps/common/features/Page404";
import { CreateProject } from "apps/projects/features/CreateProject";

// ----------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      path: "/create",
      element: <DashboardLayout />,
      children: [{ path: "", element: <CreateProject /> }],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "/", element: <Navigate to="/create" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
  ]);
}
