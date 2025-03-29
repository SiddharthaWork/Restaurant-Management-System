import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for drag-and-drop
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

const ScheduleCalendar = () => {
  const resources = [
    { id: "1", title: "Ashley Brown" },
    { id: "2", title: "Javier Holloway" },
    { id: "3", title: "Stephen Harris" },
    { id: "4", title: "Richard Walters" },
    { id: "5", title: "Michael Simon" },
    { id: "6", title: "Melissa Bradley" },
    { id: "7", title: "Victoria Griffin" },
    { id: "8", title: "Derek Larson", groupId: "KITCHEN STAFF" },
  ];

  const events = [
    {
      id: "1",
      resourceId: "1",
      start: "2024-04-04T08:00:00",
      end: "2024-04-04T16:00:00",
      title: "Full day",
    },
    {
      id: "2",
      resourceId: "3",
      start: "2024-04-04",
      end: "2024-04-05",
      title: "Vacation",
      color: "red",
    },
    {
      id: "3",
      resourceId: "4",
      start: "2024-04-04T10:00:00",
      end: "2024-04-04T18:00:00",
      title: "Remote",
      color: "orange",
    },
    {
      id: "4",
      resourceId: "5",
      start: "2024-04-13T08:00:00",
      end: "2024-04-13T16:00:00",
      title: "Full day",
    },
    {
      id: "5",
      resourceId: "7",
      start: "2024-04-13T08:00:00",
      end: "2024-04-13T12:00:00",
      title: "Morning",
      color: "blue",
    },
    {
      id: "6",
      resourceId: "8",
      start: "2024-04-13T16:00:00",
      end: "2024-04-13T20:00:00",
      title: "Evening",
      color: "black",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin]}
        initialView="resourceTimelineWeek"
        resources={resources}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
        }}
        editable={true}
        selectable={true}
        resourceAreaHeaderContent="All Employee Name List"
      />
    </div>
  );
};

export default ScheduleCalendar;
