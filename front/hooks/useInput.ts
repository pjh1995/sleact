import { useState, useCallback, Dispatch, SetStateAction } from "react";
type ReturnTypes<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
    const [value, setValue] = useState(initialData);
    const onChangeValue = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, onChangeValue, setValue]
}

export default useInput