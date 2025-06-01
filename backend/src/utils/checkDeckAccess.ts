import { Role } from '@prisma/client';
import { getDeckByIdService } from '../services/deck.service';
import { Deck } from '@prisma/client';

type AccessDenied = {
  authorized: false;
  status: number;
  message: string;
};

type AccessGranted = {
  authorized: true;
  deck: Deck;
};

type AccessCheckResult = AccessDenied | AccessGranted;

export async function checkDeckAccess(
  deckId: string,
  user: { userId: string; role: Role }
): Promise<AccessCheckResult> {
  const deck = await getDeckByIdService(deckId);

  if (!deck) {
    return { authorized: false, status: 404, message: 'Deck not found' };
  }

  const isAdmin = user.role === 'ADMIN';
  const isOwner = deck.userId === user.userId;

  if (!isAdmin && !isOwner) {
    return { authorized: false, status: 403, message: 'Accès interdit' };
  }

  return { authorized: true, deck };
}