import { forwardRef, ReactNode, useId } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, type, ...props }, ref) => {
    const id = useId();

    return (
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        ref={ref}
        {...props}
        className="outline-none w-full font-light bg-transparent  text-lg focus:text-xl p-2 border-b-2 border-primary-50"
      />
    );
  },
);
FormInput.displayName = "FormInput"; // Set displayName

export const NumberedInputWrapper = ({
  number,
  label,
  value,
  error,
  children,
  isLast,
}: {
  number: number;
  label: string;
  value?: string;
  error?: string;
  children: ReactNode;
  isLast?: boolean;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className={twMerge(
            `w-8 h-8 flex justify-center items-center text-md font-semibold rounded-full p-1 bg-gray-400 text-white ${error && "bg-red-500"} ${value && !error && "bg-primary"}  `,
          )}
        >
          {number}
        </div>
        <p className="font-semibold text-lg ">{label}</p>
      </div>
      <div
        className={`${!isLast && "border-l-2 border-gray-400"} ${error && "border-red-500"} ${value && !error && "border-primary-800"}  ml-[15px] my-2 px-5`}
      >
        <div className="bg-white rounded-2xl border p-5">
          {children}
          {error && (
            <p className="text-red-400 font-medium text-sm mt-2">
              Error as;kdjf ;laskd;jf
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
