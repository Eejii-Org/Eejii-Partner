import { IconPropsType } from "./index";

export const Close = ({
  width = 24,
  height = 24,
  color = "black",
}: IconPropsType) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Menu / Close_MD">
      <path
        id="Vector"
        d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
