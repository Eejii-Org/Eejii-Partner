import { ProjectUserComp } from "@/components/pages/project-user";

const ProjectUsers = ({ params }: { params: { slug: string } }) => {
  return <ProjectUserComp slug={params.slug} />;
};

export default ProjectUsers;
