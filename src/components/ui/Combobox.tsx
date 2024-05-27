

import React, { useState, useEffect } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface Person {
  Id_person: number;
  userID: string;
  garde: string | null;
  name: string;
 
}

interface ComboboxProps {
  value: string| undefined; 
  setValue: (value: string | undefined) => void;
  onBlur: () => void;
  onClick: () => void;
  onSelect?: (selectedValue: string) => void;
}

export function ComboboxDemo({ value, setValue, onBlur,onClick }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [persons, setPersons] = useState<string[]>([]); // Array to store person names

  // Chargement des données au montage du composant (Data loading on component mount)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/personnes");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();



        // Extraire les noms des personnes de l'objet et les stocker dans un tableau
        const namesArray = data.data.map((person: Person) => person.name).filter(Boolean);
        setPersons(namesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle fetching errors (e.g., display an error message)
      }
    };

    fetchData();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select person..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search person..."
            className="h-9"
          />
          <CommandEmpty>No person found.</CommandEmpty>
          <CommandGroup>
            {persons.map((personName) => (
              <CommandItem
                key={personName}
                value={personName} // Utilisation de la même valeur pour name et value
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onBlur(); // Handle blur when item is selected
                  onClick(); // Handle click when item is selected
                  
                }}
              >
                {personName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === personName ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
