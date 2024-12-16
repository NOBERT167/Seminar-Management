"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import {
  Home,
  LayoutDashboardIcon,
  Building2,
  User,
  Menu,
  X,
  MapPinHouse,
  SquareLibrary,
} from "lucide-react";
import Link from "next/link";
import { SidebarButtonSheet as SidebarButton } from "./SidebarButton";
import { usePathname } from "next/navigation";

const SidebarMobile = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { href: "/seminars", label: "Seminar", icon: Building2 },
    { href: "/rooms", label: "Room", icon: MapPinHouse },
    {
      href: "/seminarregistration",
      label: "Registrations",
      icon: SquareLibrary,
    },
    { href: "/account", label: "Account", icon: User },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed z-50 flex justify-start top-0 py-5 pl-5 left-0 w-full rounded-none bg-white dark:bg-slate-700"
          size="icon"
          variant="ghost"
        >
          <Menu size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" hideClose className="px-3 py-4">
        <SheetHeader>
          <div className="flex justify-end mb-4">
            <ModeToggle />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="mx-3 text-2xl flex font-semibold text-foreground font-roboto">
              Seminar<span className="text-primary">Hub.</span>
            </h3>
            <SheetClose asChild>
              <Button className="h-7 w-7 p-0" variant="ghost">
                <X size={15} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
