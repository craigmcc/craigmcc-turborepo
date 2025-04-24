"use client";

/**
 * Dropdown for the Tanstack Form component showcase.
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
  { label: "Checkbox", href: "/tanstack/checkbox" },
  { label: "Input", href: "/tanstack/input" },
  { label: "Select", href: "/tanstack/select" },
  { label: "Textarea", href: "/tanstack/textarea" },
];

const DETAILS: string[] = [];
OPTIONS.forEach((option) => {
  DETAILS.push(option.label);
});

// Public Objects ------------------------------------------------------------

export type TanstackDropdownProps = {
  // Optional CSS classes to apply to the dropdown summary.
  className?: string;
}

export function TanstackDropdown({ className }: TanstackDropdownProps) {

  const router = useRouter();

  function handleClick(detail: string) {
    const option = OPTIONS.find((option) => option.label === detail);
    if (option) {
      console.log(`TanstackDropdown: navigating for option: ${detail}`);
      router.push(option.href);
    } else {
      console.error(`TantstackDropdown: No option found for detail: ${detail}`);
    }
  }

  return (
    <Dropdown
      className={className ? className : ""}
      classNameDetails="z-1 mt-6 shadow-sm bg-base-300 box"
      details={DETAILS}
      handleClick={handleClick}
      name="tanstack-dropdown"
      summary="Tanstack Form Components"
    />
  );

}
