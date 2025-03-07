"use client";
import React from "react";
import SidebarButton from "./SidebarButton";
import {
  Home,
  LayoutDashboardIcon,
  Building2,
  User,
  MapPinHouse,
  SquareLibrary,
  Icon,
  SquarePen,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "../context/authcontext";
import { Button } from "@/components/ui/button";

const SidebarDesktop = () => {
  const pathname = usePathname();
  const { role, logout } = useAuth();

  const navItems =
    role === "admin"
      ? [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
          { href: "/seminars", label: "Seminar", icon: Building2 },
          { href: "/rooms", label: "Room", icon: MapPinHouse },
          {
            href: "/seminarregistration",
            label: "Registrations",
            icon: SquareLibrary,
          },
          { href: "/instructors", label: "Instructors", icon: Users },
        ]
      : role === "user"
      ? [
          { href: "/register", label: "Register", icon: SquarePen },
          {
            href: "/my-registrations",
            label: "My Registrations",
            icon: SquareLibrary,
          },
          { href: "/account", label: "Account", icon: User },
        ]
      : [];

  return (
    <aside className="w-[270px] bg-white dark:bg-gray-800/50 max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <div className="flex justify-between">
          <h3 className="mx-3 text-2xl flex font-semibold text-foreground font-roboto">
            Seminar
            <span className="text-primary">Hub</span>
          </h3>
          <ModeToggle />
        </div>

        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <SidebarButton
                  className="w-full font-montserrat font-semibold"
                  icon={item.icon}
                  active={pathname === item.href}
                >
                  {item.label}
                </SidebarButton>
              </Link>
            ))}
            {role && (
              <Button
                variant="destructive"
                onClick={logout}
                className="font-inter hover:bg-red-700"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDesktop;
