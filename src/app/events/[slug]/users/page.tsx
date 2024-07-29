import { EventUserComp } from "@/components/pages/event-user";

const EventUsers = ({ params }: { params: { slug: string } }) => {
  return <EventUserComp slug={params.slug} />;
};

export default EventUsers;
