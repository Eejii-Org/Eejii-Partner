"use client";
import { excludeKeys } from "@/utils";
import React from "react";
import { ButtonHTMLAttributes } from "react";

interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  variant?: "outline" | "default";
}

export const Button = (props: ButtonPropsType) => {
  const buttonAttributes = excludeKeys(props, ["className"]);
  const styledIcon = props.icon
    ? React.cloneElement(props?.icon as React.ReactElement, {
        color: props.variant === "outline" ? "#3c888d" : "white",
      })
    : null;

  const variantClassName =
    props.variant && props.variant === "outline"
      ? "bg-none border border-primary border-2 text-primary hover:bg-[#3c888d33]"
      : "bg-primary hover:bg-[#8AB8BB] text-white";

  return (
    <button
      className={`${variantClassName} flex items-center gap-2 px-3 py-1 rounded-full tracking-wider  transition-all ${
        props.className ? props.className : ""
      }`}
      {...buttonAttributes}
    >
      {props.icon && styledIcon}
      {props.children}
    </button>
  );
};
