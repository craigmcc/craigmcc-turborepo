"use client";

/**
 * Examples of the DaisyUI Select component.
 */

// External Modules ----------------------------------------------------------

import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { Select, SelectOption } from "@craigmcc/daisyui-components/Select";

// Public Objects ------------------------------------------------------------

export default function SelectPage() {

  const [valueBasic, setValueBasic] = useState("");
  const [valueDisabled] = useState("");

  const OPTIONS: SelectOption[] = [
    { label: "Select an option", value: ""},
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
  ];

  return (
    <main className="bg-base-100 flex flex-col w-full h-[calc(100vh-80px)] items-center justify-between p-6">
      <div className="grid grid-cols-2 w-full gap-6">
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Basic Select (Horizontal)</div>
          <Select
            label="Username:"
            name="horizontal-basic"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => {
              toast.info(`Horizontal Changed to ${e.target.value}`);
              setValueBasic(e.target.value)
            }}
            options={OPTIONS}
            value={valueBasic}
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold justify-center">Basic Select (Vertical)</div>
          <Select
            label="Basic Label:"
            name="vertical-basic"
            onBlur={() => toast.info("Vertical Blurred")}
            onChange={(e) => {
              toast.warn(`Vertical Changed to ${e.target.value}`);
              setValueBasic(e.target.value)
            }}
            options={OPTIONS}
            value={valueBasic}
            vertical
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold items-center justify-center">Disabled Select (Horizontal)</div>
          <Select
            disabled
            label="Username:"
            name="horizontal-basic"
            onBlur={() => toast.warn("Horizontal Blurred")}
            onChange={(e) => {
              toast.info(`Horizontal Changed to ${e.target.value}`);
              setValueBasic(e.target.value)
            }}
            options={OPTIONS}
            value={valueDisabled}
          />
        </div>
        <div className="bg-base-300 p-2 w-full">
          <div className="text-primary font-bold justify-center">Disabled Select (Vertical)</div>
          <Select
            disabled
            label="Basic Label:"
            name="vertical-basic"
            onBlur={() => toast.info("Vertical Blurred")}
            onChange={(e) => {
              toast.warn(`Vertical Changed to ${e.target.value}`);
              setValueBasic(e.target.value)
            }}
            options={OPTIONS}
            value={valueDisabled}
            vertical
          />
        </div>
      </div>
    </main>
  );

}
