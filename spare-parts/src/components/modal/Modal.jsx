export const Modal = ({ title, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-auto open-modal animation fadeIn z-50">
      <div className="bg-slate-100 p-4 rounded-lg shadow-lg z-50">
        <h2 className="mb-6 font-medium text-xl">{title}</h2>
        {children}
      </div>
    </div>
  );
};
