"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { useContext } from "react";
import { Context } from "@/providers/ContextProvider";
import { format } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { ITodo } from "@/types/usefulltypes";
import toast, { Toaster } from "react-hot-toast";

export function TodoTable() {
  const { userId } = useAuth();
  const context = useContext(Context);

  const updateTodo = async (todo: ITodo) => {
    try {
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          id: todo.id,
          category: todo.category,
          completed: !todo.completed,
        }),
      });
      if (response.status === 201)
        toast.success("Updated todo", {
          style: {
            backgroundColor: "transparent",
            color: "white",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "white",
          },
          duration: 1000,
          position: "top-center",
        });
      else
        toast.error("Failed to update todo", {
          style: {
            backgroundColor: "transparent",
            color: "red",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "white",
          },
          duration: 1000,
          position: "top-center",
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Table className="h-full">
        <TableHeader>
          <TableRow className="">
            <TableHead>{/* <Checkbox /> */}</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Task</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {context.catTodos.map((todo) => (
            <TableRow
              key={todo.id}
              onClick={(e) => {
                updateTodo(todo);
                const task = context.todos.findIndex(
                  (task) => task.id === todo.id
                );
                const tasks = context.todos;
                tasks[task] = { ...tasks[task], completed: !todo.completed };
                context.setTodos(tasks);
                context.setCategory(todo.category);
                context.categoryFilter(todo.category);
              }}
              className="hover:bg-white hover:text-black"
            >
              <TableCell className="w-5">
                <Checkbox
                  {...(todo.completed ? { checked: true } : { disabled: true })}
                />
              </TableCell>
              <TableCell className="">{format(todo.start, "MMM dd")}</TableCell>
              <TableCell className="text-left">
                {format(todo.end, "MMM dd")}
              </TableCell>
              <TableCell className="">{todo.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </>
  );
}
