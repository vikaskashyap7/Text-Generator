import react from "react";

const Button = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      {children}
    </button>
);
export default Button;