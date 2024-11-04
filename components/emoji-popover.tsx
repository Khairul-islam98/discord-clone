import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

    const onSelect = (data: EmojiClickData) => {
        onEmojiSelect(data.emoji);
        setPopoverOpen(false);

        setTimeout(() => {
          setTooltipOpen(false);
      }, 500)
    }

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent
          className="bg-black text-white border border-white/5"
          >
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
        >
            <EmojiPicker onEmojiClick={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
