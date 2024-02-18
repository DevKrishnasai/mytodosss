import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import date from "date-and-time";
import { useContext } from "react";
import { Context } from "@/providers/ContextProvider";

export function TodoTable() {
  const context = useContext(Context);
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>{/* <Checkbox /> */}</TableHead>
          <TableHead className="text-white">Start</TableHead>
          <TableHead className="text-white">End</TableHead>
          <TableHead className="text-white">Task</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {context?.todos.map((todo) => (
          <TableRow
            key={todo.id}
            onClick={(e) => {
              const task = context.todos.findIndex(
                (task) => task.id === todo.id
              );
              const tasks = context.todos;
              tasks[task] = { ...tasks[task], completed: !todo.completed };
              console.log(tasks);
              // context.setTodos(tasks);
              context.setTodos((todos) => [...tasks]);

              console.log(context.todos);
            }}
            className="hover:bg-white hover:text-black"
          >
            <TableCell className="font-medium">
              {todo.completed ? (
                <Checkbox checked className="" />
              ) : (
                <Checkbox />
              )}
              {/* <Checkbox /> */}
            </TableCell>
            <TableCell>{date.format(new Date(), "hh:mm ")}</TableCell>
            <TableCell>{date.format(new Date(), "hh:mm ")}</TableCell>
            <TableCell>{todo.text}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
