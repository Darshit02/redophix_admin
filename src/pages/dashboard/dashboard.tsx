import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Layers, Mail, ClipboardList, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

const metrics = [
  {
    label: "Total Projects",
    icon: Layers,
    color: "from-indigo-500 to-indigo-700",
    key: "projects",
  },
  {
    label: "Total Inquiries",
    icon: Mail,
    color: "from-blue-500 to-blue-700",
    key: "inquiries",
  },
  {
    label: "Pending Work",
    icon: ClipboardList,
    color: "from-amber-500 to-amber-700",
    key: "pending",
  },
  {
    label: "Booked Calls",
    icon: PhoneCall,
    color: "from-green-500 to-green-700",
    key: "calls",
  },
];

const dummyStats = {
  projects: 12,
  inquiries: 25,
  pending: 5,
  calls: 7,
};

const dummyChartData = [
  { name: "Mon", inquiries: 5, calls: 1 },
  { name: "Tue", inquiries: 8, calls: 2 },
  { name: "Wed", inquiries: 4, calls: 3 },
  { name: "Thu", inquiries: 6, calls: 1 },
  { name: "Fri", inquiries: 2, calls: 4 },
  { name: "Sat", inquiries: 3, calls: 2 },
  { name: "Sun", inquiries: 7, calls: 1 },
];

const dummyInquiries = Array.from({ length: 10 }).map((_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  message: `Looking for services related to inquiry #${i + 1}`,
  date: `2025-07-${10 + i}`,
}));

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(dummyStats);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(({ label, icon: Icon, color, key }) => (
          <div
            key={label}
            onClick={() => navigate(`/admin/${key}`)}
            className="p-6 rounded-2xl shadow transition hover:scale-[1.015] hover:shadow-lg bg-white dark:bg-zinc-900 cursor-pointer"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr ${color} text-white mb-4`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
            {loading ? (
              <Skeleton className="h-6 w-16 mt-2" />
            ) : (
              <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {data[key as keyof typeof data]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Weekly Inquiries</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dummyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inquiries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Call Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dummyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calls" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Inquiries Table */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Top 10 Inquiries</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Message</th>
                <th className="py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {dummyInquiries.map((item, i) => (
                <tr key={i} className="border-b border-muted/20">
                  <td className="py-2 pr-4">{item.name}</td>
                  <td className="py-2 pr-4">{item.email}</td>
                  <td className="py-2 pr-4 max-w-xs truncate">{item.message}</td>
                  <td className="py-2">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}