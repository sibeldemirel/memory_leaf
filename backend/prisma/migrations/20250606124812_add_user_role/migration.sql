-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('NEW', 'LEARNING', 'REVIEW');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "status" "CardStatus" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
