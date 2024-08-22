import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, SetValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            return typeof initialValue === 'function' ? (initialValue as () => T) : initialValue
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key]);

    return [value, SetValue] as [T, typeof SetValue]
}