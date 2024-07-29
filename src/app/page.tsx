"use client";
import About from "@/components/HomePage/About";
import Footer from "@/components/HomePage/Footer";
import Services from "@/components/HomePage/Services";
import Testimonial from "@/components/HomePage/Testimonials/Testimonial";
import { Button } from "@/components/ui/button";
import { BookUser, PackageCheck, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-4">
        <Image
          src="/cozycoop.png"
          alt="Cozy Coop"
          width={200}
          height={200}
          className="mt-8"
        />
        <h1 className="text-5xl font-bold mt-4 animate-fade-in">
          Cozy Coop
        </h1>
        <p className="text-lg mt-2 text-center animate-fade-in">
          Conveys a sense of warmth and cooperation, fitting for a shared living space.
        </p>
        <div className="mt-6 text-center">
          <p className="text-xl mb-4 animate-fade-in">
            Register Today to use the application
          </p>
          <Button
            onClick={() => router.push("/signup")}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </Button>
        </div>
      </main>

      <About />

      <Services />

      <Testimonial />

      <Footer />
    </>
  );
}
