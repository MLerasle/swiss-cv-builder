export function Card({ children }) {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 my-8">
      <div className="px-4 py-6 sm:p-8">{children}</div>
    </div>
  );
}
