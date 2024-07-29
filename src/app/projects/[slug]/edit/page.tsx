import { EditProjectComp } from "@/components/pages/project-edit";

const EditProject = async ({ params }: { params: { slug: string } }) => {
  return <EditProjectComp slug={params.slug} />;
};

export default EditProject;
