import UploadNotes from "@/components/upload-notes";
import { unstable_noStore as noStore } from "next/cache";

export default function HomePage() {
  noStore()
  return (
    <section className="flex items-center justify-center bg-background">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Sort your Study notes easily
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Effortlessly Organize Your Study Notes
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
              Simplify your academic life with our intuitive note sorting
              feature. Whether you are studying for exams, conducting research,
              or organizing class materials, our platform makes it easy to
              categorize and access your notes whenever you need them.
            </p>
          </div>
            <UploadNotes/>
        </div>
      </div>
    </section>
  );
}
