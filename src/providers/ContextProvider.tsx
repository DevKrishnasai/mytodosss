"use client";
import { IContext, ITodo } from "@/types/usefulltypes";
import { createContext, useState } from "react";

export const Context = createContext<IContext | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [catTodos, setCatTodos] = useState<ITodo[]>([]);

  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const categoryFilter = (cat: string) => {
    const tasks = todos.filter((todo) => todo.category === cat);
    setCatTodos((_) => [...tasks]);
  };

  return (
    <Context.Provider
      value={{
        categories,
        category,
        setCategory,
        open,
        setOpen,
        text,
        setText,
        openMenu,
        setOpenMenu,
        todos,
        setTodos,
        setCategories,
        // catTodos,
        // setCatTodos,
        // categoryFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
