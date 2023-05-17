"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

export const cardVariants = ["default", "borderless"] as const;
export type CardVariant = (typeof cardVariants)[number];

export const cardGlowSizes = ["small", "large"] as const;
export type CardGlowSize = (typeof cardGlowSizes)[number];

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  glowSize?: CardGlowSize;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, children, variant = "default", glowSize = "large", ...props },
    ref
  ) => (
    <>
      <article
        className={
          "bg-card-border " +
          twMerge(
            "card",
            " rounded-3xl bg-fg/10 backdrop-blur-md  shadow-slate-200",
            // Variants
            {
              default: "p-[2px] shadow-lg",
              borderless: "p-[2px] shadow-sm",
            }[variant]
          )
        }
      >
        <div
          className={
            // Glow size
            {
              small: "bg-card-small",
              large: "bg-card-large",
            }[glowSize] +
            " " +
            twMerge(
              "rounded-[1.4rem] bg-indigo-50 backdrop-blur-md",

              // Custom classes
              className
            )
          }
          {...props}
          ref={ref}
        >
          {children}
        </div>
      </article>
    </>
  )
);
Card.displayName = "Card";
export default Card;
