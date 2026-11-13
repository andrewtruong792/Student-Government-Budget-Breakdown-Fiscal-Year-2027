// PillToggle.jsx
export default function PillToggle({ options, value, onChange, className }) {
    return (
        <div className={className}>
            {options.map((option) => (
                <button
                    key={option.id}
                    className={option.id === value ? "pill pill--active" : "pill pill--quiet"}
                    onClick={() => onChange(option.id)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
