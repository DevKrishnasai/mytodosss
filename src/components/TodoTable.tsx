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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TodoTable({ fetchTodos }: { fetchTodos: () => Promise<void> }) {
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
      else {
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
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Tabs
        defaultValue="pending tasks"
        className="flex flex-col justify-center items-center transition-all"
      >
        <TabsList className="bg-transparent border-2 border-t-0 text-white ">
          <TabsTrigger value="pending tasks">pending tasks</TabsTrigger>
          <TabsTrigger value="completed tasks">completed tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="pending tasks" className="w-full">
          {context.catTodos.filter((todo) => todo.completed === false)
            .length === 0 ? (
            <div className="text-center m-3 mb-5 font-bold">
              All set and complete 👌
            </div>
          ) : (
            <Table className="h-full">
              <TableHeader>
                <TableRow className="">
                  <TableHead>{/* <Checkbox /> */}</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Task</TableHead>
                  {context.category === "" && <TableHead>Category</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {context.catTodos.map((todo) => {
                  if (todo.completed) {
                    return null;
                  }
                  return (
                    <TableRow
                      key={todo.id}
                      onClick={(e) => {
                        updateTodo(todo);
                        const task = context.todos.findIndex(
                          (task) => task.id === todo.id
                        );
                        const tasks = context.todos;
                        tasks[task] = {
                          ...tasks[task],
                          completed: !todo.completed,
                        };
                        context.setTodos([...tasks]);
                        if (context.category === "") {
                          context.setCategory("");
                          context.categoryFilter("", context.todos);
                          return;
                        } else {
                          context.setCategory(context.category);
                          context.categoryFilter(context.category, tasks);
                        }
                      }}
                      className="hover:bg-white hover:font-bold hover:text-black hover:border-black"
                    >
                      <TableCell className="w-5 ">
                        <Checkbox
                          className="hover:border-black hover:border-2"
                          {...(todo.completed ? { checked: true } : {})}
                        />
                      </TableCell>
                      <TableCell className="">
                        {format(todo.start, "MMM dd")}
                      </TableCell>
                      <TableCell className="text-left">
                        {format(todo.end, "MMM dd")}
                      </TableCell>
                      <TableCell className="max-w-32 text-wrap overflow-auto">
                        {todo.text}
                      </TableCell>
                      {context.category === "" && (
                        <TableCell>{todo.category}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="completed tasks" className="w-full">
          {context.catTodos.filter((todo) => todo.completed === true).length ===
          0 ? (
            <div className="text-center m-3 mb-5 font-bold">
              Go to pending task and complete 😑
            </div>
          ) : (
            <Table className="h-full">
              <TableHeader>
                <TableRow className="">
                  <TableHead>{/* <Checkbox /> */}</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Task</TableHead>
                  {context.category === "" && <TableHead>Category</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {context.catTodos.map((todo) => {
                  if (!todo.completed) {
                    return null;
                  }
                  return (
                    <TableRow
                      key={todo.id}
                      onClick={(e) => {
                        updateTodo(todo);
                        const task = context.todos.findIndex(
                          (task) => task.id === todo.id
                        );
                        const tasks = context.todos;
                        tasks[task] = {
                          ...tasks[task],
                          completed: !todo.completed,
                        };
                        context.setTodos([...tasks]);
                        if (context.category === "") {
                          context.setCategory("");
                          context.categoryFilter("", context.todos);
                          return;
                        } else {
                          context.setCategory(context.category);
                          context.categoryFilter(context.category, tasks);
                        }
                      }}
                      className="hover:bg-white hover:font-bold hover:text-black hover:border-black"
                    >
                      <TableCell className="w-5 ">
                        <Checkbox
                          className="hover:border-black hover:border-2"
                          {...(todo.completed ? { checked: true } : {})}
                        />
                      </TableCell>
                      <TableCell className="">
                        {format(todo.start, "MMM dd")}
                      </TableCell>
                      <TableCell className="text-left">
                        {format(todo.end, "MMM dd")}
                      </TableCell>
                      <TableCell className="max-w-32 text-wrap overflow-auto">
                        {todo.text}
                      </TableCell>
                      {context.category === "" && (
                        <TableCell>{todo.category}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      <Toaster />
    </>
  );
}
