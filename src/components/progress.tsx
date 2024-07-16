export const ProgressBar = ({
  percent,
  textColor,
  color,
  bg,
  label,
}: {
  percent: number;
  textColor: string;
  color: string;
  bg: string;
  label?: string;
}) => {
  const widthPercent = Math.ceil((percent * 12) / 100).toString();
  return (
    <div className="w-full">
      <div
        className={`flex items-center ${label ? "justify-between" : "justify-end"}  gap-4 mb-2`}
      >
        {label && (
          <h6
            className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-${textColor}`}
          >
            {label}
          </h6>
        )}
        <h6
          className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-${textColor}`}
        >
          {percent}%
        </h6>
      </div>
      <div
        className={`flex-start flex h-2.5 w-full overflow-hidden rounded-full ${bg} text-xs font-medium`}
      >
        <div
          className={`flex items-center justify-center w-${widthPercent}/12 h-full overflow-hidden break-all ${color} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
