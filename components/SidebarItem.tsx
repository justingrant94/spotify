import { IconType } from "react-icons"
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import React from 'react';

// Define the SidebarItem component using TypeScript with the specified props
const SidebarItem: React.FC<SidebarItemProps> = ({
  // Destructure props to get specific values
  icon: Icon, // Icon is a component passed as a prop
  label,      // Label is a string for display text
  active,     // Active is a boolean indicating if the item is currently active
  href,       // Href is the link destination for the item

  // Function component body
}) => {
  // Return JSX for rendering the SidebarItem
  return (
    // Use a link (assuming it's from a library like Next.js or React Router) with specified href
    <Link
      href={href}
      // Apply dynamic classes using twMerge from Twin Macro (tailwindcss macro for Emotion)
      className={twMerge(`
        // Static classes (applied to every SidebarItem)
        flex
        flex-column
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-green-800
        transition
        text-rose-500
        py-1   
      `,
        // Dynamic class: If active is true, add 'text-white' class
        active && 'text-white'
      )}
    >
      {/* Render the passed Icon component with a fixed size of 30 */}
      <Icon size={26} />
      <p className="truncate w-100">{label}</p>

      {/* Placeholder for additional content like label (you can customize this part) */}
    </Link>
  );
};

// Export the SidebarItem component as the default export
export default SidebarItem;

