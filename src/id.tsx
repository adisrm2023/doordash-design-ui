"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, Info, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainNav from "@/components/main-nav"
import MenuItem from "@/components/menu-item"
import { restaurants } from "@/data/restaurants"
import { menuItems } from "@/data/menu-items"

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string
  const restaurant = restaurants.find((r) => r.id === restaurantId)

  const [activeTab, setActiveTab] = useState("featured")

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  // Group menu items by category
  const menuCategories = menuItems
    .filter((item) => item.restaurantId === restaurantId)
    .reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
      },
      {} as Record<string, typeof menuItems>,
    )

  const categories = Object.keys(menuCategories)

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <div className="relative h-64 w-full bg-gray-200">
          <img
            src={restaurant.image || "/placeholder.svg?height=300&width=800"}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-4 bg-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
        <div className="container px-4 py-6 md:px-6">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr]">
            <div>
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{restaurant.rating}</span>
                  <span className="ml-1">({restaurant.reviewCount})</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4" />
                  <span className="ml-1">{restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4" />
                  <span className="ml-1">{restaurant.distance} mi</span>
                </div>
                {restaurant.deliveryFee ? <div>${restaurant.deliveryFee} delivery fee</div> : <div>Free delivery</div>}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Info className="mr-1 h-3 w-3" />
                  More info
                </Button>
              </div>
              <div className="mt-8">
                <Tabs defaultValue="featured" onValueChange={setActiveTab}>
                  <TabsList className="w-full justify-start border-b bg-transparent p-0">
                    <TabsTrigger
                      value="featured"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Featured
                    </TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="featured" className="mt-6">
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold">Most Popular</h3>
                      <div className="grid gap-4">
                        {Object.values(menuCategories)
                          .flat()
                          .filter((item) => item.popular)
                          .map((item) => (
                            <MenuItem key={item.id} item={item} />
                          ))}
                      </div>
                    </div>
                  </TabsContent>
                  {categories.map((category) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <div className="grid gap-4">
                        <h3 className="text-lg font-semibold">{category}</h3>
                        <div className="grid gap-4">
                          {menuCategories[category].map((item) => (
                            <MenuItem key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="sticky top-20 rounded-lg border bg-white p-4 shadow">
                <h3 className="font-semibold">Your cart</h3>
                <div className="mt-4 text-center text-sm text-gray-500">Add items to get started</div>
                <Button className="mt-4 w-full" disabled>
                  Go to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

