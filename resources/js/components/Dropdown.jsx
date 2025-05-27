import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Pilih role",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Sekarang value adalah objek, bukan hanya value string/number
    const selectedOption = value;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-100" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full mt-2 flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span
                    className={
                        !selectedOption ? "text-gray-500" : "text-gray-900"
                    }
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`h-5 w-5 text-gray-400 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg border border-gray-300 rounded-md max-h-60 overflow-auto">
                    <ul className="py-1">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onChange(option); // Kirim seluruh objek!
                                    setIsOpen(false);
                                }}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                                    selectedOption?.value === option.value
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-900"
                                }`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
