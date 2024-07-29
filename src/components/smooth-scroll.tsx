'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

interface LenisProps {
    children: React.ReactNode;
}

function SmoothScroll({ children }: LenisProps) {
    const lenis = useLenis(({ scroll }) => {
    });

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => {
            lenis?.stop();
            lenis?.start();
        });
    }, []);

    return (
        <ReactLenis
            root
            options={{
                duration: 2
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;