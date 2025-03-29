/* eslint-disable react/prop-types */
import { memo } from "react";
import { Tab, Tabs } from "@mui/material";

const DynamicTab = memo(({ tabOption, value, handleTabChange }) => {
  return (
    <Tabs
      value={value}
      sx={{
        "& .Mui-selected": {
          color: "#50b5b7",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#50b5b7",
        },
      }}
      onChange={(_, newValue) => handleTabChange(newValue)}
      aria-label="dynamic tabs"
    >
      {tabOption?.map((item, index) => (
        <Tab
          iconPosition="start"
          label={item?.label}
          key={index}
          value={item?.value || index}
          icon={item?.icon}
        />
      ))}
    </Tabs>
  );
});
DynamicTab.displayName = "DynamicTab";

export default DynamicTab;
