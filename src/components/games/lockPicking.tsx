"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

interface LockPickingGameProps {
  onGameComplete: () => void
}

export default function LockPickingGame({ onGameComplete }: LockPickingGameProps) {
  // Game state
  const [numPins, setNumPins] = useState(5)
  const [gameState, setGameState] = useState<"playing" | "success" | "failed">("playing")
  const [pinRotation, setPinRotation] = useState(0)
  const [cylRotation, setCylRotation] = useState(0)
  const [lastMousePos, setLastMousePos] = useState(0)
  const [pinHealth, setPinHealth] = useState(100)
  const [userPushingCyl, setUserPushingCyl] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [message, setMessage] = useState("")
  const [isDraggingPin, setIsDraggingPin] = useState(false)

  // Constants
  const minRot = -90
  const maxRot = 90
  const solveDeg = useRef(Math.floor(Math.random() * 180) - 90) // Random angle between -90 and 90
  const solvePadding = 6 //4
  const maxDistFromSolve = 45
  const mouseSmoothing = 2
  const cylRotSpeed = 3
  const pinDamage = 5 //20
  const pinDamageInterval = 150

  // Refs
  const pinRef = useRef<HTMLDivElement>(null)
  const cylRef = useRef<HTMLDivElement>(null)
  const driverRef = useRef<HTMLDivElement>(null)
  const cylRotationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pinLastDamagedRef = useRef<number | null>(null)

  // Mouse movement handler for pin rotation - only when dragging the pin
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingPin && lastMousePos && !gameState.includes("failed") && !gamePaused) {
        const pinRotChange = (e.clientX - lastMousePos) / mouseSmoothing
        const newPinRot = Math.min(Math.max(pinRotation + pinRotChange, minRot), maxRot)
        setPinRotation(newPinRot)
      }
      setLastMousePos(e.clientX)
    }

    const handleMouseUp = () => {
      setIsDraggingPin(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [lastMousePos, pinRotation, gameState, gamePaused, isDraggingPin])

  // Keyboard controls for cylinder rotation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // WASD or arrow keys
      if (
        (e.keyCode === 87 ||
          e.keyCode === 65 ||
          e.keyCode === 83 ||
          e.keyCode === 68 ||
          e.keyCode === 37 ||
          e.keyCode === 39) &&
        !userPushingCyl &&
        !gameState.includes("failed") &&
        !gamePaused
      ) {
        pushCyl()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        (e.keyCode === 87 ||
          e.keyCode === 65 ||
          e.keyCode === 83 ||
          e.keyCode === 68 ||
          e.keyCode === 37 ||
          e.keyCode === 39) &&
        !gameState.includes("failed")
      ) {
        unpushCyl()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [userPushingCyl, gameState, gamePaused])

  // Start dragging the pin
  const handlePinMouseDown = (e: React.MouseEvent) => {
    if (!gameState.includes("failed") && !gamePaused) {
      setIsDraggingPin(true)
      setLastMousePos(e.clientX)
    }
  }

  // Push cylinder function
  const pushCyl = () => {
    if (cylRotationIntervalRef.current) {
      clearInterval(cylRotationIntervalRef.current)
    }

    setUserPushingCyl(true)

    // Calculate how far the cylinder can rotate based on pin position
    const distFromSolve = Math.abs(pinRotation - solveDeg.current) - solvePadding
    const clampedDistFromSolve = Math.min(Math.max(distFromSolve, 0), maxDistFromSolve)

    // Convert to a percentage (closer to solve = more rotation allowed)
    const cylRotationAllowance = convertRanges(clampedDistFromSolve, 0, maxDistFromSolve, 1, 0.22) * maxRot

    cylRotationIntervalRef.current = setInterval(() => {
      setCylRotation((prevRot) => {
        const newRot = prevRot + cylRotSpeed

        // Check if we've solved the lock
        if (newRot >= maxRot) {
          if (cylRotationIntervalRef.current) {
            clearInterval(cylRotationIntervalRef.current)
          }
          unlock()
          return maxRot
        }
        // Check if we've hit the rotation limit
        else if (newRot >= cylRotationAllowance) {
          damagePin()
          return cylRotationAllowance
        }

        return newRot
      })
    }, 25)
  }

  // Release cylinder function
  const unpushCyl = () => {
    setUserPushingCyl(false)

    if (cylRotationIntervalRef.current) {
      clearInterval(cylRotationIntervalRef.current)
    }

    cylRotationIntervalRef.current = setInterval(() => {
      setCylRotation((prevRot) => {
        const newRot = prevRot - cylRotSpeed

        if (newRot <= 0) {
          if (cylRotationIntervalRef.current) {
            clearInterval(cylRotationIntervalRef.current)
          }
          return 0
        }

        return newRot
      })
    }, 25)
  }

  // Damage pin function
  const damagePin = () => {
    if (!pinLastDamagedRef.current || Date.now() - pinLastDamagedRef.current > pinDamageInterval) {
      pinLastDamagedRef.current = Date.now()

      // Animate pin damage
      if (pinRef.current) {
        pinRef.current.style.transition = `transform ${pinDamageInterval / 4}ms`
        pinRef.current.style.transform = `rotateZ(${pinRotation - 2}deg)`

        setTimeout(() => {
          if (pinRef.current) {
            pinRef.current.style.transform = `rotateZ(${pinRotation}deg)`
          }
        }, pinDamageInterval / 4)
      }

      // Reduce pin health
      setPinHealth((prevHealth) => {
        const newHealth = prevHealth - pinDamage
        if (newHealth <= 0) {
          breakPin()
        }
        return newHealth
      })
    }
  }

  // Break pin function
  const breakPin = () => {
    setGamePaused(true)

    if (cylRotationIntervalRef.current) {
      clearInterval(cylRotationIntervalRef.current)
    }

    // Animate pin breaking
    const pinTopEl = document.querySelector(".pin-top") as HTMLElement
    const pinBottEl = document.querySelector(".pin-bott") as HTMLElement

    if (pinTopEl) {
      pinTopEl.style.transition = "transform 0.7s, opacity 0.7s"
      pinTopEl.style.transform = "rotateZ(-400deg) translate(-200px, -100px)"
      pinTopEl.style.opacity = "0"
    }

    if (pinBottEl) {
      pinBottEl.style.transition = "transform 0.7s, opacity 0.7s"
      pinBottEl.style.transform = "rotateZ(400deg) translate(200px, 100px)"
      pinBottEl.style.opacity = "0"
    }

    // Decrease the pin count
    const remainingPins = numPins - 1
    setNumPins(remainingPins)

    // Check if we have pins left
    setTimeout(() => {
      if (remainingPins > 0) {
        resetPin()
      } else {
        outOfPins()
      }
    }, 700)
  }

  // Reset pin function
  const resetPin = () => {
    solveDeg.current = Math.floor(Math.random() * 180) - 90
    setCylRotation(0)
    setPinHealth(100)
    setPinRotation(0)
    setGamePaused(false)

    // Reset pin animation
    const pinTopEl = document.querySelector(".pin-top") as HTMLElement
    const pinBottEl = document.querySelector(".pin-bott") as HTMLElement

    if (pinTopEl) {
      pinTopEl.style.transition = "none"
      pinTopEl.style.transform = "rotateZ(0) translate(0, 0)"
      pinTopEl.style.opacity = "1"
    }

    if (pinBottEl) {
      pinBottEl.style.transition = "none"
      pinBottEl.style.transform = "rotateZ(0) translate(0, 0)"
      pinBottEl.style.opacity = "1"
    }
  }

  // Out of pins function
  const outOfPins = () => {
    setGameState("failed")
    setMessage("You've run out of bobby pins! The lock is now jammed.")
  }

  // Unlock function
  const unlock = () => {
    setGameState("success")
    setMessage("Congratulations! You've picked the lock!")

    // Complete the game after a delay
    setTimeout(() => {
      onGameComplete()
    }, 2000)
  }

  // Reset game function
  const resetGame = () => {
    setNumPins(5)
    setGameState("playing")
    setPinRotation(0)
    setCylRotation(0)
    setPinHealth(100)
    setMessage("")
    setGamePaused(false)
    solveDeg.current = Math.floor(Math.random() * 180) - 90

    // Reset pin animation
    const pinTopEl = document.querySelector(".pin-top") as HTMLElement
    const pinBottEl = document.querySelector(".pin-bott") as HTMLElement

    if (pinTopEl) {
      pinTopEl.style.transition = "none"
      pinTopEl.style.transform = "rotateZ(0) translate(0, 0)"
      pinTopEl.style.opacity = "1"
    }

    if (pinBottEl) {
      pinBottEl.style.transition = "none"
      pinBottEl.style.transform = "rotateZ(0) translate(0, 0)"
      pinBottEl.style.opacity = "1"
    }
  }

  // Utility function to convert ranges
  const convertRanges = (oldValue: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => {
    return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-rose-300 pb-4">PiggyBanx is locked shut!</CardTitle>
          <CardDescription className="text-gray-300 mt-2 m-auto max-w-lg">
            Click and drag the pick to rotate it. Press WASD or arrow keys to turn the lock. Find the sweet spot to
            unlock. You have {numPins} {numPins === 1 ? "bobby pin" : "bobby pins"} remaining.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center">
            {gameState === "failed" && (
              <Alert variant="destructive" className="mb-6 ">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Game Over</AlertTitle>
                <AlertDescription className="">{message}</AlertDescription>
              </Alert>
            )}

            <div className="relative w-80 h-80 mb-8">
              {/* Lock collar (background) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/piggy_front.png"
                  alt="Lock Collar"
                  width={400}
                  height={400}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Cylinder */}
              <div
                ref={cylRef}
                className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-gray-700 border-4 border-gray-600"
                style={{
                  transform: `rotateZ(${cylRotation}deg)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div className="absolute top-1/2 left-1/2 w-10 h-1 -ml-5 -mt-0.5 bg-gray-500 rounded"></div>
              </div>

              {/* Driver */}
              <div
                ref={driverRef}
                className="absolute top-1/2 left-1/2 w-40 h-4 -ml-5 -mt-2 origin-left"
                style={{
                  transform: `rotateZ(${cylRotation}deg)`,
                  transformOrigin: "left center",
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div className="w-full h-full flex">
                  <div className="w-10 h-4 bg-pink-400 rounded-l-full"></div>
                  <div className="flex-grow h-4 bg-rose-300"></div>
                </div>
              </div>

              {/* Pin */}
              <div
                ref={pinRef}
                className={`absolute top-1/2 left-1/2 w-2 h-32 -ml-1 -mt-32 origin-bottom ${!gameState.includes("failed") && !gamePaused ? "cursor-grab" : ""} ${isDraggingPin ? "cursor-grabbing" : ""}`}
                style={{
                  transform: `rotateZ(${pinRotation}deg)`,
                  transformOrigin: "bottom center",
                }}
                onMouseDown={handlePinMouseDown}
              >
                <div className="pin-top w-full h-1/2 bg-rose-300 rounded-t-sm"></div>
                <div className="pin-bott w-full h-1/2 bg-pink-400 rounded-b-sm"></div>
              </div>

              {/* Make the pin easier to grab with a larger hit area */}
              <div
                className={`absolute top-1/2 left-1/2 w-8 h-32 -ml-4 -mt-32 origin-bottom ${!gameState.includes("failed") && !gamePaused ? "cursor-grab" : ""} ${isDraggingPin ? "cursor-grabbing" : ""} opacity-0`}
                style={{
                  transform: `rotateZ(${pinRotation}deg)`,
                  transformOrigin: "bottom center",
                }}
                onMouseDown={handlePinMouseDown}
              ></div>
            </div>

            <div className="text-center mb-4">
              <p className="text-lg font-medium mb-2 text-gray-300">{message || "Find the correct position to pick the lock"}</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-300" style={{ width: `${pinHealth}%` }}></div>
                </div>
                <span className="text-rose-300 font-bold">{numPins}</span>
                <span className="text-gray-400">pins left</span>
              </div>
            </div>

          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          {gameState === "failed" && (
            <Button onClick={resetGame} className="bg-pink-400 hover:bg-pink-500 text-black cursor-pointer">
              Try Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

