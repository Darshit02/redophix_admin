import { DeleteConfirmDialog } from "@/components/forms/portfolio/delet-dialog";
import { Pencil, Plus, PlusCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "Brand Website",
      category: "Web Design",
      status: "Completed",
    },
    {
      id: 2,
      title: "Interior 3D Render",
      category: "AutoCAD 3D",
      status: "In Progress",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Portfolio Management
        </h1>
        <Link to="/admin/portfolio/add-projects" className="inline-flex items-center cursor-pointer">
          <button className="flex items-center gap-2 text-indigo-600 text-sm px-4 py-2 border border-dashed border-indigo-600 rounded-lg  transition">
            <PlusCircle className="w-4 h-4" /> Add New
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-700">
        <table className="min-w-full text-[15px] leading-relaxed">
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                ID
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Title
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center dark:divide-zinc-700">
            {portfolioItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-zinc-800"
              >
                <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900 dark:text-gray-100 font-medium">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900 dark:text-gray-100 font-medium">
                  {item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700 dark:text-gray-300">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button className="bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-700 p-2 rounded-xl text-shadow-white dark:text-indigo-400 transition">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="bg-red-200 hover:bg-red-300 dark:bg-red-900 dark:hover:bg-red-700 p-2 rounded-xl text-shadow-white dark:text-red-400 transition">
                    <DeleteConfirmDialog onConfirm={() => console.log("Delete item", item.id)} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
