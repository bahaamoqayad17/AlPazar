import Svg, { Path } from "react-native-svg";

const Comment = () => {
  return (
    <Svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11 20.75C12.9284 20.75 14.8134 20.1782 16.4168 19.1068C18.0202 18.0355 19.2699 16.5127 20.0078 14.7312C20.7458 12.9496 20.9389 10.9892 20.5627 9.09787C20.1865 7.20656 19.2579 5.46928 17.8943 4.10571C16.5307 2.74215 14.7934 1.81355 12.9021 1.43735C11.0108 1.06114 9.05042 1.25422 7.26884 1.99218C5.48726 2.73013 3.96452 3.97982 2.89317 5.58319C1.82183 7.18657 1.25 9.07164 1.25 11C1.25 12.612 1.64 14.1308 2.33333 15.4709L1.25 20.75L6.52908 19.6667C7.86808 20.3589 9.38908 20.75 11 20.75Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Comment;
