import { EventUserComp } from "@/components";

const EventUsers = ({ params }: { params: { slug: string } }) => {
  return <EventUserComp slug={params.slug} />;
};

export default EventUsers;
