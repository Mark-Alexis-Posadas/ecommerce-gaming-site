import React from "react";

export default function PageTitle({ children }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
      {children}
    </h2>
  );
}
