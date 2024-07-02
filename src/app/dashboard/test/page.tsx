"use client";

import React, { useState, useEffect } from "react";

import { CheckCheck } from "lucide-react";
import { getNotes } from "../lib/data";
import { type Note } from "@prisma/client";

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Failed to fetch notes data:", error);
        setError("Failed to fetch notes data");
      }
    };
    fetchNotes();
  }, []);

  const handleAcceptNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const noteId = formData.get("noteId");

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to accept note');
      }

      console.log(result.message);
      // Optionally, refresh notes or update state
    } catch (error) {
      console.error("Error accepting note:", error);
      setError("Failed to accept note");
    }
  };

  return (
    <div>
      <h1>Accept Note</h1>
      <form onSubmit={handleAcceptNote}>
        <input type="hidden" name="noteId" value="2" />
        <button type="submit" className="cursor-pointer">
          <CheckCheck />
        </button>
      </form>

      {error && <div>{error}</div>}

      {notes &&
        notes.length > 0 &&
        notes.map((n, i) => (
          <div key={i}>
            <h2>{n.accepted ? "Accepted" : "Not Accepted"}</h2>
          </div>
        ))}
    </div>
  );
}
