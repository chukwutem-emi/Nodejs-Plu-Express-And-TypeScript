import express, {type Request, type Response, type NextFunction} from "express";
import todoRoutes from "./routes/todo.ts"

const app = express();

app.use(express.json());

app.use(todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: "An error occurred!", error: `${String(err)}`});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});