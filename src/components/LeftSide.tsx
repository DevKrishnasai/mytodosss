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

const LeftSide = () => {
  const context = useContext(Context);
  // useEffect(() => {
  //   const todosCategories = async () => {
  //     try {
  //       // const response = await fetch("/api/todo");
  //       // const data = await response.json();
  //       context?.setCategories(categories);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   todosCategories();
  //   context?.categoryFilter(context?.category);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [context?.todos, context?.text]);
  // context.setCategories(categories);
  // const fetchCategories = () => {
  //   context.setCategories(categories);
  // };
  // fetchCategories();

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
    </>
  );
};

export default LeftSide;
