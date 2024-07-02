import CreateForm from "@studies/components/form/create";

const CreateStudyPage = () => {
  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Add New Study</h1>
      <CreateForm />
    </div>
  );
};

export default CreateStudyPage;