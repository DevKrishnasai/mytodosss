"use client";
import React, { createContext, useState } from "react";
import { IContext, ITodo } from "@/types/usefulltypes";

// Define default values for context properties
const defaultContextValues: IContext = {
  categories: [],
  setCategories: () => {},
  category: "",
  setCategory: () => {},
  open: false,
  setOpen: () => {},
  text: "",
  setText: () => {},
  openMenu: false,
  setOpenMenu: () => {},
  todos: [],
  setTodos: () => {},
  catTodos: [],
  setCatTodos: () => {},
  categoryFilter: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  openStart: false,
  setOpenStart: () => {},
  openEnd: false,
  setOpenEnd: () => {},
};

export const Context = createContext<IContext>(defaultContextValues);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [catTodos, setCatTodos] = useState<ITodo[]>([]);

  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [openStart, setOpenStart] = useState<boolean>(false);
  const [openEnd, setOpenEnd] = useState<boolean>(false);

  const categoryFilter = (cat: string, list: ITodo[] = []) => {
    if (cat === "") {
      setCatTodos([...list]);
      return;
    }
    if (list.length === 0) {
      const tasks = todos.filter((todo) => todo.category === cat);
      setCatTodos(tasks);
    } else {
      const tasks = list.filter((todo) => todo.category === cat);
      setCatTodos(tasks);
    }
  };

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
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
        catTodos,
        setCatTodos,
        categoryFilter,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        openStart,
        setOpenStart,
        openEnd,
        setOpenEnd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
