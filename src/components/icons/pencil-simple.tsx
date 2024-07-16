export const PencilSimpleIcon = ({
  width = 24,
  height = 24,
  color = "#3c888d",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 27H6.00001C5.73479 27 5.48044 26.8946 5.2929 26.7071C5.10536 26.5196 5.00001 26.2652 5.00001 26V20.4125C4.99955 20.2826 5.02471 20.154 5.07404 20.0339C5.12338 19.9137 5.19591 19.8045 5.28751 19.7125L20.2875 4.7125C20.3806 4.61801 20.4915 4.54298 20.6138 4.49176C20.7361 4.44055 20.8674 4.41417 21 4.41417C21.1326 4.41417 21.2639 4.44055 21.3862 4.49176C21.5085 4.54298 21.6195 4.61801 21.7125 4.7125L27.2875 10.2875C27.382 10.3805 27.457 10.4915 27.5082 10.6138C27.5595 10.7361 27.5858 10.8674 27.5858 11C27.5858 11.1326 27.5595 11.2639 27.5082 11.3862C27.457 11.5085 27.382 11.6194 27.2875 11.7125L12 27Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 27H12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8L24 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
