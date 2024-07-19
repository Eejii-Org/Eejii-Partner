"use client";
import { excludeKeys } from "@/utils";
import React from "react";
import { ButtonHTMLAttributes } from "react";

interface IconButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon: React.ReactNode;
  variant?: "outline" | "outline-gray" | "default";
}

export const IconButton = (props: IconButtonPropsType) => {
  const buttonAttributes = excludeKeys(props, ["className"]);
  const styledIcon = props.icon
    ? React.cloneElement(props?.icon as React.ReactElement, {
        color:
          props.variant === "outline"
            ? "#3c888d"
            : props.variant === "outline-gray"
              ? "gray"
              : "white",
      })
    : null;

  const variantClassName =
    props.variant && props.variant === "outline"
      ? "bg-none border border-primary border-2 text-primary hover:bg-[#3c888d33]"
      : props.variant === "outline-gray"
        ? "bg-none border border-gray-400 border-2 text-gray-600 hover:bg-gray-100"
        : "bg-primary hover:bg-[#8AB8BB] text-white";

  return (
    <button
      className={`${variantClassName} flex gap-2 p-3 rounded-full text-lg font-bold tracking-wider  transition-all ${
        props.className ? props.className : ""
      }`}
      {...buttonAttributes}
    >
      {styledIcon}
    </button>
  );
};
