"use client";

/**
 * Generic dropdown component.
 */

// External Modules ----------------------------------------------------------

//import { ArrowDown, ArrowUp } from "lucide-react";
import {useEffect, useRef, useState} from "react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type DropdownProps = {
  // Optional CSS classes to apply to the dropdown summary.
  className?: string;
  // Optional CSS classes to apply to the dropdown details
  classNameDetails?: string;
  // The options for the dropdown details.  These should be unique
  details: string[];
  // Function to handle click events on a specific dropdown detail.
  handleClick: (detail: string) => void;
  // HTML id of the dropdown summary.
  name?: string;
  // The label for the dropdown summary.
  summary: string;
}

export function Dropdown({
                           className,
                           classNameDetails,
                           details,
                           handleClick,
                           name,
                           summary,
                         }: DropdownProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [isOpen]);

  return (
    <details
      className={`dropdown dropdown-end ${className ? className : ""}`}
      open={isOpen}
      ref={dropdownRef}
    >
      <summary
        className="btn btn-ghost"
        id={name ? name : undefined}
        onClick={() => setIsOpen(!isOpen)}
      >
        {summary}
      </summary>
      <ul
        className={`menu dropdown-content ${classNameDetails ? classNameDetails : ""}`}
        tabIndex={0}
      >
        {details.map((detail, index) => (
          <li key={index}>
            <button
              className="btn btn-ghost"
              onClick={() => {
                handleClick(detail);
                setIsOpen(false);
              }}
              type="button"
            >
              {detail}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );

}
