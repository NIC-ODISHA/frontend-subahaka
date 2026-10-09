import React from "react";

export default function Test() {
  return (
    <div className="flex flex-col gap-3 p-4 h-full"
         style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <h1 className="text-white text-2xl font-bold">Test Page</h1>
      <p className="text-white text-sm">This is a test page for the frontend.</p>
    </div>
  );
}