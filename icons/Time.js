import Svg, { Path } from "react-native-svg";

const Time = () => {
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.2916 11.5417C17.2916 15.5667 14.025 18.8333 9.99998 18.8333C5.97498 18.8333 2.70831 15.5667 2.70831 11.5417C2.70831 7.51667 5.97498 4.25 9.99998 4.25C14.025 4.25 17.2916 7.51667 17.2916 11.5417Z"
        stroke="#000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 7.16666V11.3333"
        stroke="#000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 2.16666H12.5"
        stroke="#000"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Time;
