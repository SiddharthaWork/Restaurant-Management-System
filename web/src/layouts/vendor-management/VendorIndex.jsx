import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import Heading from "../../components/Heading";
import DynamicTab from "../../components/DynamicTab";
import Navbar from "../../components/Navbar";
import VendorList from "./components/VendorList";
import PurchaseHistory from "./components/PurchaseHistory";
import FinancialStatement from "./components/FinancialStatement";
import { vendorTabsOption } from "./components/vendorTabsOption";

const VendorIndex = () => {
  const [value, setValue] = useState("vendor-list");

  const handleTabChange = useCallback((state) => {
    setValue(state);
  }, []);

  return (
    <Box>
      <Heading text="Vendor-List" />
      <DynamicTab
        tabOption={vendorTabsOption}
        value={value}
        handleTabChange={handleTabChange}
      />
      {value === "vendor-list" ? (
        <VendorList />
      ) : value === "purchase-history" ? (
        <PurchaseHistory />
      ) : (
        <FinancialStatement />
      )}
    </Box>
  );
};

export default VendorIndex;
