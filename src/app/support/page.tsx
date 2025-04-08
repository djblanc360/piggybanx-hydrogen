import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={`h-${i}`} className="col-span-full h-px bg-gray-900" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={`v-${i}`} className="row-span-full w-px bg-gray-900" />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">COLLECTOR FORMS</h1>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-gray-300">Have questions about Piggy Banx? We're here to help!</p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 bg-transparent border border-gray-700 rounded-md"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2 bg-transparent border border-gray-700 rounded-md"
                placeholder="How can we help you?"
              />
            </div>

            <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white">
              SEND MESSAGE
            </Button>
          </form>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Join Our Community</h2>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-gray-700">
              Discord
            </Button>
            <Button variant="outline" className="border-gray-700">
              Twitter
            </Button>
            <Button variant="outline" className="border-gray-700">
              OpenSea
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

