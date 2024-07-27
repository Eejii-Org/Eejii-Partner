"use client";

import { ReactNode, useState } from "react";
import { IconButton } from "./icon-button";
import { BookOpenIcon, Close } from "./icons";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";

export const Modal = ({
  className,
  headerLabel,
  triggerLabel,
  triggerClassName,
  triggerIcon,
  triggerVariant,
  children,
}: {
  className: string;
  headerLabel: string;
  triggerLabel: string;
  triggerClassName: string;
  triggerIcon: ReactNode;
  triggerVariant?: "outline" | "default";
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        component="button"
        icon={triggerIcon}
        onClick={() => setOpen(true)}
        variant={triggerVariant}
        className={triggerClassName}
      >
        {triggerLabel}
      </Button>
      <div
        className={`fixed top-1/2 left-1/2 ${
          open ? "fixed flex justify-center" : "hidden"
        } z-50 -translate-x-1/2 -translate-y-3/4`}
      >
        <div
          className={twMerge(
            `flex flex-col rounded-2xl bg-white overflow-hidden min-w-[400px] min-h-[300px]`,
            className,
          )}
        >
          <div className="px-3 py-2 border-b flex justify-between items-center">
            <p className="text-xl">{headerLabel}</p>
            <IconButton
              component="button"
              variant="outline"
              icon={<Close />}
              onClick={() => setOpen(false)}
              className="border-none p-1"
            />
          </div>
          <div className="flex-1 p-3">{children}</div>
        </div>
      </div>
      <div
        className={`z-40 w-screen h-screen fixed top-0 left-0 ${
          open ? "fixed flex" : "hidden"
        } bg-black/40 backdrop-blur-sm items-center justify-center`}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
};
