import { EditEventComp } from "@/components";

const EditEvent = async ({ params }: { params: { slug: string } }) => {
  return <EditEventComp slug={params.slug} />;
};

export default EditEvent;
