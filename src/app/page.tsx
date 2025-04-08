"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MintingNotification from "@/components/notification"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const nftListRef = useRef<HTMLDivElement>(null)
  const announcementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Animate NFT list scrolling
    const nftListInterval = setInterval(() => {
      if (nftListRef.current) {
        const currentTransform = nftListRef.current.style.transform || "translateX(0px)"
        const currentX = Number.parseFloat(currentTransform.replace(/translateX$$(.*)vw$$.*/, "$1"))
        const newX = currentX <= -100 ? 0 : currentX - 0.1
        nftListRef.current.style.transform = `translateX(${newX}vw)`
      }
    }, 20)

    // Animate announcement banner
    const announcementInterval = setInterval(() => {
      if (announcementRef.current) {
        const currentTransform = announcementRef.current.style.transform || "translateX(0px)"
        const currentX = Number.parseFloat(currentTransform.replace(/translateX$$(.*)vw$$.*/, "$1"))
        const newX = currentX <= -50 ? 0 : currentX - 0.05
        announcementRef.current.style.transform = `translateX(${newX}vw)`
      }
    }, 30)

    return () => {
      clearInterval(nftListInterval)
      clearInterval(announcementInterval)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none z-0">
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={`h-${i}`} className="col-span-full h-px bg-gray-900 border-2 border-gray-800" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={`v-${i}`} className="row-span-full w-px bg-gray-900 border-2 border-gray-800" />
        ))}
      </div>

      <MintingNotification />

      {/* Hero Parallax Section */}
      <div ref={parallaxRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>

        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/images/piggybanx_landing_2.png"
            alt="Background Sky"
            fill
            className="object-cover"
            priority
          />
        </div>


        {/* <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateX(${-scrollY * 0.3}px) translateY(${-scrollY * 0.01}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image src="/placeholder.svg?height=1920&width=1920" alt="Train" fill className="object-cover" priority />
        </div> */}

        <div
          className="absolute -bottom-12 inset-0 left-0"
          style={{
            transform: `translateY(${-scrollY * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/images/buildings-front_no_bg.png"
            alt="Pig Character"
            fill
            className="object-bottom object-scale-down"
            priority
          />
        </div>

        
      </div>

      {/* Main Content Section */}
      <section className="relative py-16 bg-black bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'url("/images/background_1.png")' }}>
        <div className="container mx-auto px-8 bg-black/90 shadow-[0_0_15px_rgba(0,0,0,0.7)] rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col justify-center">
            <div className="bg-black p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">PIGGYBANX</h2>
              <h3 className="text-xl md:text-2xl mb-4 text-gray-300">
              Your gateway into a collector&apos;s club like no other—different from anything that has come before. Don&apos;t call them cards; these artworks are handcrafted, often imitated but never replicated. PiggyBanx is all about limited, hard-to-find collectibles that stand out from the crowd, designed for serious collectors who value art.
              </h3>
              <p className="text-gray-400 mb-8">
              As a PiggyBanx collector, you&apos;sre not just acquiring art—you&apos;sre entering an elite space where passion and creativity come together. Each GOOD 2 = Handmade piece is part of a unique drop, curated for those who understand that the best art can&apos;st be mass-produced. Join PiggyBanx and secure your place in a world where rare, collectible art is more than just a status symbol—it&apos;s a reflection of who you are.
              </p>
              </div>
              <div className="bg-black py-16">
                <div className="container mx-auto px-4">
                  <Link href="#" target="_blank" className="block group">
                    <h2 className="text-4xl md:text-5xl font-bold text-center group-hover:text-pink-500 transition-colors">
                      Collector Forms{" "}
                      <span className="inline-block transform group-hover:translate-x-2 transition-transform">→</span>
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image src="/images/card_1.png" alt="Robot Pig" fill className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none z-0">
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={`h-${i}`} className="col-span-full h-px bg-gray-900" />
                    ))}
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={`v-${i}`} className="row-span-full w-px bg-gray-900" />
                    ))}
                  </div>
                  <Image
                    src="/images/card_1.png"
                    alt="Pig Variation 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none z-0">
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={`h-${i}`} className="col-span-full h-px bg-gray-900" />
                    ))}
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={`v-${i}`} className="row-span-full w-px bg-gray-900" />
                    ))}
                  </div>
                  <Image
                    src="/images/card_1.png"
                    alt="Pig Variation 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* NFT Showcase */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Showcase</h3>
              <Link href="/collection" className="text-pink-500 hover:text-pink-400">
                View All
              </Link>
            </div>
            <div className="relative overflow-hidden">
              <div ref={nftListRef} className="flex space-x-4 py-4" style={{ transform: "translateX(0vw)" }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="relative flex-shrink-0 w-64 bg-gray-900 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={`/images/card_1.png`}
                        alt={`NFT #${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-xs text-gray-500">COLLECTION</div>
                          <div className="text-sm">Piggy Banx</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">ID</div>
                          <div className="text-sm">#{(i + 130).toString().padStart(4, "0")}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href={`/nft/${i + 130}`} className="text-xs text-pink-500 hover:text-pink-400">
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Images */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="relative aspect-video overflow-hidden rounded-lg transform hover:scale-[1.02] transition-transform">
              <Image src="/placeholder.svg?height=400&width=600" alt="Robot Lab Window" fill className="object-cover" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg transform hover:scale-[1.02] transition-transform">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Broken Vault Exit"
                fill
                className="object-cover"
              />
            </div>
          </div> */}

          {/* Character Stats */}
          {/* <div className="bg-gray-900 p-6 rounded-lg mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Character Sketches"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Mods</div>
                    <div className="text-xl font-bold">20</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Accessories</div>
                    <div className="text-xl font-bold">88</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Wings</div>
                    <div className="text-xl font-bold">23</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Backgrounds</div>
                    <div className="text-xl font-bold">71</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Expressions</div>
                    <div className="text-xl font-bold">08</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Colorways</div>
                    <div className="text-xl font-bold">43</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Total Supply</div>
                    <div className="text-xl font-bold">2,222</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Total Possible</div>
                    <div className="text-xl font-bold">1.6 B</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Mint Limit</div>
                    <div className="text-xl font-bold">03</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Mint Price</div>
                    <div className="text-xl font-bold">0.022</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <div className="text-xs uppercase text-gray-400">Contract</div>
                    <div className="text-xl font-bold">ERC-721</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
                  <Image src="/placeholder.svg?height=300&width=300" alt="Pig Showcase" fill className="object-cover" />
                </div>

                <Button size="lg" className="mt-4 bg-pink-600 hover:bg-pink-700 text-white">
                  Mint Your Piggy Banx
                </Button>
              </div>
            </div>
          </div> */}

        </div>
      </section>

      {/* Second Parallax Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateX(${-scrollY * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image src="/images/footer_sky.png" alt="Background Sky" fill className="object-cover" />
        </div>

        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateX(${-scrollY * 0.05}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image src="/images/footer_clouds.png" alt="Clouds" fill className="object-cover" />
        </div>

        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateX(${scrollY * 0.01}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image src="/images/footer_buildings.png" alt="Buildings" fill className="object-cover" />
        </div>

        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateX(${scrollY * 0.03}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image src="/images/footer_pigs.png" alt="Pigs" fill className="object-cover" />
        </div>
      </div>

      {/* Footer CTA */}
    </div>
  )
}

