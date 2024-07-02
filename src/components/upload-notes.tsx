import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Home } from "lucide-react";
import Link from "next/link";
import { getStudiesForSelect } from "@studies/lib/data";
// import Studies from "@/components/select-studies";
// import Uploader from "@/components/uploader";
import { UploadNotesForm } from "@/components/form/upload";

export default async function UploadNotes(){

const studies = await getStudiesForSelect()
 
  return (
    <div className="flex justify-center max-w-sm mx-auto mt-10">
      <SignedOut>
        <Button size="lg" className="w-1/2">
          <SignInButton>Start Now</SignInButton>
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col items-center justify-between gap-2">
          <Button
            variant="outline"
            className="w-full hover:border-primary hover:bg-primary/10 mb"
            size={"lg"}
          >
            <Link href="/dashboard">
              <div className="flex items-center justify-center">
                <Home className="h-5 w-5 mr-2" />
                <span>Dashboard</span>
              </div>
            </Link>
          </Button>
          <div id="form-upload-notes" className="border border-primary rounded-md hover:shadow-xl mt-2">
            {/* <Studies label="Studies" placeholder="Select a studies" selectName="Studies" studies={studies}/>
            <Uploader/> */}
            {/* <UploadNotesForm studyItems={studies}/> */}
              <UploadNotesForm label="Studies" placeholder="Select a studies" selectName="Studies" studies={studies}/>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

