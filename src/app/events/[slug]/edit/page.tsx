import { EditEventComp } from "@/components/pages/event-edit";

const EditEvent = async ({ params }: { params: { slug: string } }) => {
  return <EditEventComp slug={params.slug} />;
};

export default EditEvent;
