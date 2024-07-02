import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';
import { getUserIdByClerkId } from '@/app/dashboard/studies/lib/actions';

export default async function acceptNoteHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { noteId } = req.body;

  try {
    const userId = await getUserIdByClerkId();
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found' });
    }

    const acceptedNote = {
      accepted: true,
      acceptedById: userId,
      accepted_at: new Date(),
    };

    const note = await prisma.note.findUnique({
      where: { id: Number(noteId) }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await prisma.note.update({
      where: { id: Number(noteId) },
      data: acceptedNote,
    });

    res.status(200).json({ message: 'Note accepted successfully' });
  } catch (error) {
    console.error('Error accepting note:', error);
    res.status(500).json({ error: 'Failed to accept note' });
  }
}
