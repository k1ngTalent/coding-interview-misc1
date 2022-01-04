import React, { useEffect, useState } from 'react';

/**
 * Implement a replacement for useState which keeps values in the localStorage.
 *
 * The idea here is that all calls to use useState can be replaced with
 * useLocalStorageState(key, initialValue) and implement the same behavior.
 *
 * The first time useLocalStorageState is called the value will be initialValue
 * because nothing is stored in localStorage.
 *
 * Each time the user calls the setter (similar to useState) we need to trigger
 * component re-render and save the updated value in localStorage.
 *
 * The next time we are called we should use the value from localStorage.
 *
 * We should support the following values stored in localStorage:
 *
 * string, number, object, array
 *
 * Note that we're using GitHub gists here because there's no compiler.  Please
 * make sure your code is fully formed, no edge case, clean, etc.
 *
 * We're not worried about small issues like imports. The main issue is that the
 * code is free of bugs and high quality.
 *
 * @param key The key should be the key used by localStorage
 * @param initialValue The initial value to store for the first value.
 */

type SetLocalStorage<V> = (newValue: V) => void;
type UseLocalStorageStateTuple<V> = readonly [V, SetLocalStorage<V>];

export function useLocalStorageState<V extends string>(key: string, initialValue: V): UseLocalStorageStateTuple<V> {

    // TODO: implement this code

    const reader = () => {
        try {
          const item = window.localStorage.getItem(key)
          return item ? (jsonParser(item) as V) : initialValue
        } catch (error) {
          return initialValue
        }
      }

    const [value, setValue] = useState<V>(reader)



    const setter = React.useCallback((newValue) => {
        try {
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue))
      
            // Save state
            setValue(newValue)
      
            // We dispatch a custom event so every useLocalStorage hook are notified
            window.dispatchEvent(new Event('custom-local-storage'))
          } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
          }
    }, [value])

  

    useEffect(() => {
        setValue(reader())
      }, []);

      const handleStorageChange = () => {
        setValue(reader())
      }
    
      useEffect(()=>{
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange)
        
      },[])

    return [value, setter];

}

function jsonParser<V>(value: string | null): V | undefined {
    try {
      return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch (error) {
      return undefined
    }
  }
