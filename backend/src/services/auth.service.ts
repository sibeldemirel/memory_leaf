import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET non défini");

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function handleRegister({ name, email, password, role }: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 400, message: "Email déjà utilisé" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function handleLogin({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: "Identifiants invalides" };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw { status: 401, message: "Mot de passe incorrect" };

  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
}