import Navbar from "@/components/navbar";

export default function WishingWellPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-rose-300">Wishing Well</h1>
          <p className="text-xl">Make a wish and throw a coin...</p>
        </div>
      </div>
    </div>
  )
}

