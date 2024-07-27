"use client";
import { excludeKeys } from "@/utils";
import Link from "next/link";
import React from "react";
import { ButtonHTMLAttributes } from "react";

const getColorVariants = (color: string, variant: "outline" | "default") => {
  if (variant === "outline") {
    let className = "";
    switch (color) {
      case "red":
        className = `bg-none border-2 border-red-500 hover:bg-red-200 text-red-700`;
        break;
      case "yellow":
        className = `bg-none border-2 border-${color}-700`;
        break;
      case "gray":
        className = `bg-none border-2 border-${color}-700`;
        break;
      case "primary":
        className = `bg-none border-2 border-primary-800 text-primary hover:bg-[#3c888d33]`;
        break;
    }
    return className;
  } else {
    let className = "";
    switch (color) {
      case "red":
        className = `bg-red-500 hover:bg-red-400 text-white`;
        break;
      case "yellow":
        className = `bg-red-500 hover:bg-red-400 text-white`;
        break;
      case "gray":
        className = `bg-primary-800 hover:bg-primary-700 text-white`;
        break;
      case "primary":
        className = `bg-primary-800 hover:bg-primary text-white`;
        break;
    }
    return className;
  }
};

interface IconButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon: React.ReactNode;
  variant?: "outline" | "default";
  href?: string;
  component: "button" | "link";
}

export const IconButton = (props: IconButtonPropsType) => {
  const buttonAttributes = excludeKeys(props, ["className"]);
  const variantClassName = getColorVariants(
    props.color ?? "primary",
    props.variant ?? "default",
  );

  if (props.component === "link") {
    return (
      <Link
        href={props?.href}
        className={`${variantClassName} flex gap-2 p-2 rounded-full text-lg font-bold tracking-wider transition-all ${
          props.className ? props.className : ""
        }`}
        {...buttonAttributes}
      >
        {props.icon}
      </Link>
    );
  } else {
    return (
      <button
        className={`${variantClassName} flex gap-2 p-2 rounded-full text-lg font-bold tracking-wider  transition-all ${
          props.className ? props.className : ""
        }`}
        {...buttonAttributes}
      >
        {props.icon}
      </button>
    );
  }
};
