import type * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  height: number;
  width: number;
}

export function DashboardCard({
  title,
  description,
  icon,
  height,
  width,
}: DashboardCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-sm border">
      <CardHeader className="flex flex-col items-center justify-center pb-2 pt-6 space-y-2">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full`}
        >
          <Image src={icon} alt="" height={height} width={width} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="text-center pb-6">
        <p className="text-sm font-light text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
