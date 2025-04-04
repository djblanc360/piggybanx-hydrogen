import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Unlock, ArrowRight, PiggyBank } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import VaultDoor from "./vault-door"
import Navbar from "./navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        
      <section className="container mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-rose-300">PiggyBanx</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              You&apos;ve successfully broke into PiggyBanx and gained access to our exclusive content.
            </p>
            <div className="flex gap-4">
              <Button className="bg-rose-300 hover:bg-pink-500 text-black">
                Collector Forms <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-pink-500 text-pink-500 hover:bg-rose-400 hover:text-black"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-80 h-80 flex items-center justify-center">
              <Image 
                src="/images/piggy_front.png" 
                alt="Piggy Bank" 
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-800 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Wishing Well",
                description: "Make a wish; throw a coin; maybe your wish will be granted.",
                route: "/wishing-well",
              },
              {
                title: "Drop Site",
                description: "Learn about exclusive drops and upcoming releases.",
                route: "/drop-site",
              },
              {
                title: "Banxclibur",
                description: "Gain access to exclusive drops and special offers.",
                route: "/banxclibur",
              },
            ].map((feature, index) => (
              <VaultDoor key={index} title={feature.title} description={feature.description} route={feature.route} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-10 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Image 
                    src="/images/piggybanx_logo.png" 
                    alt="PiggyBanx" 
                    width={20}
                    height={20}
                    className="object-contain"
                />
              <span className="text-xl font-bold">PiggyBanx</span>
            </div>
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} PiggyBanx. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

