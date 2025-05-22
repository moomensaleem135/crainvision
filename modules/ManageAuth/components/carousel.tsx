"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
    slides: {
        title: string
        description: string
    }[]
}

export function HeroCarousel({ slides }: CarouselProps) {
    const [current, setCurrent] = useState(0)

    const next = () => {
        setCurrent((current + 1) % slides.length)
    }

    const prev = () => {
        setCurrent((current - 1 + slides.length) % slides.length)
    }

    return (
        <div className="relative w-full">
            <div className="overflow-hidden">
                <div
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${current === index ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <div className="bg-white/10 backdrop-blur-sm border-0 p-8 mx-auto w-full max-w-lg text-white">
                                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={prev}
                    className="h-8 w-8 flex items-center justify-center rounded-full text-white/70 hover:text-white"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <div className="flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 rounded-full transition-all ${index === current ? "w-6 bg-white" : "w-2 bg-white/40"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    className="h-8 w-8 flex items-center justify-center rounded-full text-white/70 hover:text-white"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}
