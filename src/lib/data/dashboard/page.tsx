"use client";

/* eslint-disable react/no-unescaped-entities */
import { TrashDelete } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, Edit, File, X } from "lucide-react";
import Link from "next/link";
import { Note } from "@prisma/client";
import PhotoGrid from "@/components/photo-grid";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteNote } from "@/lib/actions/dashboard/page";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { acceptNote } from "@/lib/actions/notes/page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@radix-ui/react-switch";

interface NotesProps {
  notes: Note[];
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {notes?.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <File className="w-10 h-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              You don't have any notes created
            </h2>
            <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
              You currently don't have any notes. Please create some so that you
              can see them right here.
            </p>

            <Button asChild>
              <Link href="/dashboard/new">Upload a new Note</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            <Table>
              <TableCaption>A list of your notes.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Note photos</TableHead>
                  <TableHead>Study Name</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Accepted</TableHead>
                  <TableHead>Accepted By</TableHead>
                  <TableHead>Accepted At</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes?.map((note: Note, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {note.images.length > 0 && (
                        <PhotoGrid images={note.images} />
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold underline">
                        {note.study?.name}
                      </span>
                      {" | "}
                      {note.study?.material}
                    </TableCell>

                    <TableCell>{note.author?.fullname}</TableCell>
                    <TableCell>
                      {pathname === "/dashboard/notes" ? (
                        <div>
                          {/* <Switch onChange={(e)=> e.target.value}/> */}
                        </div>
                      ) : (
                        <div>
                          {note.accepted ? (
                            <Badge className="w-full bg-primary/30 text-primary flex items-center justify-center">
                              <CheckCheckIcon className="h-5 w-5" />
                            </Badge>
                          ) : (
                            <Badge
                              className="w-full bg-destructive/30 text-destructive flex items-center justify-center"
                              variant="destructive"
                            >
                              <X className="h-5 w-5" />
                            </Badge>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {note.accepted_by?.fullname === ""
                        ? "-"
                        : note.accepted_by?.fullname}
                    </TableCell>
                    <TableCell>
                      {note.accepted &&
                        note.accepted_at &&
                        new Intl.DateTimeFormat("id-ID", {
                          dateStyle: "full",
                          timeStyle: "short",
                        }).format(new Date(note.accepted_at))}{" "}
                      {note.accepted_at ? " WIB" : "-"}
                    </TableCell>
                    <TableCell>
                      {note.comments === "" ? "-" : note.comments}
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("id-ID", {
                        dateStyle: "full",
                        timeStyle: "short",
                      }).format(new Date(note.createdAt))}
                      {" WIB"}
                    </TableCell>
                    <TableCell className="text-right flex gap-2">
                      <Link href={`/dashboard/new/${note.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form onSubmit={() => deleteNote}>
                        <input type="hidden" name="noteId" value={note.id} />
                        <TrashDelete />
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Notes;
