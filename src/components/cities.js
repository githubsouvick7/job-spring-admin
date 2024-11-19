"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, CaretSortIcon } from "lucide-react";

const frameworks = [
  {
    value: "Bengaluru",
    label: { city: "Bengaluru", state: "Karnataka" },
  },
  {
    value: "Remote",
    label: { city: "Remote", state: "India" },
  },
  {
    value: "Hyderabad",
    label: { city: "Hyderabad", state: "Telangana" },
  },
  {
    value: "Pune",
    label: { city: "Pune", state: "Maharashtra" },
  },
  {
    value: "Chennai",
    label: { city: "Chennai", state: "Tamil Nadu" },
  },
  {
    value: "Mumbai",
    label: { city: "Mumbai", state: "Maharashtra" },
  },
  {
    value: "Gurugram",
    label: { city: "Gurugram", state: "Haryana" },
  },
  {
    value: "Noida",
    label: { city: "Noida", state: "Uttar Pradesh" },
  },
  {
    value: "Delhi",
    label: { city: "Delhi", state: "Delhi" },
  },
  {
    value: "Kolkata",
    label: { city: "Kolkata", state: "West Bengal" },
  },
  {
    value: "Ahmedabad",
    label: { city: "Ahmedabad", state: "Gujarat" },
  },
  {
    value: "Trivandrum",
    label: { city: "Trivandrum", state: "Kerala" },
  },
  {
    value: "Kochi",
    label: { city: "Kochi", state: "Kerala" },
  },
  {
    value: "Indore",
    label: { city: "Indore", state: "Madhya Pradesh" },
  },
  {
    value: "Jaipur",
    label: { city: "Jaipur", state: "Rajasthan" },
  },
  {
    value: "Nagpur",
    label: { city: "Nagpur", state: "Maharashtra" },
  },
  {
    value: "Lucknow",
    label: { city: "Lucknow", state: "Uttar Pradesh" },
  },
  {
    value: "Bhubaneswar",
    label: { city: "Bhubaneswar", state: "Odisha" },
  },
  {
    value: "Chandigarh",
    label: { city: "Chandigarh", state: "Chandigarh" },
  },
  {
    value: "Mysuru",
    label: { city: "Mysuru", state: "Karnataka" },
  },
  {
    value: "Visakhapatnam",
    label: { city: "Visakhapatnam", state: "Andhra Pradesh" },
  },

  {
    value: "Surat",
    label: { city: "Surat", state: "Gujarat" },
  },
  {
    value: "Vadodara",
    label: { city: "Vadodara", state: "Gujarat" },
  },
  {
    value: "Coimbatore",
    label: { city: "Coimbatore", state: "Tamil Nadu" },
  },
  {
    value: "Rajkot",
    label: { city: "Rajkot", state: "Gujarat" },
  },
  {
    value: "Amritsar",
    label: { city: "Amritsar", state: "Punjab" },
  },
  {
    value: "Vijayawada",
    label: { city: "Vijayawada", state: "Andhra Pradesh" },
  },
  {
    value: "Guwahati",
    label: { city: "Guwahati", state: "Assam" },
  },
  {
    value: "Patna",
    label: { city: "Patna", state: "Bihar" },
  },
  {
    value: "Ranchi",
    label: { city: "Ranchi", state: "Jharkhand" },
  },
  {
    value: "Raipur",
    label: { city: "Raipur", state: "Chhattisgarh" },
  },
  {
    value: "Agra",
    label: { city: "Agra", state: "Uttar Pradesh" },
  },
  {
    value: "Jodhpur",
    label: { city: "Jodhpur", state: "Rajasthan" },
  },
];

export function ComboboxDemo({ setData }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
                .city
            : "Select location..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setData(framework);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label.city}, {framework.label.state}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
