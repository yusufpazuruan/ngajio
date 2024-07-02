"use client";

import { saveStudy } from "@studies/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@studies/components/buttons";

const CreateForm = () => {
  const [state, formAction] = useFormState(saveStudy, null);
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
            placeholder="Name..."
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
            placeholder="Youtube Link..."
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
            placeholder="Materi..."
          />
          <div id="material-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.material}</p>
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
            placeholder="Datetime..."
          />
          <div id="datetime-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.datetime}</p>
          </div>
        </div>
     
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <SubmitButton label="save" />
      </form>
    </div>
  );
};

export default CreateForm;