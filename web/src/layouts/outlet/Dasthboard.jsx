import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
const Dasthboard = () => {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="overflow-x-auto">
        <Stack px={2} className="w-full overflow-x-auto">
          <Navbar />
          <Outlet />
        </Stack>
      </SidebarInset>
    </>
  );
};

export default Dasthboard;
