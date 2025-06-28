
import { useNavigate } from 'react-router-dom';

type Props = {
  img: string;
  title: string;
};

const MenuCard = ({ img, title }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer" 
      onClick={() => navigate(`/search/${title.toLowerCase()}`)}
    >
      {/* enable group-hover on children */}
      <div className="h-64 aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="
            object-cover w-full h-full
            filter transition duration-300 ease-in-out
            group-hover:sepia
          "
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-[2px] h-[64px] bg-orange-300 mt-[-30px]" />
        <span className="text-center inline-block p-4 border border-orange-300 mt-4">
          {title}
        </span>
      </div>
    </div>
  );
};

export default MenuCard;
