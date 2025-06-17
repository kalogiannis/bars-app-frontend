
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface CityRadioGroupProps {
  onCityChange: (city: string) => void;
  selectedCity: string;
}

const cities = [
  { value: "athens", label: "Athens" },
  { value: "thessaloniki", label: "Thessaloniki" },
  { value: "patra", label: "Patra" },
  { value: "alexandroupoli", label: "Alexandroupoli" },
];

export const CityRadioGroup: React.FC<CityRadioGroupProps> = ({
  onCityChange,
  selectedCity,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <RadioGroup
        value={selectedCity}
        onValueChange={onCityChange}
        className="flex flex-col space-y-2"
      >
        {cities.map((city) => (
          <div key={city.value} className="flex items-center space-x-2">
            <RadioGroupItem value={city.value} id={city.value} className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white" />
            <Label htmlFor={city.value}>{city.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};


