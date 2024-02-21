"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  setDate,
  open,
  setOpen,
  name,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date>> | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}) {
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] lg:w-[200px]  justify-center text-left font-normal bg-transparent",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {name}
          {" -"} {date ? format(date, "PP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 ">
        <Calendar
          mode="single"
          selected={date}
          onDayClick={setDate}
          onSelect={() => setOpen(false)}
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
