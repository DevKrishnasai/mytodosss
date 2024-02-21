"use client";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { TodoTable } from "./TodoTable";
import { v4 as id } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "./DatePicker";
import { Context } from "@/providers/ContextProvider";
import { useAuth } from "@clerk/nextjs";
import SmallLoading from "./SmallLoading";

const RightSide = () => {
  const { userId } = useAuth();
  const context = useContext(Context);
  const now = new Date();
  const todaysDate = format(now, "MMM dd, yyyy | hh:mm a");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/todo/${userId}`);
      const data = await response.json();
      context.setTodos(data.todos.todos);
      context.categoryFilter(context.category || "", data.todos.todos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const postTodo = async () => {
    try {
      if (!context.text) return null;
      setLoading(true);
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          id: id(),
          text: context.text,
          category: context.category,
          completed: false,
          start: context.startDate,
          end: context.endDate,
        }),
      });
      const data = await response.json();
      context.setText("");
      if (response.status === 200) {
        context.setTodos((prev) => [
          ...prev,
          {
            id: id(),
            text: context.text,
            category: context.category,
            completed: false,
            start: context.startDate,
            end: context.endDate,
          },
        ]);
        context.categoryFilter(context.category, data.todos.todos);
        toast.success("added todo successfully", {
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
      } else
        toast.error("something went wrong", {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div
        className={`border-2 p-3 rounded min-h-fit ${
          context.catTodos.length == 0 && "h-full"
        }`}
      >
        <div className="flex justify-between mb-2 font-bold ml-1">
          {context.category
            ? context.category
            : context.categories.length! > 0
            ? "All"
            : ""}

          <div>{todaysDate}</div>
        </div>
        <Input
          autoFocus
          type="text"
          placeholder="todo"
          value={context?.text}
          className="bg-transparent border-x-0 border-t-0 focus:border-x-0 placeholder:text-white p-1 mb-2"
          onChange={(e) => {
            context?.setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && context?.text.length! > 0) {
              if (context?.categories.length === 0) {
                toast.error("you must create a category first", {
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
                return;
              }
              if (context?.category.length! === 0) {
                toast.error("select a category", {
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
                return;
              }
              postTodo();
              context?.categoryFilter(context.category);
              context?.setText("");
            }
          }}
        />
        <div className="flex gap-2">
          <DatePicker
            date={context!.startDate}
            setDate={context!.setStartDate}
            open={context!.openStart}
            setOpen={context!.setOpenStart}
          />
          <DatePicker
            date={context.endDate}
            setDate={context.setEndDate}
            open={context.openEnd}
            setOpen={context.setOpenEnd}
          />
        </div>
      </div>

      {loading ? (
        <div className="m-3">
          <SmallLoading />
        </div>
      ) : context.catTodos.length === 0 ? (
        <></>
      ) : (
        <div
          className={`border-2 rounded overflow-y-scroll ${
            context?.catTodos.length && "h-full"
          }`}
        >
          <TodoTable />
        </div>
      )}

      <Toaster />
    </>
  );
};

export default RightSide;
