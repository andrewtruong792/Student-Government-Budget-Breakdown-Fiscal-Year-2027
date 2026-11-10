// CountUp.jsx
import { useEffect, useRef, useState } from "react";
import { money } from "../utils/budget";

export default function CountUp({ value, format = money }) {
    const [shown, setShown] = useState(value);
    const current = useRef(value);

    useEffect(() => {
        const from = current.current;
        const start = performance.now();
        let frame;

        const tick = (now) => {
            const t = Math.min((now - start) / 600, 1);
            current.current = from + (value - from) * (1 - (1 - t) ** 3);
            setShown(current.current);
            if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [value]);

    return format(shown);
}
