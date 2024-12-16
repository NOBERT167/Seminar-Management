"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
  active?: boolean;
}

const SidebarButton = ({
  icon: Icon,
  children,
  className,
  active = false,
  ...props
}: SidebarButtonProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "gap-2 justify-start",
          active && "bg-primary/10 text-primary",
          className
        )}
        {...props}
      >
        {Icon && <Icon size={20} />}
        <span>{children}</span>
      </Button>
    </div>
  );
};

export default SidebarButton;

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
