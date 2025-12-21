"use client";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  borderColor?: string;
  fillColor?: string;
  textColor?: string;
  glowColor?: string;
  strokeWidth?: number;
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  borderColor = "#00FFFF",
  fillColor = "rgba(0, 40, 40, 0.9)",
  textColor = "white",
  glowColor,
  strokeWidth = 2,
  size = "md",
  width,
  height,
  fullWidth = false,
  onClick,
  disabled,
}) => {
  const sizes = {
    sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
    md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
    lg: { padding: "1rem 2rem", fontSize: "1.125rem" },
  };

  const clipPath =
    "polygon(5% 0%, 100% 0%, 100% 75%, 95% 100%, 0% 100%, 0% 20%)";

  const format = (v?: string | number) =>
    typeof v === "number" ? `${v}px` : v;

  const computedFontSize = height
    ? `calc(${format(height)} * 0.40)`
    : sizes[size].fontSize;

  const glow = disabled
    ? "none"
    : `drop-shadow(0 0 6px ${glowColor || borderColor})
       drop-shadow(0 0 14px ${glowColor || borderColor})
       drop-shadow(0 0 24px ${glowColor || borderColor})`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: "relative",
        padding: 0,
        border: "none",
        background: "none",
        width: fullWidth ? "100%" : undefined,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >

      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          clipPath,
          background: borderColor,
          filter: glow,
        }}
      />

      
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: format(width) || (fullWidth ? "100%" : undefined),
          height: format(height),
          padding: height ? 0 : sizes[size].padding,
          fontSize: computedFontSize,
          lineHeight: 1,
          color: textColor,
          background: fillColor,
          clipPath,
          margin: strokeWidth,
          zIndex: 1,
          whiteSpace: "nowrap",
        }}
      >
        {text || children}
      </span>
    </button>
  );
};

export default Button;
