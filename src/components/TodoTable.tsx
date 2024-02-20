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

export function TodoTable() {
  const context = useContext(Context);

  return (
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
  );
}
