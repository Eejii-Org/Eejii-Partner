"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";
import { AuthContext, useAuth } from "@/providers/auth-provider";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Loader } from "./loader";
import { Close } from "./icons/close";
import { Menu } from "./icons/menu";
import { GlobeIcon } from "./icons/globe";
import { LogOutIcon } from "./icons/log-out";
import { PersonIcon } from "./icons/person";
import { CaretDown } from "./icons/caret-down";

const links = [
  {
    link: "/",
    label: "Нүүр",
  },
  {
    link: "/projects",
    label: "Хандивын төслүүд",
  },
  { link: "/events", label: "Арга хэмжээ" },
  {
    link: "/volunteering-events",
    label: "Сайн дурын арга хэмжээ",
  },
  { link: "/donations", label: "Миний хандив" },
  { link: "/media", label: "Мэдээ" },
  { link: "/settings", label: "Тохиргоо" },
  { link: "eejii.org", label: "Eejii.org" },
  { link: "logout", label: "Сайтаас гарах" },
];

export const Header = () => {
  const router = useRouter();
  const { user, userLoading, logout } = useAuth();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);

  if (userLoading) {
    return <Loader />;
  }
  if (!user) {
    router.push("/auth");
    return <div></div>;
  }

  return (
    <header className="bg-white fixed w-full z-30 shadow-sm">
      <div className="mx-auto px-10 flex flex-row justify-between py-[12px] items-center">
        <Link href="/">
          <div className="relative w-[160px] h-[42px]">
            <Image
              src="/assets/logo.png"
              alt="foundation Logo"
              fill
              objectFit="cover"
            />
          </div>
        </Link>
        {/* MOBILE NAV */}
        <button
          onClick={() => setIsNavOpened((prevState) => !prevState)}
          className="md:hidden transition-all"
        >
          {isNavOpened ? <Close /> : <Menu />}
        </button>
        <div className="md:hidden absolute max-md:shadow-md right-0 top-[65px] w-full md:w-auto md:static">
          <div
            className={`bg-white flex-col gap-2 md:rounded border z-10 ${
              isNavOpened ? "flex" : "hidden"
            } md:flex md:flex-row md:static md:border-none md:w-auto`}
          >
            {links.map((link, index) => {
              if (link.link === "eejii.org") {
                return (
                  <NavLink
                    href={"https://eejii.vercel.app"}
                    key={index}
                    icon={<GlobeIcon color="#3c888d" />}
                    className="flex justify-start gap-2"
                  >
                    {link.label}
                  </NavLink>
                );
              }
              if (link.link === "logout") {
                return (
                  <NavLink
                    href={""}
                    key={index}
                    icon={<LogOutIcon color="#f87171" />}
                    className="text-red-500 flex justify-start gap-2"
                    onClick={() => {
                      logout()?.then(() => router.push("/auth/sign-in"));
                    }}
                  >
                    {link.label}
                  </NavLink>
                );
              }
              return (
                <NavLink href={link.link} key={index}>
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
        {/* DROPDOWN */}
        <button
          onClick={() => setIsDropdownOpened((prevState) => !prevState)}
          className="hidden md:flex transition all duration-500 ease-out pl-6 pr-4 py-3 text-base md:hover:bg-black/5 rounded-xl  relative flex-col gap-1 text-left"
        >
          <div className="flex flex-row gap-2 items-center">
            <PersonIcon width={25} height={25} />
            {user?.username}
            <div
              className={`inline transition-all ${
                isDropdownOpened && "rotate-180"
              }`}
            >
              <CaretDown />
            </div>
          </div>
          <div
            className={`md:absolute bottom-0 p-2 md:-bottom-3 md:left-1/2 md:translate-y-full transition-all duration-500 ease-out w-full md:w-[200px] md:-translate-x-1/2 rounded-lg border-none z-10 md:shadow md:bg-white ${
              isDropdownOpened ? "" : "hidden"
            } md:border`}
          >
            <NavLink
              href={"/profile"}
              className="font-light"
              icon={<PersonIcon width={24} height={24} />}
            >
              Профайл
            </NavLink>
            <NavLink
              href={"https://eejii.vercel.app"}
              className="font-light"
              icon={<GlobeIcon color="#3c888d" />}
            >
              Eejii.org
            </NavLink>
            <hr className="my-2 mx-1 border-blue-gray-50" role="menuitem" />
            <NavLink
              href={"/"}
              className="font-light text-red-400"
              icon={<LogOutIcon color="#f87171" />}
              onClick={() => {
                logout()?.then(() => router.push("/auth/sign-in"));
              }}
            >
              Сайтаас гарах
            </NavLink>
          </div>
        </button>
      </div>
    </header>
  );
};

type NavLinkType = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const NavLink = ({ children, href, icon, className, onClick }: NavLinkType) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={twMerge(
        "p-3 text-base font-semibold md:hover:bg-black/5 rounded-xl transition-all flex flex-row justify-between",
        className,
      )}
    >
      {icon && icon}

      {children}
    </Link>
  );
};
