import { Request, Response, NextFunction } from "express";
import pool from "../config/db";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Titulo y descripción requeridos!" });
    return;
  }

  if (title.length < 3 || description.length < 3) {
    res.status(400).json({
      error: "El título y la descripción deben tener al menos 3 caracteres.",
    });
    return;
  }

  try {
    const [result]: any = await pool.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.json({ id: result.insertId, title, description });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: "Titulo y descripción requeridos!" });
    return;
  }

  if (title.length < 3 || description.length < 3) {
    res.status(400).json({
      error: "El título y la descripción deben tener al menos 3 caracteres.",
    });
    return;
  }
  try {
    await pool.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );

    res.json({ id, title, description });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({ message: "Tarea borrada" });
  } catch (error) {
    next(error);
  }
};
