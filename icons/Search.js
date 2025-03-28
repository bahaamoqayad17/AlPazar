import Svg, { Path } from "react-native-svg";

const Search = () => {
  return (
    <Svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.5 22.25C5.85 22.25 1.25 17.65 1.25 12C1.25 6.35 5.85 1.75 11.5 1.75C17.15 1.75 21.75 6.35 21.75 12C21.75 17.65 17.15 22.25 11.5 22.25ZM11.5 3.25C6.67 3.25 2.75 7.18 2.75 12C2.75 16.82 6.67 20.75 11.5 20.75C16.33 20.75 20.25 16.82 20.25 12C20.25 7.18 16.33 3.25 11.5 3.25Z"
        fill="#05595B"
      />
      <Path
        d="M22 23.25C21.81 23.25 21.62 23.18 21.47 23.03L19.47 21.03C19.18 20.74 19.18 20.26 19.47 19.97C19.76 19.68 20.24 19.68 20.53 19.97L22.53 21.97C22.82 22.26 22.82 22.74 22.53 23.03C22.38 23.18 22.19 23.25 22 23.25Z"
        fill="#05595B"
      />
    </Svg>
  );
};

export default Search;
