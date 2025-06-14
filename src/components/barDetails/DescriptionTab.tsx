import { Link } from "react-router-dom";

type DescriptionTabProps = {
  description: string;
  id: string;
};

const DescriptionTab = ({ description, id }: DescriptionTabProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Description</h2>
    <p className="leading-relaxed">{description}</p>
    
    <Link
      to={`/bar/${id}/menu`}
      className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-primary/90"
    >
      Drink Menu Catalogue
    </Link>
  </div>
);

export default DescriptionTab;
