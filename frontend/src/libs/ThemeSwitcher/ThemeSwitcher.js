import { useEffect, useState } from "react";

const THEMES = [
    { key: "light", label: "Light", swatch: "#f4f6fb" },
    { key: "dark", label: "Dark", swatch: "#12161f" },
    { key: "ocean", label: "Ocean", swatch: "#0f3d55" }
];

export default function ThemeSwitcher({ onSelect }) {
    const [active, setActive] = useState(() => localStorage.getItem("appTheme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", active);
    }, [active]);

    const selectTheme = (themeKey) => {
        setActive(themeKey);
        localStorage.setItem("appTheme", themeKey);
        if (onSelect) onSelect(themeKey);
    };

    return (
        <div className="theme-switcher">
            {THEMES.map((t) => (
                <button
                    key={t.key}
                    className={`theme-dot ${active === t.key ? "theme-dot-active" : ""}`}
                    style={{ backgroundColor: t.swatch }}
                    title={t.label}
                    onClick={() => selectTheme(t.key)}
                />
            ))}
        </div>
    );
}
