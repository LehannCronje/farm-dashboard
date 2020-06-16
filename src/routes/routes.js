import Dashboard from "../views/Dashboard.jsx";
import User from "../views/Users.jsx";
import Report from "../views/ReportView.jsx";
import Site from "views/DashboardViews/Site";
import Farm from "views/DashboardViews/Farm";
import WorkerGroup from "views/DashboardViews/WorkerGroup";

var routes = [
  {
    sidebar: true,
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    sidebar: true,
    path: "/user",
    name: "User",
    component: User,
    layout: "/admin",
  },
  {
    sidebar: false,
    path: "/farm/",
    name: "Farm",
    component: Farm,
    layout: "/admin/dashboard",
  },
  {
    sidebar: false,
    path: "/farm/site",
    name: "Site",
    component: Site,
    layout: "/admin/dashboard",
  },
  {
    sidebar: false,
    path: "/farm/worker-group",
    name: "WorkerGroup",
    component: WorkerGroup,
    layout: "/admin/dashboard",
  },
  {
    sidebar: true,
    path: "/report",
    name: "Report",
    component: Report,
    layout: "/admin",
  },
];

export default routes;
