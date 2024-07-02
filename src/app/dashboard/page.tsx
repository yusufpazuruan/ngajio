import { Button } from "@/components/ui/button";;
import Link from "next/link";
import Notes from "@/lib/data/dashboard/page";
import { getNotes } from "./lib/data";

export default async function DashboardPage() {
  const notes = await getNotes();

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/new">Upload a new Note</Link>
        </Button>
      </div>

      <Notes notes={notes}/>
    </div>
  );
}
