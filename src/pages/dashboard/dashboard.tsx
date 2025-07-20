import {
  Layers,
  Mail,
  ClipboardList,
  PhoneCall,
} from "lucide-react";

export default function Dashboard() {
  const metrics = [
    {
      label: "Total Projects",
      value: 12,
      icon: Layers,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      label: "Total Inquiries",
      value: 25,
      icon: Mail,
      color: "from-blue-500 to-blue-700",
    },
    {
      label: "Pending Work",
      value: 5,
      icon: ClipboardList,
      color: "from-amber-500 to-amber-700",
    },
    {
      label: "Booked Calls",
      value: 7,
      icon: PhoneCall,
      color: "from-green-500 to-green-700",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-6 rounded-2xl shadow transition hover:scale-[1.015] hover:shadow-lg bg-white dark:bg-zinc-900"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr ${color} text-white mb-4`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {value}
            </div>
          </div>
        ))}
      </div>
      </>
  );
}
