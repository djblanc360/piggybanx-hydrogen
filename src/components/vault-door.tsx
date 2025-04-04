"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VaultDoorProps {
  title: string
  description: string
  route: string
}

export default function VaultDoor({ title, description, route }: VaultDoorProps) {
  const router = useRouter()
  const [isOpening, setIsOpening] = useState(false)
  const doorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    setIsOpening(true)

    // Navigate after animation completes
    setTimeout(() => {
      router.push(route)
    }, 1000) // Match this with the animation duration
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-4">
        {/* Outer vault ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg border-8 border-gray-700 flex items-center justify-center overflow-hidden">
          {/* Bolts around the edge */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gray-500 rounded-full border-2 border-gray-600"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-120px)`,
                transformOrigin: "center center",
              }}
            />
          ))}

          {/* Vault door */}
          <div
            ref={doorRef}
            className={`absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-inner flex items-center justify-center transition-transform duration-1000 ${isOpening ? "scale-0" : "scale-100"}`}
          >
            {/* Door handle */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="w-10 h-2 bg-gray-500 rounded-full transform rotate-45"></div>
                <div className="w-10 h-2 bg-gray-500 rounded-full transform -rotate-45"></div>
              </div>
            </div>

            {/* Title on the door */}
            <div className="absolute bottom-12 w-full text-center">
              <h3 className="text-xl font-bold text-rose-300 cursor-pointer">{title}</h3>
            </div>
          </div>

          {/* Inner content (visible when door opens) */}
          <div
            ref={contentRef}
            className={`absolute inset-2 rounded-full bg-gradient-to-br from-rose-900/30 to-pink-900/30 flex items-center justify-center transition-opacity duration-500 ${isOpening ? "opacity-100" : "opacity-0"}`}
          >
            <div className="text-center p-4">
              <h3 className="text-xl font-bold text-rose-300 mb-2 cursor-pointer">{title}</h3>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button below the vault */}
      <Button
        onClick={handleEnter}
        variant="link"
        className="text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
        disabled={isOpening}
      >
        Enter <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

