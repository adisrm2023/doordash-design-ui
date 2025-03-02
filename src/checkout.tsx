"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import MainNav from "@/components/main-nav"
import { useCart } from "@/hooks/use-cart"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const deliveryFee = 3.99
  const serviceFee = 2.99
  const total = subtotal + deliveryFee + serviceFee

  const handlePlaceOrder = () => {
    setIsLoading(true)
    // Simulate order processing
    setTimeout(() => {
      clearCart()
      router.push("/order-tracking")
      setIsLoading(false)
    }, 1500)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
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
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h2 className="flex items-center gap-2 font-semibold">
                  <MapPin className="h-4 w-4" />
                  Delivery address
                </h2>
                <div className="mt-4 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="address">Street address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="San Francisco" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">ZIP code</Label>
                      <Input id="zip" placeholder="94103" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instructions">Delivery instructions (optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Apartment number, gate code, etc."
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="flex items-center gap-2 font-semibold">
                  <CreditCard className="h-4 w-4" />
                  Payment method
                </h2>
                <div className="mt-4">
                  <RadioGroup defaultValue="card">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit or debit card</Label>
                    </div>
                    <div className="mt-4 grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-number">Card number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-20 rounded-lg border bg-white p-4 shadow">
                <h3 className="font-semibold">Order summary</h3>
                <div className="mt-4 space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
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
                <Button className="mt-4 w-full" onClick={handlePlaceOrder} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Place order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

