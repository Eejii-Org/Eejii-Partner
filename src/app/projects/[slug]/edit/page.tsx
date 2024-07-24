import { EditProjectComp } from "@/components";

const EditProject = async ({ params }: { params: { slug: string } }) => {
  return <EditProjectComp slug={params.slug} />;
};

export default EditProject;
