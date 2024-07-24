import { ProjectDetailComp } from "@/components/pages/project-detail";

const ProjectDetail = async ({ params }: { params: { slug: string } }) => {
  return <ProjectDetailComp slug={params.slug} />;
};
export default ProjectDetail;
