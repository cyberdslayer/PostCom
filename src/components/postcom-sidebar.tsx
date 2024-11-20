'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Plus } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Home, label: "Home", href: "/create-post" },
  // { icon: Search, label: "Explore", href: "/explore" },
  // { icon: Bell, label: "Notifications", href: "/notifications" },
  // { icon: Mail, label: "Messages", href: "/messages" },
  // { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  // { icon: Users, label: "Communities", href: "/communities" },
  { icon: User, label: "Profile", href: "/profile" },
  // { icon: Settings, label: "Settings", href: "/settings" },
]

export function PostcomSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h1 className="text-xl font-bold">Postcom</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="w-full"
              >
                <Link href={item.href} className="flex items-center gap-4 px-4 py-2">
                  <item.icon className="h-5 w-5" />
                  <span>{isMobile ? "" : item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="px-4 mt-4">
          <Button className="w-full" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            {isMobile ? "" : "Create Post"}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}