import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"


export default function Sidebar() {

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <div className="fixed top-0 right-0 h-full w-[0.68em] bg-gray-800">
        <div
          className="side_bar-fill"
          style={{
            height: `${scrollProgress}%`,
            backgroundColor: "#d8ff00",
            width: "100%",
            transition: "height 0.2s ease",
          }}
        />
                  <div className="hidden md:flex md:flex-col items-center space-x-4">
            <Link
              href="https://twitter.com/piggybanxnft/"
              target="_blank"
              className="transform hover:scale-110 transition-transform"
            >
              <Image src="/placeholder.svg?height=24&width=24" alt="Twitter" width={24} height={24} />
            </Link>
            <Link
              href="https://instagram.com/piggybanxnft/"
              target="_blank"
              className="transform hover:scale-110 transition-transform"
            >
              <Image src="/placeholder.svg?height=24&width=24" alt="Instagram" width={24} height={24} />
            </Link>
            <Link
              href="https://opensea.io/collection/piggybanxnft"
              target="_blank"
              className="transform hover:scale-110 transition-transform"
            >
              <Image src="/placeholder.svg?height=24&width=24" alt="OpenSea" width={24} height={24} />
            </Link>
            <Link
              href="https://discord.gg/piggybanxnft"
              target="_blank"
              className="transform hover:scale-110 transition-transform"
            >
              <Image src="/placeholder.svg?height=24&width=24" alt="Discord" width={24} height={24} />
            </Link>
          </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex justify-center space-x-6">
                <Link
                  href="https://twitter.com/piggybanxnft/"
                  target="_blank"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image src="/placeholder.svg?height=32&width=32" alt="Twitter" width={32} height={32} />
                </Link>
                <Link
                  href="https://instagram.com/piggybanxnft/"
                  target="_blank"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image src="/placeholder.svg?height=32&width=32" alt="Instagram" width={32} height={32} />
                </Link>
                <Link
                  href="https://opensea.io/collection/piggybanxnft"
                  target="_blank"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image src="/placeholder.svg?height=32&width=32" alt="OpenSea" width={32} height={32} />
                </Link>
                <Link
                  href="https://discord.gg/piggybanxnft"
                  target="_blank"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image src="/placeholder.svg?height=32&width=32" alt="Discord" width={32} height={32} />
                </Link>
              </div>

              <div className="mt-8 bg-pink-600 p-4 rounded-lg">
                <div className="relative overflow-hidden">
                  <div className="whitespace-nowrap animate-marquee">
                    NOW MINTING NOW MINTING NOW MINTING NOW MINTING
                  </div>
                </div>
                <Link
                  href="https://go.piggybanx.io"
                  target="_blank"
                  className="block text-center text-white font-bold mt-4 hover:text-black hover:bg-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  VISIT MINT PAGE
                </Link>
              </div>
            </div>
    </div>
  )
}
