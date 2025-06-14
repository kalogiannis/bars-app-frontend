

import hero from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative w-full max-h-[600px] overflow-hidden">
      <img
        src={hero}
        alt="Hero background"
        className="w-full h-full object-cover filter brightness-70"
      />

      <div className="absolute inset-0 bg-gray-900/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md">
          App for Bars
        </h1>
      </div>
    </div>
  );
};

export default Hero;
