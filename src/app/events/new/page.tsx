import { NewEventComp } from "@/components/pages/event-new";
import { Suspense } from "react";

const NewEvent = () => {
  return (
    <Suspense>
      <NewEventComp />
    </Suspense>
  );
};

export default NewEvent;
