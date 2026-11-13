// CountUp.jsx
import { useEffect, useRef, useState } from "react";
import { money } from "../utils/budget";

const DURATION_MS = 600;

export default function CountUp({ value, format = money }) {
    const [shown, setShown] = useState(() => format(value));
    const shownRef = useRef(value);

    useEffect(() => {
        const from = shownRef.current;
        if (from === value) {
            setShown(format(value));
            return;
        }

        const start = performance.now();
        let frame;

        const tick = (now) => {
            const t = Math.min((now - start) / DURATION_MS, 1);
            shownRef.current = from + (value - from) * (1 - (1 - t) ** 3);
            setShown(format(shownRef.current));
            if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [value, format]);

    return shown;
}
