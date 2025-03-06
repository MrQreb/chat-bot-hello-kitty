"use client";
import { ReactNode } from "react";

interface FloatingButtonSectionProps {
  children: ReactNode;
  bottom: string;
  right: string;
}

const FloatingButtonSection = ({ children, bottom, right }: FloatingButtonSectionProps) => {
  return (
    <section style={{ position: 'relative', bottom: bottom, right: right }}>
      {children}
    </section>
  );
};

export default FloatingButtonSection;