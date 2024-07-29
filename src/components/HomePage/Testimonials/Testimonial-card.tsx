import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TestimonialSchema } from '@/types/TestimonialSchema';

function TestimonialCard({
    userName,
    userAvatar,
    alt,
    testimonial,
    rating
}: TestimonialSchema) {
    const validLink = userAvatar || '/';

    return (
        <Card className={cn('h-full w-full rounded-xl', 'bg-muted/40')}>
            <div className="flex flex-col items-center p-6">
                <div className="relative h-48 w-72 overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={'/cozycoop.png'}
                        alt={alt || 'Placeholder Image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>
            <CardContent className="p-6">
                <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-gray-600">{userName}</p>
                </div>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                    {testimonial}
                </p>
            </CardContent>
            <CardFooter className="p-6">
                <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-gray-600">Rating : {rating}</p>
                </div>
            </CardFooter>

        </Card>
    );
}

export default TestimonialCard;
