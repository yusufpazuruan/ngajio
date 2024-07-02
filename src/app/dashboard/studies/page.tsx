import StudiesTable from "@studies/components/table";
import Search from "@studies/components/search";
import Pagination from "@studies/components/pagination";
import { CreateButton } from "@studies/components/buttons";
import { getStudyPages } from "@studies/lib/data";
import { Suspense } from "react";
import { TableSkeleton } from "@studies/components/skeleton";

export default async function Studies ({ searchParams,}: {  searchParams?: {query?: string; page?: string; };})  {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getStudyPages(query);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <StudiesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

