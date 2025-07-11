import { Outlet } from "react-router-dom";
import Layout from "./layout";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminLayout() {
  return (
    <>
      <Layout>
        <div className="flex mb-8 items-center justify-between p-4 bg-white dark:bg-zinc-900 border rounded-2xl dark:border-zinc-800">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Redophix
          </h1>
          <div>
            <ModeToggle />
          </div>
        </div>
        <Outlet />
      </Layout>
    </>
  );
}
