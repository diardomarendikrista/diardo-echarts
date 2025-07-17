import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-100 p-4 sm:p-8 w-full">{children}</div>
    </div>
  );
}
