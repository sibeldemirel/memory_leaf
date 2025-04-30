import { Request, Response, RequestHandler } from 'express';
import { createUserService, deleteUserService, getAllUsersService, getUserDecksService, updateUserService } from '../services/user.service';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const user = await createUserService({ name, email, password });
    res.status(201).json({ success: true, data: user, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getUserDecks: RequestHandler = async (req, res) => {
    try {
      const userId = req.params.id;
      const decks = await getUserDecksService(userId);
      res.status(200).json({ success: true, data: decks });
    } catch (error) {
      console.error('Error fetching user decks:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  export const updateUser: RequestHandler = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;
  
      const updatedUser = await updateUserService(userId, { name, email, password });
      res.status(200).json({ success: true, data: updatedUser, message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  export const deleteUser: RequestHandler = async (req, res) => {
    try {
      const userId = req.params.id;
      await deleteUserService(userId);
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };