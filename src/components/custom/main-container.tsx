'use client';
import { ReactNode } from 'react';

interface MainContainerProps {
    children: ReactNode;
    className?:string;
}

const MainContainer = ({ children,className }: MainContainerProps) => {
    return (
        <main className={`w-full h-screen flex items-center justify-center bg-layout ${className}`}>
            {children}
        </main>
    );
};

export default MainContainer;