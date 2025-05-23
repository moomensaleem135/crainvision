"use client";
import { SetStateAction, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const carouselSlides = [
  "Enjoy peace of mind with mandatory login and session protection from the first screen.",
  "Upload a profile photo, pick your favorite layout, and switch between dark or light mode.",
  "Only see the data that matters — filtered by your assigned stores or corporate groups.",
  "Find dashboards by name or business use through a central search bar.",
];
export default function RightSide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hidden lg:block w-2/4 relative bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 overflow-hidden rounded-l-[3rem]">
      <div className="absolute inset-0 bg-[url('/svgs/bg-image.svg')] bg-cover bg-center opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-between p-12">
        <div></div>
        <Card className="bg-white/10 backdrop-blur-sm border-0 p-8 mx-auto w-full max-w-lg text-white rounded-2xl">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Powering the Future of Automotive
          </h2>
          <p className="mb-4">
            Discover breakthrough solutions with{" "}
            <span className="font-bold">CrainVision</span>, where cutting-edge
            automotive technology meets real-world application. Join us to
            accelerate innovation, streamline operations, and connect with
            industry leaders.
          </p>
        </Card>

        <div className="space-y-6">
          <div className="text-center text-white/80 h-12 relative">
            {carouselSlides.map((text, index) => (
              <p
                key={index}
                className={`transition-opacity duration-500 absolute left-0 right-0 ${currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevSlide}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${index === currentSlide
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
