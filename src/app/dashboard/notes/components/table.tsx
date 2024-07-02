import { getStudies } from "@studies/lib/data";
import { formatDate } from "@studies/lib/utils";
import { EditButton, DeleteButton } from "./buttons";

const StudiesTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const studies = await getStudies(query, currentPage);

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Youtube</th>
          <th className="py-3 px-6">Material</th>
          <th className="py-3 px-6">Datetime</th>
          <th className="py-3 px-6">Created At</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {studies.map((study, index) => (
          <tr key={index} className="bg-white border-b">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6">{study.name}</td>
            <td className="py-3 px-6">{study.link}</td>
            <td className="py-3 px-6">{study.material}</td>
            <td className="py-3 px-6">{formatDate(study.datetime.toString())}</td>
            <td className="py-3 px-6">
              {formatDate(study.createdAt.toString())}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <EditButton id={study.id} />
              <DeleteButton id={study.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudiesTable;