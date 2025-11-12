import { memo, useState, useRef, useEffect, useCallback } from "react";
import { FormattedMessage } from "react-intl";

import { useAuthentication } from "global-providers/authentication";

export default memo(function Header() {
  const { isAuthenticated } = useAuthentication();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((o) => !o);
  }, []);

  return (
    <header className="flex justify-end items-center p-4">
      <div className="relative" ref={dropdownRef}>
        {/* Avatar circle */}
        <button
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            {!isAuthenticated ? (
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  // TODO: Implement sign in/sign up
                  setIsDropdownOpen(false);
                }}
              >
                <FormattedMessage
                  defaultMessage="Sign in/Sign up"
                  description="header"
                />
              </button>
            ) : (
              <>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // TODO: Implement my allergies page
                    setIsDropdownOpen(false);
                  }}
                >
                  <FormattedMessage
                    defaultMessage="My allergies (Coming soon)"
                    description="header"
                  />
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // TODO: Implement log out
                    setIsDropdownOpen(false);
                  }}
                >
                  <FormattedMessage
                    defaultMessage="Log out"
                    description="header"
                  />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
});
