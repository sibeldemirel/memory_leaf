import { CardStatus } from '@prisma/client';

interface CardCounter {
  newCardsCount: number;
  learningCardsCount: number;
  reviewCardsCount: number;
};

export function getDeckCounter(
  oldStatus: CardStatus | null,
  newStatus: CardStatus | null
): CardCounter {
  const counter: CardCounter = {
    newCardsCount: 0,
    learningCardsCount: 0,
    reviewCardsCount: 0,
  };

  // SORTIE (suppression ou modification)
  if (oldStatus) {
    if (oldStatus === 'NEW') {
      counter.newCardsCount -= 1;
      counter.reviewCardsCount -= 1;
    } else if (oldStatus === 'LEARNING') {
      counter.learningCardsCount -= 1;
    } else if (oldStatus === 'REVIEW') {
      counter.reviewCardsCount -= 1;
    }
    // TODO : status "ACQUIRED" not implemented
  }

  // ENTREE (création ou modification)
  if (newStatus) {
    if (newStatus === 'NEW') {
      counter.newCardsCount += 1;
      counter.reviewCardsCount += 1;
    } else if (newStatus === 'LEARNING') {
      counter.learningCardsCount += 1;
    } else if (newStatus === 'REVIEW') {
      counter.reviewCardsCount += 1;
    }
    // TODO : status "ACQUIRED" not implemented
  }

  return counter;
}
