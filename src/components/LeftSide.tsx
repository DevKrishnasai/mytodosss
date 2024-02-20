"use client";
import { Context } from "@/providers/ContextProvider";
import { useContext, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";

const LeftSide = () => {
  const context = useContext(Context);
  const { userId } = useAuth();
  const todosCategories = async () => {
    try {
      const response = await fetch(`/api/category/${userId}`);
      const { categories } = await response.json();
      context.setCategories(categories[0].categories);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (category: string) => {
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          category,
        }),
      });
      if (response.status === 200)
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
      else
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
    }
  };

  useEffect(() => {
    todosCategories();
  }, [context.categories.length]);

  return (
    <>
      <div className="">
        <div className="mb-2 text-left text-lg font-extrabold rounded-full">
          Categories
        </div>
        {context.categories.length > 0 && (
          <div
            className={`mb-1 py-1 text-left cursor-pointer hover:font-extrabold hover:first-letter:text-red-800  transition-all ${
              context!.category === "" &&
              "font-extrabold first-letter:text-red-800"
            }`}
            onClick={() => {
              context.setCategory("");
              context.setCatTodos(context.todos);
            }}
          >
            All
          </div>
        )}
        <ul className=" overflow-auto">
          {context.categories.map((item, index) => {
            return (
              <li
                className={`mb-1 pb-1 text-left cursor-pointer hover:font-extrabold hover:first-letter:text-red-800  transition-all ${
                  context.category === item &&
                  "font-extrabold first-letter:text-red-800"
                }`}
                key={index}
                onClick={() => {
                  context.setCategory(item.toString());
                  context.categoryFilter(item.toString());
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="cursor-pointer text-white flex items-center"
        onClick={() => {
          context.setOpen(true);
        }}
      >
        <IoAddSharp /> category
      </div>
      <Drawer open={context.open}>
        <DrawerContent className="pb-5 text-white bg-transparent flex justify-center items-center ">
          <DrawerHeader className="w-1/3 pt-7 flex flex-col justify-between items-center gap-4">
            <DrawerTitle>Add Category</DrawerTitle>
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

export default LeftSide;
