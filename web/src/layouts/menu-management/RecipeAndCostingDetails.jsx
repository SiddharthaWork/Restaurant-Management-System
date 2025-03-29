import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import biryani from "@/assets/images/image.png";
import { Action } from "@/components/TableAction";
const RecipeAndCostingDetails = () => {
  const { recipeId } = useParams();
  const table = {
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Ingredient Name" },
      { accessorKey: "unit_cost", header: "Unit Cost(Rs)" },
      { accessorKey: "quantity", header: "Quantity" },
      { accessorKey: "total_cost", header: "Total Cost" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: 1,
        name: "Chicken Thighs",
        unit_cost: "304/kg",
        quantity: "150g",
        total_cost: "Rs 90",
        action: <Action />,
      },
    ],
  };
  console.log(recipeId);
  return (
    <Stack spacing={1}>
      <Heading text="Recipe and Costing" />

      <DataTable
        columns={table?.columns}
        data={table?.data}
        csv={true}
        print={true}
        download={true}
        filter={true}
        content={
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              p: 2,
              gap: 2,
              maxWidth: "100%",
              mx: "auto",
              boxShadow: 3,
            }}
          >
            {/* Image Section */}
            <Box
              component="img"
              src={biryani}
              alt="Chicken Biryani"
              sx={{
                width: { xs: "100%", sm: 180 },
                height: { xs: "auto", sm: 150 },
                borderRadius: 2,
                objectFit: "contain",
              }}
            />

            {/* Details Section */}
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold">
                Chicken Biryani
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingredient Id: <strong>EM-098734</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: <strong>Indian</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Selling Price: <strong>Rs 640</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Profit Margin: <strong>40%</strong>
              </Typography>
            </Box>

            <IconButton
              aria-label="edit"
              sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
            >
              <Edit />
            </IconButton>
          </Card>
        }
      />
    </Stack>
  );
};

export default RecipeAndCostingDetails;
