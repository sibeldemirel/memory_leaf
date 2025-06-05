import { RequestHandler } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { handleLogin, handleRegister } from "../services/auth.service";

type KnownError = {
  status?: number;
  message?: string;
};

export const register: RequestHandler = async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Invalid fields",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const data = await handleRegister(req.body);
    res.status(201).json({ success: true, data });
  } catch (err: unknown) {
    const error = err as KnownError;
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Invalid fields",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const token = await handleLogin(req.body);
    res.status(200).json({ success: true, token });
  } catch (err: unknown) {
    const error = err as KnownError;
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};
