"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import MintingNotification from "@/components/notification"

// Mock data for NFTs
const nfts = Array.from({ length: 18 }, (_, i) => ({
  id: (i + 1).toString().padStart(4, "0"),
  imageUrl: `/placeholder.svg?height=400&width=400&text=NFT%20${i + 1}`,
}))

export default function CollectionPage() {
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Simulate loading state when filter changes
  useEffect(() => {
    if (filter !== "all") {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [filter])

  return (
    <div className="relative min-h-screen bg-black pb-16 pt-24">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none z-0">
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={`h-${i}`} className="col-span-full h-px bg-gray-900" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={`v-${i}`} className="row-span-full w-px bg-gray-900" />
        ))}
      </div>

      <MintingNotification />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center uppercase">PIGGY BANX COLLECTION</h1>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-900 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-pink-600 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${filter === "rare" ? "bg-pink-600 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setFilter("rare")}
            >
              Rare
            </button>
            <button
              className={`px-4 py-2 rounded-md ${filter === "common" ? "bg-pink-600 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setFilter("common")}
            >
              Common
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div key={nft.id} className="bg-black border border-gray-800 overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={nft.imageUrl || "/placeholder.svg"}
                    alt={`Piggy Banx NFT #${nft.id}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3 bg-black">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-xs text-gray-400">COLLECTION</p>
                      <p className="text-sm">Piggy Banx</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">ID</p>
                      <p className="text-sm">{nft.id}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href={`/nft/${nft.id}`} className="text-xs text-pink-500 hover:text-pink-400">
                      View details
                    </Link>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-1">
                        <Image src="/placeholder.svg?height=16&width=16" alt="OpenSea" width={16} height={16} />
                      </div>
                      <Link
                        href={`https://opensea.io/assets/ethereum/0x4c933c69134edb737fe057dbd56044be9cab2d0d/${Number.parseInt(nft.id)}`}
                        target="_blank"
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        View on OpenSea
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}

