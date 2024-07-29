"use client";
import React from 'react';
import Autoplay from "embla-carousel-autoplay"
import MotionWrap from '@/components/motion-wrap';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { testimonial } from './config';
import TestimonialCard from './Testimonial-card';


function Testimonial() {

    return (
        <>
            <h2 className="text-2xl font-bold mt-12 text-center ">Testimonials</h2>
            <MotionWrap className="w-full py-12 lg:py-16">
                <div className="px-4 md:px-6">
                    <div className="grid gap-10">
                        <div className="flex items-center justify-center overflow-hidden lg:px-12">
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 2000,
                                    }),
                                ]}
                                opts={{
                                    align: 'start'
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {testimonial.map((article, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="md:basis-1/2 lg:basis-1/3"
                                        >
                                            <div className="h-full p-1">
                                                <TestimonialCard
                                                    userName={article.userName}
                                                    userAvatar={article.userAvatar}
                                                    alt={article.alt}
                                                    testimonial={article.testimonial}
                                                    rating={article.rating}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </MotionWrap>
        </>
    );
}

export default Testimonial;