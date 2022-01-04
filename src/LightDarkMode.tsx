import React, { useState } from 'react';

/**
 *
 * Build a simple app that allows the user to toggle light and dark mode as a react hook.
 *
 * Components will need a useMode() hook either 'light' or 'dark' so that they can change
 * their internal CSS.
 *
 * There should also be a way to useModeToggler() which returns a function that can be used
 * to toggle light or dark mode.
 *
 * The idea is that you have a way to globally mark the theme for the entire
 * app, then a hook that can be used to change the theme.
 *
 */
export const App = () => {

    return (
        <Main />
    );

}

export type Theme = 'light' | 'dark';

export type UseThemeToggler<Theme> = (theme:Theme) => void;

export type UseTheme = () => Theme;

type useModeType<Theme> = readonly [Theme, UseThemeToggler<Theme>];

export function useMode(): useModeType<Theme> {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = (theme:Theme) => {
      if (theme === 'light') {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    };
  
    return [theme, toggleTheme]
  };

export const Main = () => {

    return (
        <div>
            <Settings />
        </div>
    );

}

export const Settings = () => {

    const [theme, toggleTheme] = useMode();

    return (
        <button onClick={()=>{toggleTheme(theme)}}>toggle light/dark mode</button>
    );

}



