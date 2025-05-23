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
 
      <PreferencesForm comeFrom={comeFrom} title={title} description={description}/>
  );
};

export default PreferencesContainer;
