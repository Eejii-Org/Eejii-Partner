import { EventDetailComp } from "@/components";

const EventDetail = async ({ params }: { params: { slug: string } }) => {
  return <EventDetailComp slug={params.slug} />;
};
export default EventDetail;
