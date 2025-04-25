"use client";

/**
 * UI for switching themes in this application.
 */

// External Modules ----------------------------------------------------------

import { useContext } from "react";

// Internal Modules ----------------------------------------------------------

import { Dropdown } from "@craigmcc/daisyui-components/Dropdown";
import { ThemeContext } from "./ThemeContext";

// Private Objects -----------------------------------------------------------

// Keep this list in sync with the themes listed for the daisyUI plugin in globals.css
const THEMES = [
  "light",
  "dark",
  // "acid",
  "aqua",
  "autumn",
  // "black",
  // "bumblebee",
  "business",
  "cmyk",
  "coffee",
  "corporate",
  // "cupcake",
  // "cyberpunk",
  // "dim",
  // "dracula",
  "emerald",
  "fantasy",
  "forest",
  // "garden",
  // "halloween",
  // "lemonade",
  // "lofi",
  "luxury",
  "night",
  "nord",
  "pastel",
  "retro",
  "sunset",
  "synthwave",
  // "valentine",
  "winter",
  // "wireframe",
];

type OPTION = {
  // The label for this dropdown detail.
  label: string;
  // The theme we should switch to when this option is selected.
  theme: string;
}

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const OPTIONS: OPTION[] = [];
THEMES.forEach((option) => {
  OPTIONS.push({ label: capitalize(option), theme: option});
});

// Public Objects ------------------------------------------------------------

export const ThemeSwitcher = () => {

  const { changeTheme } = useContext(ThemeContext);

  function handleClick(detail: string) {
    const option = OPTIONS.find((option) => option.label === detail);
    if (option) {
//      console.log(`ThemeSwitcher: changing theme to: ${detail}`);
      changeTheme(option.theme);
    } else {
      console.error(`ThemeSwitcher: No option found for detail: ${detail}`);
    }
  }

  return (
    <Dropdown
      className="dropdown-end"
      classNameDetails="z-1 mt-6 shadow-sm bg-base-300 box"
      closeOnSelect={false}
      details={OPTIONS.map((option) => option.label)}
      handleClick={handleClick}
      name="theme-switcher"
      summary="Theme"
    />
  )

}
