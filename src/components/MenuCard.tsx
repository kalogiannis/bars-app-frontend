import { useNavigate } from 'react-router-dom';

type Props = {
    img: string;
    title: string;
}

const MenuCard = ({ img, title }: Props) => {
    const navigate= useNavigate()
    return (
        <div  onClick={() => {
            console.log("Navigating to:", `/search/${title}`);
            navigate(`/search/${title.toLowerCase()}`);
          }}>
{/*       <div className="p-4 border rounded-lg shadow-md">*/}
            {/* Container with fixed height and aspect ratio */}
            <div className="h-64 aspect-w-16 aspect-h-9">
                <img
                    src={img}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-[2px] h-[64px] bg-orange-300 mt-[-30px]'></div>
                <a href="" className="text-center inline-block p-4 border border-orange-300 mt-4">{title}</a>
            </div>
        </div>
    )
}

export default MenuCard