import Lottie from "lottie-react";
import loadingAnimation from "../data/Animation - 1744636509819.json"

const Loader = () => (
    <div className="w-full h-full bg-white absolute">
  <div className="flex h-full w-full items-center justify-center ">
    <Lottie animationData={loadingAnimation} loop={true} />
  </div>
  </div>
);

export default Loader