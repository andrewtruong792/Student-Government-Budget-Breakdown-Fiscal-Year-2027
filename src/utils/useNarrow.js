// useNarrow.js
import { useEffect, useState } from "react";

const query = "(max-width: 600px)";

export default function useNarrow() {
    const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const update = () => setNarrow(media.matches);
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return narrow;
}
