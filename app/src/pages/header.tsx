import { googleLogout } from "@react-oauth/google";
import { memo, useState, useRef, useEffect, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "global-providers/authentication";

export default memo(function Header() {
  const { isAuthenticated, clearAuthentication } = useAuthentication();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const intl = useIntl();

  const logout = useCallback(() => {
    googleLogout();
    clearAuthentication();
    setIsDropdownOpen(false);
  }, []);

  const navigateToLogin = useCallback(() => {
    setIsDropdownOpen(false);
    navigate("/login");
  }, []);

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

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <header className="flex justify-between items-center p-4">
      {/* Graph icon in top left */}
      <button
        onClick={navigateToHome}
        className="w-10 h-10 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={intl.formatMessage({
          defaultMessage: "Home",
          description: "header home button aria-label",
        })}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      </button>

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
                onClick={navigateToLogin}
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
                  onClick={logout}
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
