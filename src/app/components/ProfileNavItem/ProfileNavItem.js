"use client"

import Link from "next/link";
import "./ProfileNavItem.css";
import { usePathname } from "next/navigation";

function ProfileNavItem({href,text}) {
    const pathname = usePathname()
    const isSelected = (path, href) => {
        return path == href
    }

  return (
    <li className="profile-nav_item">
      <Link id={isSelected(pathname,href)?'selected' : ''} href={href}>{text}</Link>
    </li>
  );
}

export default ProfileNavItem;
