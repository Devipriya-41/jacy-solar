"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Frame,
      // REMOVE isActive from Dashboard since it's not a collapsible item
      // Only use isActive for items that have nested children
    },
    {
      title: "Masters",
      url: "#", // Parent items with children should use "#" or empty string
      icon: Settings2,
      isActive: true, // This should expand the Masters section by default
      items: [
        {
          title: "Hero Slides",
          url: "/admin/masters/hero-slides",
        },
        {
          title: "About Section",
          url: "/admin/masters/about",
        },
        {
          title: "Services Section",
          url: "/admin/masters/services",
        },
      ],
    },
    {
      title: "Vendors",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Dashboard",
          url: "/admin/vendors/dashboard",
        },
        {
          title: "Registration",
          url: "/admin/vendors/registration",
        },
        {
          title: "Management",
          url: "/admin/vendors/management",
        },
        {
          title: "Validation",
          url: "/admin/vendors/validation",
        },
        {
          title: "Ad Management",
          url: "/admin/vendors/ad-management",
        },
      ],
    },
    {
      title: "Buyers",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Dashboard",
          url: "/admin/buyers/dashboard",
        },
        {
          title: "Registration",
          url: "/admin/buyers/registration",
        },
        {
          title: "Management",
          url: "/admin/buyers/management",
        },
      ],
    },
    {
      title: "Recruitment Agencies",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Dashboard",
          url: "/admin/recruitment-agencies/dashboard",
        },
        {
          title: "Registration",
          url: "/admin/recruitment-agencies/registration",
        },
        {
          title: "Management",
          url: "/admin/recruitment-agencies/management",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
