"use client";

import { updateStudy } from "@studies/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@studies/components/buttons";
import type { Study } from "@prisma/client";

const UpdateForm = ({ study }: { study: Study }) => {

  const UpdateStudyWithId = updateStudy.bind(null, study.id);
  const [state, formAction] = useFormState(UpdateStudyWithId, null);

    // Fungsi untuk mengubah Date menjadi string format yang sesuai untuk input datetime-local
    const formatDateForInput = (date:any) => {
      const pad = (n: any) => n < 10 ? '0' + n : n;
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
  
    // Pastikan study.datetime adalah Date atau string yang dapat diubah menjadi Date
    const formattedDatetime = study?.datetime ? formatDateForInput(new Date(study.datetime)) : '';

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            
            defaultValue={study.name}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-900"
          >
            Youtube
          </label>
          <input
            type="text"
            name="link"
            id="link"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            
            defaultValue={study.link}
          />
          <div id="link-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.link}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="material"
            className="block text-sm font-medium text-gray-900"
          >
            Materi
          </label>
          <input
            type="text"
            name="material"
            id="material"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={study.material}
          />
          <div id="material-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.material}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="datetime"
            className="block text-sm font-medium text-gray-900"
          >
            Datetime
          </label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
           
            defaultValue={formattedDatetime}
          />
          <div id="datetime-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.datetime}
            </p>
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <SubmitButton label="update" />
      </form>
    </div>
  );
};

export default UpdateForm;
