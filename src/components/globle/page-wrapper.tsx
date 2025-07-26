// components/ui/page-wrapper.tsx
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-6  w-full">
      {children}
    </div>
  );
}
