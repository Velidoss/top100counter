import { useEffect, useState } from "react";

export function useObservable(observable){
    const [val, setVal] = useState(observable.get());

    useEffect(() => {
        setVal(observable.get()); 
        return observable.subscribe(setVal);
    }, [observable]);

    return val;

}