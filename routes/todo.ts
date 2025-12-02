import express from "express"
import { addTodo, getTodo, getTodos, removeTodo, updateTodo } from "../data.ts";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT!");
    res.send("TEST OK");
});

router.post("/todos", (req, res) => {
    const text = req.body.text;

    const addedTodo = addTodo(text);

    console.log("BODY:", req.body);

    res.status(201).json({message: "Todo added!", todo: addedTodo});
});

router.get("/todos", (req, res) => {
    const todos = getTodos();
    res.status(200).json({todos});
})

router.get("/todos/:id", (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        return res.status(400).json({message: "Invalid ID"});
    }
    const todo = getTodo(+req.params.id);
    if (!todo) {
        return res.status(404).json({message: "Todo not found!."})
    }
    res.status(200).json({todo});
});

router.patch("/todos/:id", (req, res) => {
    const updateText = req.body.text

    const update = updateTodo(+req.params.id, updateText);

    res.status(200).json({updated: "Todo deleted!.", update});
});

router.delete("/todos/:id", (req, res) => {
    const deleteTodo = removeTodo(+req.params.id);

    res.status(200).json({message: "Todo deleted", deleteTodo})
})

export default router;