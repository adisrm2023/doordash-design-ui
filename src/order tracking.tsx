"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, Clock, MapPin, Phone, Truck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import MainNav from "@/components/main-nav"

const DELIVERY_STEPS = [
  { id: 1, title: "Order confirmed", icon: Check, time: "2 min" },
  { id: 2, title: "Preparing your food", icon: Clock, time: "15 min" },
  { id: 3, title: "Food is ready", icon: Check, time: "5 min" },
  { id: 4, title: "Dasher on the way", icon: Truck, time: "10 min" },
  { id: 5, title: "Order delivered", icon: MapPin, time: "" },
]

export default function OrderTrackingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [estimatedTime, setEstimatedTime] = useState(32)

  useEffect(() => {
    // Simulate order progress
    const timer = setTimeout(() => {
      if (currentStep < DELIVERY_STEPS.length - 1) {
        setCurrentStep(currentStep + 1)
        setProgress((currentStep + 1) * 25)
        setEstimatedTime(Math.max(0, estimatedTime - 8))
      }
    }, 8000)

    return () => clearTimeout(timer)
  }, [currentStep, estimatedTime])

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold">Tracking your order</h1>
            <div className="mt-8 rounded-lg border bg-white p-6 shadow">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-lg font-semibold">Estimated delivery in {estimatedTime} minutes</div>
                <Progress value={progress} className="mt-4 h-2 w-full" />
                <div className="mt-8 grid w-full gap-6">
                  {DELIVERY_STEPS.map((step) => {
                    const isCompleted = step.id < currentStep
                    const isCurrent = step.id === currentStep
                    const isPending = step.id > currentStep

                    return (
                      <div key={step.id} className={`flex items-center gap-4 ${isPending ? "opacity-50" : ""}`}>
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            isCompleted || isCurrent ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{step.title}</div>
                          {step.time && (
                            <div className="text-sm text-gray-500">{isCompleted ? "Completed" : step.time}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border bg-white p-6 shadow">
              <h2 className="font-semibold">Dasher details</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">Michael</div>
                  <div className="text-sm text-gray-500">Your Dasher</div>
                </div>
                <Button variant="outline" size="icon" className="ml-auto rounded-full">
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Call Dasher</span>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

