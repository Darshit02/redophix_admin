import { Outlet } from "react-router-dom";
import Layout from "./layout";
import Breadcrumb from "../breadcrumb/breadcrumb";

export default function AdminLayout() {
  return (
    <>
      <Layout>
        {/* <div className="flex mb-8 items-center justify-between p-4  w-fit border rounded-2xl dark:border-zinc-800">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Redophix
          </h1>
        </div> */}
        {/* Breadcrumb can be added here if needed */}
        <Breadcrumb/>
        {/* Outlet for nested routes */}
        <Outlet />
      </Layout>
    </>
  );
}
