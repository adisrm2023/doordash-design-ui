"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import MainNav from "@/components/main-nav"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const router = useRouter()
  const { items, updateItemQuantity, removeItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const deliveryFee = 3.99
  const serviceFee = 2.99
  const total = subtotal + deliveryFee + serviceFee

  const handleCheckout = () => {
    setIsLoading(true)
    // Simulate checkout process
    setTimeout(() => {
      router.push("/checkout")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold">Your cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">Add items from a restaurant to get started</p>
              <Button className="mt-6" asChild>
                <Link href="/">Browse restaurants</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              if (item.quantity === 1) {
                                removeItem(item.id)
                              } else {
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            }}
                          >
                            {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-600 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="sticky top-20 rounded-lg border bg-white p-4 shadow">
                  <h3 className="font-semibold">Order summary</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button className="mt-4 w-full" onClick={handleCheckout} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Checkout"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

