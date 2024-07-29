import { EventDetailComp } from "@/components/pages/event-detail";

const EventDetail = async ({ params }: { params: { slug: string } }) => {
  return <EventDetailComp slug={params.slug} />;
};
export default EventDetail;
