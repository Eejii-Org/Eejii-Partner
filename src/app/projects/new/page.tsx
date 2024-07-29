import { NewProjectComp } from "@/components/pages/project-new";
import { Suspense } from "react";

const Fallback = () => {
  return <>Loading</>;
};

const NewProject = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <NewProjectComp />
    </Suspense>
  );
};

export default NewProject;
