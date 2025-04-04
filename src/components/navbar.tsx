import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
    return (
              <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
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
          <nav className="hidden md:block">
            {/* <ul className="flex gap-8">
              <li>
                <a href="#features" className="hover:text-rose-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-rose-300 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-rose-300 transition-colors">
                  Contact
                </a>
              </li>
            </ul> */}
          </nav>
          <Button
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-rose-400 hover:text-black cursor-pointer"
          >
            Join Discord
          </Button>
        </div>
      </header>
    )
}
