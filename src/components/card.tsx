import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CardProps {
  id: string
  imageUrl: string
}

export default function Card({ id, imageUrl }: CardProps) {
  return (
    <div className="bg-black border border-gray-800 overflow-hidden">
      <div className="aspect-square relative">
        <Image src={imageUrl || "/placeholder.svg"} alt={`Piggy Banx NFT #${id}`} fill className="object-cover" />
      </div>

      <div className="p-3 bg-black">
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-xs text-gray-400">COLLECTION</p>
            <p className="text-sm">Piggy Banx</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">ID</p>
            <p className="text-sm">{id.padStart(4, "0")}</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full text-xs border-gray-700 hover:bg-gray-800">
          VIEW ON OPENSEA
        </Button>
      </div>
    </div>
  )
}

