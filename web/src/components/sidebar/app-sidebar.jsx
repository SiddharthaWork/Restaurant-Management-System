import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined,
  FileText,
  House,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
const data = {
  user: {
    name: "WebStudio",
    email: "web@example.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Web Corp",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Web Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Web Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,

      isActive: true,
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    {
      title: "Manage Order",
      url: "#",
      collapse: true,
      icon: FileText,
      items: [
        {
          title: "POS",
          url: "/dashboard/manage-order/pos",
        },
        {
          title: "Order Details",
          url: "/dashboard/manage-order/order-details",
        },
      ],
    },
    {
      title: "Table Reservation",
      url: "/dashboard/table-reservation",
      icon: TableBarIcon,
    },
    {
      title: "Menu Management",
      url: "#",
      icon: RestaurantMenuIcon,
      collapse: true,
      items: [
        {
          title: "Menu",
          url: "/dashboard/menu-management/menu",
        },
        {
          title: "Recipe and Costing",
          url: "/dashboard/menu-management/recipe",
        },
      ],
    },
    {
      title: "Inventory Management",
      collapse: true,
      url: "#",
      icon: ShoppingCartIcon,
      items: [
        {
          title: "Purchase Management",
          url: "/dashboard/inventory-management/purchase-management",
        },
        {
          title: "Vendor Management",
          url: "/dashboard/inventory-management/vendor-management",
        },
        {
          title: "Stock Level Tracking",
          url: "/dashboard/inventory-management/stock-level-tracking",
        },
        {
          title: "Production Rate",
          url: "/dashboard/inventory-management/production-rate",
        },
      ],
    },
    {
      title: "Delivery Management",
      url: "/dashboard/delivery-management",
      icon: LocalShippingIcon,
    },
    {
      title: "Finanace and Sales",
      url: "#",
      collapse: true,
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "Sales",
          url: "/dashboard/finance-sales/sales",
        },
        {
          title: "Expense Management",
          url: "/dashboard/finance-sales/expense-management",
        },
        {
          title: "Cash Flow",
          url: "/dashboard/finance-sales/cash-flow",
        },
        {
          title: "Profit and Loss",
          url: "/dashboard/finance-sales/profit-loss",
        },
      ],
    },
    {
      title: "Employee Management",
      url: "#",
      collapse: true,
      icon: Settings2,
      items: [
        {
          title: "Attendance",
          url: "/dashboard/employee-management/attendance",
        },
        {
          title: "Assign Table",
          url: "/dashboard/employee-management/assign-table",
        },
        {
          title: "Employee Scheduling",
          url: "/dashboard/employee-management/employee-scheduling",
        },
        {
          title: "Employee Details",
          url: "/dashboard/employee-management/employee-details",
        },
      ],
    },
    {
      title: "Waste Management",
      url: "/dashboard/waste-management",
      icon: Settings2,
    },
    {
      title: "Report",
      collapse: true,
      url: "#",
      icon: ChartNoAxesColumnIncreasing,
      items: [
        {
          title: "Sales ",
          url: "/dashboard/report/sales-report",
        },
        {
          title: "Inventory Report",
          url: "/dashboard/report/inventory-report",
        },
        {
          title: "Purchase Report",
          url: "/dashboard/report/purchase-report",
        },
        {
          title: "Reservation Report",
          url: "/dashboard/reservation-report",
        },
        {
          title: "Order Report",
          url: "/dashboard/report/order-report",
        },
        {
          title: "Menu Report",
          url: "/dashboard/report/menu-report",
        },
        {
          title: "Employee Report",
          url: "/dashboard/report/employee-report",
        },
        {
          title: "Waste Report",
          url: "/dashboard/report/waste-report",
        },
      ],
    },
  ],

  settings: [
    {
      title: "Software Configuration",
      url: "/dashboard/software-configuration",
      collapse: true,
      icon: LayoutDashboard,
      items: [
        {
          title: "Purchase",
          url: "/dashboard/software-configuration/purchase",
        },
        {
          title: "Vendor",
          url: "/dashboard/software-configuration/vendor",
        },
        {
          title: "Reservation",
          url: "/dashboard/software-configuration/reservation",
        },
        {
          title: "Menu",
          url: "/dashboard/software-configuration/menu",
        },
        {
          title: "Finance",
          url: "/dashboard/software-configuration/finance",
        },
        {
          title: "Employee",
          url: "/dashboard/software-configuration/employee",
        },
        {
          title: "Waste",
          url: "/dashboard/software-configuration/waste",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      collapse: true,
      items: [],
    },
    {
      title: "Permission Management",
      url: "/dashboard/permission-management",
      icon: LockIcon,
    },
    {
      title: "Users Management",
      url: "#",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }) {
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} title={"Main"} />
        <NavMain items={data.settings} title="Settings" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
