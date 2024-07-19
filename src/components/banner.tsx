"use client";
import { ReactNode } from "react";
import { BrainstormIllustration } from "./icons";

export const Banner = ({
  label,
  button,
}: {
  label: string;
  button?: ReactNode;
}) => {
  return (
    <div className="flex justify-center relative p-5 bg-primary-100 rounded-xl">
      <div className="">
        <BrainstormIllustration />
      </div>
      <div className="absolute top-0 left-0 w-full flex flex-col justify-center gap-5 md:gap-0 md:flex-row md:justify-between p-5">
        <h1 className="flex font-semibold text-2xl items-center justify-center">
          {label}
        </h1>
        <div className="flex justify-center">{button}</div>
      </div>
    </div>
  );
};
