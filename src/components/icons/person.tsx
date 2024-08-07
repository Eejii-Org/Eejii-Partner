export const PersonIcon = ({
  width = 24,
  height = 24,
  color = "#3c888d",
}: {
  width: number;
  height: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27 33.75C34.4558 33.75 40.5 27.7058 40.5 20.25C40.5 12.7942 34.4558 6.75 27 6.75C19.5442 6.75 13.5 12.7942 13.5 20.25C13.5 27.7058 19.5442 33.75 27 33.75Z"
      stroke={color}
      strokeWidth="4"
      strokeMiterlimit="10"
    />
    <path
      d="M6.53906 45.5624C8.61244 41.9705 11.5949 38.9876 15.1866 36.9137C18.7782 34.8399 22.8526 33.748 27 33.748C31.1474 33.748 35.2218 34.8399 38.8134 36.9137C42.4051 38.9876 45.3876 41.9705 47.4609 45.5624"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
