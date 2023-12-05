import { FaPlay } from "react-icons/fa";
import { useState } from "react";

const PlayButton = () => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  return (
    <button
      className="
        transition-opacity
        opacity-0
        group-hover:opacity-100
        rounded-full
        flex
        items-center
        p-4
        drop-shadow-md
        translate-y-1/4
        group
        transform
        duration-300
        ease-in-out
        hover:scale-110
        hover:text-white
        hover:gradient-blue-cyan
        animate-pulsate
      "
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <FaPlay
        className={`text-${hovered ? "green" : "black"}`}
        style={{ transition: "color 0.3s" }}
      />
    </button>
  );
};

export default PlayButton;
