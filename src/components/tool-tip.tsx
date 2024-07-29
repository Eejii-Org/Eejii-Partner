import { WarningCircleIcon } from "./icons/warning-circle";

export const ToolTip = ({ text }: { text: string }) => {
  return (
    <div className="group">
      <WarningCircleIcon />
      <span className="absolute z-50 hidden p-2 -mt-16 -ml-6 text-center text-sm text-gray-800 bg-gray-200 rounded tooltip-text group-hover:block">
        {text}
      </span>
    </div>
  );
};
