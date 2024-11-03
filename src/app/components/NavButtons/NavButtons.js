"use client";

import Link from "next/link";
import "./NavButtons.css";
import { usePathname } from "next/navigation";

function NavButtons({ svg, text, href, count }) {
  const pathname = usePathname();
  const isSelected = (path, href) => {
    return path == href;
  };

  return (
    <Link href={href} className="nav-button">
      <span className={isSelected(pathname, href) ? "selected" : ""}>
        {svg}
      </span>

      <p
        style={
          isSelected(pathname, href) ? { color: "#53c95a" } : { color: "#333" }
        }
      >
        {text}
      </p>
      {count ? <div className="count-icon">{count}</div> : <></>}
    </Link>
  );
}

export default NavButtons;
