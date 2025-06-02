import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const appointmentsData = [
  {
    time: "8:00 AM",
    customer: "Jane Smith",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "In Progress",
  },
  {
    time: "8:00 AM",
    customer: "John Anderson",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "Waiting",
  },
  {
    time: "8:00 AM",
    customer: "John Anderson",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "Completed",
  },
  {
    time: "9:00 AM",
    customer: "John Anderson",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "Completed",
  },
  {
    time: "9:00 AM",
    customer: "John Anderson",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "In Progress",
  },
  {
    time: "9:00 AM",
    customer: "John Anderson",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "Scheduled",
  },
  {
    time: "10:00 AM",
    customer: "John Anderson",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    technician: "Mike R.",
    estTime: "30 min",
    status: "In Progress",
  },
];

export function ServiceAppointmentsTable() {
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-brand">
          Today's Service Appointments
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Scheduled appointments and their current status
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-brand">
              <tr>
                <th className="text-white font-medium py-3 px-4 text-left first:rounded-tl-lg whitespace-nowrap">
                  Time
                </th>
                <th className="text-white font-medium py-3 px-4 text-left whitespace-nowrap">
                  Customer
                </th>
                <th className="text-white font-medium py-3 px-4 text-left whitespace-nowrap">
                  Vehicle
                </th>
                <th className="text-white font-medium py-3 px-4 text-left whitespace-nowrap">
                  Service
                </th>
                <th className="text-white font-medium py-3 px-4 text-left whitespace-nowrap">
                  Technician
                </th>
                <th className="text-white font-medium py-3 px-4 text-center whitespace-nowrap">
                  Est. Time
                </th>
                <th className="text-white font-medium py-3 px-4 text-center last:rounded-tr-lg whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 1 ? "bg-brand-muted" : "bg-background"
                  }
                >
                  <td className="py-3 px-4 border-t border-border">
                    {item.time}
                  </td>
                  <td className="py-3 px-4 border-t border-border">
                    {item.customer}
                  </td>
                  <td className="py-3 px-4 border-t border-border">
                    {item.vehicle}
                  </td>
                  <td className="py-3 px-4 border-t border-border">
                    {item.service}
                  </td>
                  <td className="py-3 px-4 border-t border-border">
                    {item.technician}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center">
                    {item.estTime}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center">
                    <span className={`px-2 py-1 rounded-full text-xs `}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
