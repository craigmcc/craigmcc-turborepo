"use client";

/**
 * Examples of the DaisyUI Input component.
 */

// External Modules ----------------------------------------------------------

import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { Input } from "@craigmcc/daisyui-components/Input";
import { Input1 } from "@craigmcc/daisyui-components/Input1";

// Public Objects ------------------------------------------------------------

export default function InputPage() {

  const [valueBasic, setValueBasic] = useState("Basic Value");
  const [valueDisabled] = useState("");

  return (
    <main className="bg-base-100 flex flex-col w-full h-[calc(100vh-80px)] items-center justify-between p-6">
      <div className="grid grid-cols-2 w-full gap-6">
        <div className="bg-base-100 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Faked Input (Horizontal)</div>
          <Input1
            label="Username:"
            name="horizontal-basic"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueBasic}
          />
        </div>
        <div className="bg-base-100 p-2 w-full">
          <div className="text-primary font-bold justify-center">Faked Input (Vertical)</div>
          <Input1
            label="Basic Label:"
            name="vertical-basic"
            onBlur={() => toast.info("Vertical Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueBasic}
            vertical
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Faked Disabled Input (Horizontal)</div>
          <Input1
            disabled
            label="Username:"
            name="horizontal-disabled"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueDisabled}
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Faked Disabled Input (Vertical)</div>
          <Input1
            disabled
            label="Username:"
            name="horizontal-disabled"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueDisabled}
            vertical
          />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-6">
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Basic Input (Horizontal)</div>
          <Input
            label="Username:"
            name="horizontal-basic"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueBasic}
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold justify-center">Basic Input (Vertical)</div>
          <Input
            label="Basic Label:"
            name="vertical-basic"
            onBlur={() => toast.info("Vertical Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueBasic}
            vertical
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Disabled Input (Horizontal)</div>
          <Input
            disabled
            label="Username:"
            name="horizontal-disabled"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueDisabled}
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold justify-center">Disabled Input (Vertical)</div>
          <Input
            disabled
            label="Basic Label:"
            name="vertical-disabled"
            onBlur={() => toast.info("Vertical Blurred")}
            onChange={(e) => setValueBasic(e.target.value)}
            placeholder="Type here"
            type="text"
            value={valueDisabled}
            vertical
          />
        </div>
      </div>
    </main>
  );
}
