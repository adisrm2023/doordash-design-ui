import { Search } from "lucide-react"
import Link from "next/link"
import RestaurantCard from "@/components/restaurant-card"
import CategoryFilter from "@/components/category-filter"
import { restaurants } from "@/data/restaurants"
import MainNav from "@/components/main-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 bg-red-600">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    Restaurants and more, delivered to your door
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl">
                    Order from your favorite restaurants, grocery stores, and more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="search"
                      placeholder="Enter delivery address"
                      className="w-full rounded-md border border-gray-200 bg-white px-8 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500"
                    />
                  </div>
                  <button className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-red-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500">
                    Find Food
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Food delivery"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight">Restaurants near you</h2>
                <div className="ml-auto">
                  <CategoryFilter />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-gray-100 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">© 2023 DoorDash Clone. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-4 md:justify-end">
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

