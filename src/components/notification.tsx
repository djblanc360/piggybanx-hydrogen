"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
export default function MintingNotification() {
  const [isVisible, setIsVisible] = useState(true)
  const [marqueePosition, setMarqueePosition] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueePosition((prev) => {
        if (prev <= -100) return 0
        return prev - 0.5
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-50 bg-black border border-gray-800 p-4 rounded-lg shadow-lg max-w-xs">
      <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-gray-400 hover:text-white">
        <X className="h-5 w-5" />
      </button>

      <h3 className="text-pink-500 font-bold text-lg mb-2">WISHING WELL IS LIVE</h3>
      <p className="mb-4">
        <span>
          {currentTime.toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>
        <span className="ml-2">PST</span>
      </p>

      <div className="relative overflow-hidden">
        <div className="whitespace-nowrap" style={{ transform: `translateX(${marqueePosition}%)` }}>
          <span className="inline-block">NOW STREAMING NOW STREAMING NOW STREAMING NOW STREAMING</span>
        </div>
      </div>

      <Button variant="outline" className="w-full mt-4 border-white bg-transparent hover:bg-white hover:text-black transition-colors">
        <Link href="https://discord.gg/piggybanxnft" target="_blank">JOIN DISCORD</Link>
      </Button>
    </div>
  )
}