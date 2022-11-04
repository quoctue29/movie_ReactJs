import React from "react";
import UserLogin from "./UserLogin";
import Lottie from "lottie-react";
import movie from "../../Asset/movie.json";

export default function LoginPage() {
  return (
    <>
      <div
        className="flex  max-h-max w-screen items-center py-20 m-auto"
        style={{
          backgroundImage: `url(https://www.pixelstalk.net/wp-content/uploads/images6/Aesthetic-Minimalist-Wallpaper-Paper-Airplanes.png)`,
          backgroundPosition: `center center`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          maxWidth: 1200,
        }}
      >
        <div className="w-1/2 xl:flex justify-center hidden">
          <div className="h-1/2 w-1/2">
            <Lottie animationData={movie} loop={true} />
          </div>
        </div>
        <div className="w-full xl:w-1/2 h-full flex items-center justify-center">
          <UserLogin />
        </div>
      </div>
    </>
  );
}
