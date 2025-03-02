"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="font-bold text-red-600 text-xl">DoorDash</div>
        </Link>
        <nav className="hidden ml-auto gap-4 md:flex">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Become a Dasher
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Business
          </Link>
          <Link
            href="/account"
            className="flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4"
          >
            <User className="h-4 w-4" />
            Account
          </Link>
          <Link href="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {items.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 w-full bg-white border-b md:hidden">
            <div className="container px-4 py-4 space-y-4">
              <Link href="#" className="block text-sm font-medium hover:underline underline-offset-4">
                Become a Dasher
              </Link>
              <Link href="#" className="block text-sm font-medium hover:underline underline-offset-4">
                Business
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4"
              >
                <ShoppingCart className="h-4 w-4" />
                Cart {items.length > 0 && `(${items.length})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

