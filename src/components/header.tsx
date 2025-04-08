"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <div className="">
        <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-1">
                <Image 
                    src="/images/piggybanx_logo.png" 
                    alt="PiggyBanx" 
                    width={20}
                    height={20}
                    className="object-contain"
                />
                <span className="text-xl font-bold">PiggyBanx</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/banxcalibur" className="uppercase tracking-wider hover:text-pink-500 transition-colors">
              Banxcalibur
            </Link>
            <Link href="/collection" className="uppercase tracking-wider hover:text-pink-500 transition-colors">
              Collection
            </Link>
            <Link href="/drop-site" target="_blank" className="uppercase tracking-wider hover:text-pink-500 transition-colors">
            Drop Site
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800 absolute w-full">
          <div className="px-6 py-8">
            <nav className="flex flex-col space-y-6">
              <Link
                href="/"
                className="text-xl uppercase tracking-wider hover:text-pink-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/collection"
                className="text-xl uppercase tracking-wider hover:text-pink-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Collection
              </Link>
              <Link
                href="/support"
                className="text-xl uppercase tracking-wider hover:text-pink-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Drop Site
              </Link>
            </nav>

          </div>
        </div>
      )}
    </header>
  )
}

