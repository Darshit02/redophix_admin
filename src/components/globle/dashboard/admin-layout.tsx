import { Outlet } from "react-router-dom";
import Layout from "./layout";
import Breadcrumb from "../breadcrumb/breadcrumb";

export default function AdminLayout() {
  return (
    <>
      <Layout>
        {/* Breadcrumb can be added here if needed */}
        <Breadcrumb/>
        {/* Outlet for nested routes */}
        <Outlet />
      </Layout>
    </>
  );
}
