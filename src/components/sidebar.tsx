"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  CategoryIcon,
  CharityIcon,
  EventsIcon,
  FundraisingIcon,
  NewspaperIcon,
  SettingsIcon,
  VolunteeringIcon,
} from "./icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const links = [
  {
    link: "/",
    slug: "/",
    label: "Нүүр",
    icon: <CategoryIcon width={24} height={24} color="#8EA3B7" />,
  },
  {
    link: "/projects?type=fundraising",
    slug: "projects",
    label: "Хандивын төслүүд",
    icon: <FundraisingIcon width={24} height={24} color="#8EA3B7" />,
  },
  {
    link: "/events?type=event",
    slug: "events",
    label: "Арга хэмжээ",
    icon: <EventsIcon width={24} height={24} color="#8EA3B7" />,
  },
  {
    link: "/donations",
    slug: "donations",
    label: "Миний хандив",
    icon: <CharityIcon width={24} height={24} color="#8EA3B7" />,
  },
  {
    link: "/media",
    slug: "media",
    label: "Мэдээ",
    icon: <NewspaperIcon width={24} height={24} color="#8EA3B7" />,
  },
  {
    link: "/settings",
    slug: "settings",
    label: "Тохиргоо",
    icon: <SettingsIcon width={24} height={24} color="#8EA3B7" />,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const explodedPath = pathname.split("/");
  const path = explodedPath[1] === "" ? "/" : explodedPath[1];
  const activeLink = links.find((l) => l.slug === path);
  const [active, _] = useState<string | null | undefined>(activeLink?.slug);

  return (
    <div className="hidden md:flex shadow-md w-[320px]  min-h-[800px]">
      <div className={`bg-white flex flex-col gap-4 p-3 pt-5 w-full`}>
        {links.map((link, index) => {
          return (
            <NavLink
              href={link.link}
              key={index}
              icon={link.icon}
              // onClick={() => setActive(link.link)}
              active={active === link.slug}
            >
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

type NavLinkType = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  active: boolean;
  onClick?: () => void;
};

const NavLink = ({
  children,
  href,
  icon,
  className,
  onClick,
  active,
}: NavLinkType) => {
  const styledIcon = React.cloneElement(icon as React.ReactElement, {
    color: active ? "#194245" : "#8EA3B7",
  });
  return (
    <Link
      onClick={onClick}
      href={href}
      className={twMerge(
        `py-3 px-5 text-base font-medium  rounded-full transition-all flex flex-row gap-3 ${
          active ? "bg-primary-400" : "md:hover:bg-black/5"
        }`,
        className,
      )}
    >
      {icon && styledIcon}
      {children}
    </Link>
  );
};
