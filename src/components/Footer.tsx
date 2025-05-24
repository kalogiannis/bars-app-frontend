
const Footer = () => {
  return (
    <div className="bg-gray-800 py-10 border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Bars.com
        </span>
        <span className="text-gray-400 font-semibold tracking-tight flex gap-6">
          <span className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white transition-colors duration-200 cursor-pointer">Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
