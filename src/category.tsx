"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = [
  "All",
  "Fast Food",
  "Pizza",
  "Sushi",
  "Chinese",
  "Mexican",
  "Italian",
  "Dessert",
  "Breakfast",
  "Healthy",
]

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          {selectedCategory}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              className="flex items-center justify-between"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {selectedCategory === category && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

