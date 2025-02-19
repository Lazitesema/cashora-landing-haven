
import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, DollarSign, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Deposit",
    icon: DollarSign,
    href: "/dashboard/deposit",
  },
  {
    title: "Send",
    icon: Send,
    href: "/dashboard/send",
  },
  {
    title: "Withdraw",
    icon: DollarSign,
    href: "/dashboard/withdraw",
  },
];

export function UserLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">User Portal</h2>
            <p className="text-sm text-muted-foreground">
              Welcome, {profile?.first_name}
            </p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => handleNavigate(item.href)}
                    className={cn(
                      "w-full flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md transition-colors",
                      window.location.pathname === item.href &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-4 border-t">
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="border-b">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {menuItems.find((item) => item.href === window.location.pathname)
                  ?.title || "Dashboard"}
              </h1>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
