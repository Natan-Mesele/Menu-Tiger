import { useRef, useEffect, forwardRef } from "react";
import { FaTools } from "react-icons/fa";

const WifiTab = forwardRef(
  ({ currentPage, setCurrentPage, onMouseEnter, onMouseLeave }, ref) => {
    const wifiTabRef = useRef(null);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(wifiTabRef.current);
        } else {
          ref.current = wifiTabRef.current;
        }
      }
    }, [ref]);

    return (
      <button
        ref={wifiTabRef}
        className="px-6 py-4 font-medium text-sm flex-shrink-0 flex items-center text-gray-500 dark:text-gray-500 opacity-50 hover:bg-transparent cursor-default"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-haspopup="true"
        aria-expanded={currentPage === "wifi"}
      >
        <span className="mr-2 text-lg">
          <FaTools />
        </span>
        <span>WiFi</span>
      </button>
    );
  }
);

WifiTab.displayName = "WifiTab";

export default WifiTab;
