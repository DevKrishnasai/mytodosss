"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delete, DeleteIcon } from "lucide-react";

const ToolUpMenu = ({ category }: { category: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{category}</TooltipTrigger>
        <TooltipContent>
          <Delete />
          <p>delete to {category}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolUpMenu;
