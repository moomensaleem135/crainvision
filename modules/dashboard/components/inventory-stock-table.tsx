import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const inventoryData = [
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
  {
    make: "Honda",
    model: "Civic",
    inStock: 45,
    allocated: 12,
    inTransit: 8,
    totalValue: "$1046K",
    avgDays: 32,
  },
];

export function InventoryStockTable() {
  return (
    <Card className="col-span-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-600">
          Current Inventory Stock
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Inventory levels by make, model, and status
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-brand">
              <tr>
                <th className="text-white font-medium py-3 px-4 text-left first:rounded-tl-lg whitespace-nowrap">
                  Make
                </th>
                <th className="text-white font-medium py-3 px-4 text-left whitespace-nowrap">
                  Model
                </th>
                <th className="text-white font-medium py-3 px-4 text-center whitespace-nowrap">
                  In Stock
                </th>
                <th className="text-white font-medium py-3 px-4 text-center whitespace-nowrap">
                  Allocated
                </th>
                <th className="text-white font-medium py-3 px-4 text-center whitespace-nowrap">
                  In Transit
                </th>
                <th className="text-white font-medium py-3 px-4 text-center whitespace-nowrap">
                  Total Value
                </th>
                <th className="text-white font-medium py-3 px-4 text-center last:rounded-tr-lg whitespace-nowrap">
                  Avg Days
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 1 ? "bg-brand-muted" : "bg-background"
                  }
                >
                  <td className="py-3 px-4 border-t border-border">
                    {item.make}
                  </td>
                  <td className="py-3 px-4 border-t border-border">
                    {item.model}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center">
                    {item.inStock}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center">
                    {item.allocated}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center">
                    {item.inTransit}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center font-medium">
                    {item.totalValue}
                  </td>
                  <td className="py-3 px-4 border-t border-border text-center">
                    {item.avgDays}
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
