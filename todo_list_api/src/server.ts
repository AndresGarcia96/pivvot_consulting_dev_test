import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import tasksRoutes from "./routes/tasksRoutes";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use("/tasks", tasksRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
