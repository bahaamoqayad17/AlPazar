import Svg, { Path, Rect } from "react-native-svg";

const Camera = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="11.25"
        fill="white"
      />
      <Rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="11.25"
        stroke="#05595B"
        stroke-width="1.5"
      />
      <Path
        d="M9.37996 17H14.62C16 17 16.55 16.155 16.615 15.125L16.875 10.995C16.945 9.915 16.085 9 15 9C14.695 9 14.415 8.825 14.275 8.555L13.915 7.83C13.685 7.375 13.085 7 12.575 7H11.43C10.915 7 10.315 7.375 10.085 7.83L9.72496 8.555C9.58496 8.825 9.30496 9 8.99996 9C7.91496 9 7.05496 9.915 7.12496 10.995L7.38496 15.125C7.44496 16.155 7.99996 17 9.37996 17Z"
        stroke="#05595B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.25 10H12.75"
        stroke="#05595B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 15C12.895 15 13.625 14.27 13.625 13.375C13.625 12.48 12.895 11.75 12 11.75C11.105 11.75 10.375 12.48 10.375 13.375C10.375 14.27 11.105 15 12 15Z"
        stroke="#05595B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Camera;
