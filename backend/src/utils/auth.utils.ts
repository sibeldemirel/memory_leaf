import { Role } from "@prisma/client";

export function isOwnerOrAdmin(resourceUserId: string, currentUserId: string, currentUserRole: Role): boolean {
  return resourceUserId === currentUserId || currentUserRole === "ADMIN";
}
