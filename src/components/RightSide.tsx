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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

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

  const todosCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/category/${userId}`);
      const { categories } = await response.json();
      context.setCategories(categories[0].categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          category,
        }),
      });
      if (response.status === 200) {
        toast.success("Added category successfully", {
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
        todosCategories();
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
      toast.error("Something went wrong", {
        style: {
          backgroundColor: "transparent",
          color: "red",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "white",
        },
        duration: 1000,
        position: "top-right",
      });
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
    todosCategories();
  }, []);

  return (
    <>
      <div
        className={`border-2 p-3 rounded min-h-fit ${
          context.catTodos.length == 0 && "h-full"
        }`}
      >
        <div className="flex justify-between mb-2 font-bold ml-1 ">
          {context.category
            ? context.category
            : context.categories.length! > 0
            ? "All"
            : ""}

          <div>{todaysDate}</div>
        </div>
        <div className="flex">
          <Input
            autoFocus
            type="text"
            placeholder="todo"
            value={context?.text}
            className="bg-transparent border-x-0 placeholder:text-white p-1 mb-3 font-semibold"
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
          <Select
            onValueChange={(value) => {
              if (value === "All") {
                context.setCategory("");
                context.categoryFilter("", context.todos);
                return;
              }
              if (value === "create cat") {
                context.setOpen(true);
                context.setCategory("");

                return;
              }
              context.setCategory(value);
              context.categoryFilter(value);
            }}
            value={context.category}
            defaultValue={context.category === "" ? "All" : context.category}
          >
            <SelectTrigger className="w-[150px] bg-transparent border-x-0">
              <SelectValue placeholder="select..." />
            </SelectTrigger>
            <SelectContent className=" bg-transparent bg-black opacity-90 text-white font-bold flex">
              <SelectItem value="All" className="cursor-pointer">
                All
              </SelectItem>
              {context.categories.map((category) => (
                <SelectItem
                  key={category.toString()}
                  value={category.toString()}
                  className="cursor-pointer"
                >
                  {category}
                </SelectItem>
              ))}
              <SelectItem
                value="create cat"
                className="cursor-pointer bg-blue-700"
              >
                create
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-center gap-6">
          <DatePicker
            date={context!.startDate}
            setDate={context!.setStartDate}
            open={context!.openStart}
            setOpen={context!.setOpenStart}
            name="From"
          />
          <DatePicker
            date={context.endDate}
            setDate={context.setEndDate}
            open={context.openEnd}
            setOpen={context.setOpenEnd}
            name="To"
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
          <TodoTable fetchTodos={fetchTodos} />
        </div>
      )}
      <Drawer open={context.open}>
        <DrawerContent className="pb-5 text-white bg-transparent flex justify-center items-center ">
          <DrawerHeader className="w-full lg:w-1/3  pt-7 flex flex-col justify-between items-center gap-4">
            <DrawerTitle>Add a Category</DrawerTitle>
            <DrawerDescription className="w-full">
              <Input
                type="text"
                placeholder="todo category"
                className="bg-transparent text-white w-full "
                onChange={(e) => context.setText(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && context.text.length > 0) {
                    addCategory(context.text);
                    context.setCategories((cat) => [...cat, context.text]);
                    context.setText("");
                    context.setOpen(false);
                  }
                }}
              />
            </DrawerDescription>
            <div className="w-full flex gap-4">
              <Button
                variant="ghost"
                className="bg-white text-black w-1/2"
                onClick={() => {
                  if (!context.text) return null;
                  addCategory(context.text);
                  context.setOpen(false);
                  context.setCategories((cat) => [...cat, context.text]);
                  context.setText("");
                }}
              >
                Add
              </Button>
              <Button
                variant="destructive"
                className="w-1/2"
                onClick={() => context.setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Toaster />
    </>
  );
};

export default RightSide;
