"use client"

import { useState } from "react"
import LockPickingGame from "@/components/games/lockPicking"
import LandingPage from "@/components/landing"

export default function Home() {
  const [gameCompleted, setGameCompleted] = useState(false)

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {!gameCompleted ? <LockPickingGame onGameComplete={() => setGameCompleted(true)} /> : <LandingPage />}
    </main>
  )
}

