interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  error?: boolean;
}

const Input = ({ label, htmlFor, error, ...props }: InputProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="block text-sm/6 font-medium text-gray-900 "
        >
          {label}
        </label>
      </div>
      <div className="mt-2">
        <input
          {...props}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 ${
            error ? "border-red-500 " : ""
          } p-2 focus:border-indigo-500 focus:outline-none  placeholder:text-gray-400 sm:text-sm/6`}
        />
      </div>
    </div>
  );
};

export default Input;
