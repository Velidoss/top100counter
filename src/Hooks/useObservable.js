import { useEffect, useState } from "react";

export function useObservable(observable){
    const [val, setVal] = useState(observable.get());

    useEffect(() => {
        setVal(observable.get()); // Добавление от @mayorovp
        return observable.subscribe(setVal);
    }, [observable]);

    return val;
}