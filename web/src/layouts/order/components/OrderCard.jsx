/* eslint-disable react/prop-types */
import { Box, Card, CardContent } from "@mui/material";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { memo } from "react";

const OrderCard = memo(
  ({
    ticketNumber,
    customerName,
    orderNumber,
    time,
    date,
    itemCount,
    total,
    status,
  }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "ready":
          return "text-blue-500";
        case "in-progress":
          return "text-yellow-500";
        case "served":
          return "text-green-500";
        case "not-touched":
          return "text-gray-500";
        case "complaint":
          return "text-red-500";
        default:
          return "text-gray-500";
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case "ready":
        case "served":
          return <CheckCircle2 className="w-4 h-4" />;
        case "in-progress":
        case "not-touched":
          return <Clock className="w-4 h-4" />;
        case "complaint":
          return <AlertCircle className="w-4 h-4" />;
        default:
          return null;
      }
    };

    const getStatusText = (status) => {
      return status
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    console.log("changing changing changing");
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Box
                p={2}
                variant="secondary"
                className="text-pink-500 bg-pink-200 hover:bg-pink-50"
              >
                {ticketNumber}
              </Box>
              <div>
                <h3 className="font-medium">{customerName}</h3>
                <p className="text-sm text-muted-foreground">{orderNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center text-sm gap-1 ${getStatusColor(status)}`}
              >
                {getStatusIcon(status)}
                {getStatusText(status)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Dine-in</span>
              <span className="mx-2">•</span>
              <span>{time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{date}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Total</span>
                <p className="font-medium">Rs. {total}</p>
              </div>
              <div className="text-sm text-right">
                <span className="text-muted-foreground">Items</span>
                <p className="font-medium">{itemCount} items</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

OrderCard.displayName = "OrderCard";
export default OrderCard;
