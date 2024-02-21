export interface IContext {
  categories: String[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  catTodos: ITodo[];
  setCatTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  categoryFilter: (item: string, list?: ITodo[]) => void;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  openStart: boolean;
  setOpenStart: React.Dispatch<React.SetStateAction<boolean>>;
  openEnd: boolean;
  setOpenEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  start: Date;
  end: Date;
}
