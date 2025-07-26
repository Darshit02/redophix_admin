import Layout from "./layout";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { Outlet } from "react-router-dom";
import { PageWrapper } from "../page-wrapper";

export default function AdminLayout() {
  return (
    <Layout>
      <PageWrapper>
        <Breadcrumb/>
        <div className="mt-4">
          <Outlet />
        </div>
      </PageWrapper>
    </Layout>
  );
}
