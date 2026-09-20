import React from "react";

export function MediaList({ children }) {
  return (
    <ul style={{ padding: 0 }}>
      {React.Children.map(children, (child) => (
        <li
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            padding: "8px 16px",
          }}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
