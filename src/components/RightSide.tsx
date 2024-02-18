"use client";
import { Context } from "@/providers/ContextProvider";
import { useContext } from "react";
import date from "date-and-time";
import { Input } from "./ui/input";
import { TodoTable } from "./TodoTable";
import { v4 as id } from "uuid";

const RightSide = () => {
  const context = useContext(Context);
  const now = new Date();
  // context?.categoryFilter(context?.category);
  return (
    <>
      <div
        className={`border-2 p-3 rounded min-h-fit ${
          context?.todos.length == 0 && "h-full"
        }`}
      >
        <div className="flex justify-between mb-2">
          {context?.category}

          <div>{date.format(now, "ddd, MMM DD YYYY")}</div>
        </div>

        <Input
          type="text"
          placeholder="todo"
          value={context?.text}
          className="bg-transparent border-x-0 border-t-0 focus:border-x-0 placeholder:text-white p-1 mb-2"
          onChange={(e) => {
            context?.setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              context?.setTodos([
                ...context.todos,
                {
                  text: context.text,
                  category: context.category,
                  completed: false,
                  id: id(),
                },
              ]);
              console.log(context?.category);

              // console.log(context?.categoryFilter(context.category));
              // console.log(context?.catTodos);
              context?.setText("");
              // if (context?.category === "All" || context?.category) {
              //   context.categoryFilter("All");
              // }
            }
          }}
        />
      </div>
      {context?.todos.length == 0 ? (
        // <>{context.categoryFilter("All")}</>
        <></>
      ) : (
        <div className="border-2 rounded overflow-y-scroll">
          <TodoTable />
        </div>

        // <ul className="border-2 max-h-full p-3 flex flex-col gap-2 overflow-y-scroll">
        //   {context?.todos.map((todo) => {
        //     return (
        //       <li key={todo} className="">
        //         {todo}
        //       </li>
        //     );
        //   })}
        // </ul>
      )}
    </>
  );
};

export default RightSide;
