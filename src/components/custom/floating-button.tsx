"use client";
import { ReactNode } from "react";

interface FloatingButtonSectionProps {
  children: ReactNode;
  className?: string;
}

const FloatingButtonSection = ({ children, className = "" }: FloatingButtonSectionProps) => {
  return (
    <section className={`fixed ${className}`}>
      {children}
    </section>
  );
};

export default FloatingButtonSection;