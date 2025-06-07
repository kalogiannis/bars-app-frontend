type Props={
    text1:string;
    span:string;
    text2:string
}
const DecorationText = ({text1,span,text2}:Props) => {
  return (
    <div className="relative mb-8">
      <h2 className="text-5xl font-serif font-bold tracking-tight text-center">
       {text1}
      </h2>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <span className="text-7xl font-script text-[#F9A826] font-light italic transform -rotate-12 inline-block">
          {span}
        </span>
      </div>
      <h2 className="text-5xl font-serif font-bold tracking-tight text-center mt-4">
        {text2}
      </h2>
    </div>
  );
};

export default DecorationText;
