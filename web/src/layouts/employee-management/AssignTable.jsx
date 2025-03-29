import FilterationBar from "@/components/FilterationBar";
import Heading from "@/components/Heading";
import { Avatar, Card, CardContent, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const AssignTable = () => {
  const employees = {
    "FRONT OF HOUSE(FOH)": [
      {
        name: "Ashley Brown",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Javier Holloway",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Stephen Harris",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Richard Walters",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Michael Simon",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Melissa Bradley",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Victoria Griffin",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
    ],
    "KITCHEN STAFF": [
      {
        name: "Derek Larson",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Maria Botosh",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Kaiya Press",
        phone: "+977 9876540980",
        avatar: "/api/placeholder/40/40",
      },
    ],
  };

  return (
    <>
      <Heading text="Assign Table" />
      <FilterationBar datePicker={false} addBtn={false} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4">
        <Card className="w-full col-span-4 bg-white ">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h6" className="text-lg font-semibold">
                All Employee Name List
              </Typography>
              <Typography className="text-gray-500">96</Typography>
            </div>
            <List className="w-full">
              {Object.entries(employees).map(
                ([department, staffList], deptIndex) => (
                  <div key={department}>
                    <p className="text-teal-500 bg-[#EFEFEF] font-semibold  px-4 py-2">
                      {department}
                    </p>

                    {staffList.map((employee) => (
                      <ListItem
                        key={employee.name}
                        className="px-4 py-2 hover:bg-gray-50"
                      >
                        <Checkbox className="mr-2" />
                        <ListItemAvatar>
                          <Avatar
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-10 h-10"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography className="font-medium">
                              {employee.name}
                            </Typography>
                          }
                          secondary={
                            <Typography className="text-sm text-gray-500">
                              {employee.phone}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {deptIndex < Object.keys(employees).length - 1 && (
                      <Divider className="my-2" />
                    )}
                  </div>
                )
              )}
            </List>
            {/* </div> */}
          </CardContent>
        </Card>
        <Card className="col-span-8">


        </Card>
      </div>
    </>
  );
};

export default AssignTable;
