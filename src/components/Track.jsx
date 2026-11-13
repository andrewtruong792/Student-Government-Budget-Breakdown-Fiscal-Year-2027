// Track.jsx
export default function Track({ width, color, className }) {
    return (
        <div className={className ? `track ${className}` : "track"}>
            <span style={{ width, background: color }} />
        </div>
    );
}
