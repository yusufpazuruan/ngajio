import Notes from "@/lib/data/dashboard/page";
import { getNotes } from "@/app/dashboard/lib/data";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">List Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and accept a new notes
          </p>
        </div>
      </div>

      <Notes notes={notes} />
    </div>
  );
}
