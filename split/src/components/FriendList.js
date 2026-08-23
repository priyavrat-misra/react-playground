import React from "react";

export function FriendList({ children }) {
  return (
    <ul style={{ padding: 0 }}>
      {React.Children.map(children, (child) => (
        <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "0 16px",
            border: "1px solid lightgray",
          }}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
