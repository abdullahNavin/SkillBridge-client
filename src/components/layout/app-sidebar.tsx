"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { RouteType, studentRoutes } from "@/routes/studentRoutes"
import { UserRole } from "@/constant/userRole"
import { tutorRoutes } from "@/routes/tutorRoutes"
import { adminRoutes } from "@/routes/adminRoutes"
import { usePathname } from "next/navigation"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let routes: RouteType[] = []

  switch (props.role) {
    case UserRole.student:
      routes = studentRoutes
      break;
    case UserRole.tutor:
      routes = tutorRoutes
      break;
    case UserRole.admin:
      routes = adminRoutes
      break;

    default:
      routes = []
      break;
  }

  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex gap-1.5 px-2">
          <Image
            src={'/logo2.png'}
            alt="logo"
            height={30}
            width={30}
          />
          <h1>SkillBridge</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
