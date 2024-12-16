"use client";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  if (isDesktop) return <SidebarDesktop />;
  return <SidebarMobile />;
};

export default Sidebar;
