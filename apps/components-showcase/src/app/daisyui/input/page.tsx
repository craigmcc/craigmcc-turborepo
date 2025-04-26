"use client";

/**
 * Examples of the DaisyUI Input component.
 */

// External Modules ----------------------------------------------------------

import { useState } from "react";

// Internal Modules ----------------------------------------------------------

import { Input } from "@craigmcc/daisyui-components/Input";

// Public Objects ------------------------------------------------------------

export default function InputPage() {

  const [value, setValue] = useState("Example Value");

  return (
    <main className="bg-base-100 flex flex-col w-full h-[calc(100vh-80px)] items-center justify-between p-6">
      <div className="grid grid-cols-2 w-full gap-6">
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Basic Input (Horizontal)</div>
          <Input
            label="Username:"
            name="horizontal-basic"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here"
            type="text"
            value={value}
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold justify-center">Basic Input (Vertical)</div>
          <Input
            label="Basic Label:"
            name="vertical-basic"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here"
            type="text"
            value={value}
            vertical
          />
        </div>
        <div className="bg-base-300 p-2">
          Third
        </div>
        <div className="bg-base-300 p-2">
          Fourth
        </div>
      </div>
    </main>
  );
}
