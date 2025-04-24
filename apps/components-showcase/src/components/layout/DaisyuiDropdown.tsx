"use client";

/**
 * Dropdown for the DaisyUI component showcase.
 */

// External Modules ----------------------------------------------------------

import { useRouter } from "next/navigation";

// Internal Modules ----------------------------------------------------------

import { Dropdown } from "@craigmcc/daisyui-components/Dropdown";

// Private Objects -----------------------------------------------------------

type OPTION = {
  // The label for this dropdown detail.
  label: string;
  // The corresponding for this dropdown detail.
  href: string;
}

const OPTIONS: OPTION[] = [
  { label: "Checkbox", href: "/daisyui/checkbox" },
  { label: "Input", href: "/daisyui/input" },
  { label: "Select", href: "/daisyui/select" },
  { label: "Textarea", href: "/daisyui/textarea" },
];

const DETAILS: string[] = [];
OPTIONS.forEach((option) => {
  DETAILS.push(option.label);
});

// Public Objects ------------------------------------------------------------

export type DaisyuiDropdownProps = {
  // Optional CSS classes to apply to the dropdown summary.
  className?: string;
}

export function DaisyuiDropdown({ className }: DaisyuiDropdownProps) {

  const router = useRouter();

  function handleClick(detail: string) {
    const option = OPTIONS.find((option) => option.label === detail);
    if (option) {
      console.log(`Navigating for option: ${detail}`);
      router.push(option.href);
    } else {
      console.error(`No option found for detail: ${detail}`);
    }
  }

  return (
    <Dropdown
      className={className ? className : ""}
      classNameDetails="z-1 mt-6 shadow-sm bg-base-300 box"
      details={DETAILS}
      handleClick={handleClick}
      name="daisyui-dropdown"
      summary="DaisyUI Components"
    />
  );

}
