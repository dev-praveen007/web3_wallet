import React from "react";
import Lottie from "lottie-react";
import Loader from "../assets/loader.json";

export const PageLoader = () => {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex min-h-screen w-full justify-center items-center">
            <Lottie animationData={Loader} loop style={{ width: "10%" }} />
        </div>
    );
};
