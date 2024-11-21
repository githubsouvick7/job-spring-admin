"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";

const searchList = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Mumbai",
  "Gurugram",
  "Noida",
  "Delhi",
  "Kolkata",
  "Ahmedabad",
  "Trivandrum",
  "Kochi",
  "Indore",
  "Jaipur",
  "Nagpur",
  "Lucknow",
  "Bhubaneswar",
  "Chandigarh",
  "Mysuru",
  "Visakhapatnam",
  "Surat",
  "Vadodara",
  "Coimbatore",
  "Rajkot",
  "Amritsar",
  "Vijayawada",
  "Guwahati",
  "Patna",
  "Ranchi",
  "Raipur",
  "Agra",
  "Jodhpur",
];
const LocationComponents = ({
  selectedItems,
  setSelectedItems,
  setFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSelect = (item) => {
    if (!selectedItems?.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setOpen(false);
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems?.filter((i) => i !== item));
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm]);

  return (
    <div className="">
      <div className="flex items-center gap-4 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="p-2 w-[300px] border min-h-10 flex justify-between items-center rounded-md"
            >
              {selectedItems?.length > 0 ? (
                <>
                  <div className="grid-cols-2 gap-2 grid">
                    {selectedItems?.map((item) => (
                      <div
                        key={item}
                        className="justify-between gap-2 w-24 bg-emerald-600 flex items-center px-2 py-1 rounded-full"
                      >
                        <span className="text-xs font-semibold text-white">
                          {item}
                        </span>
                        <button onClick={() => handleRemove(item)}>
                          <BsXCircle
                            size={16}
                            className="text-white hover:text-red-500 font-bold"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cursor-pointer w-10 border-l-2 flex justify-center items-center">
                    <FaChevronDown />
                  </div>
                </>
              ) : (
                <div className="text-xm">Search cities...</div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className=" w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search cities..." className="h-9" />
              <CommandList>
                <CommandEmpty>No batch found.</CommandEmpty>
                <CommandGroup>
                  {searchList
                    .filter((batch) => batch.includes(searchTerm))
                    .map((batch) => (
                      <CommandItem
                        key={batch}
                        onSelect={() => {
                          handleSelect(batch);
                          setFilters((prev) => ({
                            ...prev,
                            location: [...selectedItems, batch],
                          }));
                        }}
                      >
                        {batch}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedItems?.includes(batch)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default LocationComponents;
