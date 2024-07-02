import UpdateForm from "@studies/components/form/edit";
import { getStudyById } from "@studies/lib/data";
import { notFound } from "next/navigation";

const UpdateStudyPage = async ({ params }: { params: { id: string } }) => {
  const id = `${params.id}`;
  const study = await getStudyById(id);

  if (!study) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Study</h1>
      <UpdateForm study={study} />
    </div>
  );
};

export default UpdateStudyPage;