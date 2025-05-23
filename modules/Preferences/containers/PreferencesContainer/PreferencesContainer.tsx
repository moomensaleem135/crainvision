import React from "react";
import { PreferencesForm } from "../../components/preferences-form";

interface PreferencesContainerProps {
  title: string;
  description: string;
  comeFrom?: string;
}

const PreferencesContainer = ({
  title,
  description,
  comeFrom = "dashboard",
}: PreferencesContainerProps) => {
  return (
    <div>
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#7B57E0]">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <PreferencesForm comeFrom={comeFrom} />
    </div>
  );
};

export default PreferencesContainer;
