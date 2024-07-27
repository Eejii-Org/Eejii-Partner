import { IconPropsType } from "./index";

export const BookOpenIcon = ({
  width = 24,
  height = 24,
  color = "black",
}: IconPropsType) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 11C16 9.93913 16.4214 8.92172 17.1716 8.17157C17.9217 7.42143 18.9391 7 20 7H28C28.2652 7 28.5196 7.10536 28.7071 7.29289C28.8946 7.48043 29 7.73478 29 8V24C29 24.2652 28.8946 24.5196 28.7071 24.7071C28.5196 24.8946 28.2652 25 28 25H20C18.9391 25 17.9217 25.4214 17.1716 26.1716C16.4214 26.9217 16 27.9391 16 29"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 24C3 24.2652 3.10536 24.5196 3.29289 24.7071C3.48043 24.8946 3.73478 25 4 25H12C13.0609 25 14.0783 25.4214 14.8284 26.1716C15.5786 26.9217 16 27.9391 16 29V11C16 9.93913 15.5786 8.92172 14.8284 8.17157C14.0783 7.42143 13.0609 7 12 7H4C3.73478 7 3.48043 7.10536 3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V24Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
