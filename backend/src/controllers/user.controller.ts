import { RequestHandler } from 'express';
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserDecksService,
  updateUserService,
} from '../services/user.service';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const user = await createUserService({ name, email, password });
    res.status(201).json({ success: true, data: user, message: 'User created successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

export const getUserDecks: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const decks = await getUserDecksService(userId);
    res.status(200).json({ success: true, data: decks });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch user decks' });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const updatedUser = await updateUserService(userId, { name, email, password });
    res.status(200).json({ success: true, data: updatedUser, message: 'User updated successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUserService(userId);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};