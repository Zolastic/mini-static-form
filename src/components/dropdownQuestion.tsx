import React, { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/utils/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const sports = [
  {
    value: "football",
    label: "Football",
  },
  {
    value: "basketball",
    label: "Basketball",
  },
  {
    value: "baseball",
    label: "Baseball",
  },
  {
    value: "tennis",
    label: "Tennis",
  },
  {
    value: "golf",
    label: "Golf",
  },
];

type Props = {
  response: string;
  onChangeResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DropDownQuestion = ({ response, onChangeResponse }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    onChangeResponse({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? sports.find((sport) => sport.value === value)?.label
            : "Select sport..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search sport..." />
          <CommandEmpty>That sports sucks.</CommandEmpty>
          <CommandGroup>
            {sports.map((sport) => (
              <CommandItem
                key={sport.value}
                value={sport.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === sport.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {sport.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropDownQuestion;
