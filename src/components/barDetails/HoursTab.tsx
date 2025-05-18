
type HoursTabProps = {
  openingHours: string;
}

const HoursTab = ({ openingHours }: HoursTabProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Opening Hours</h2>
    <ul className="space-y-2">
      {openingHours.split(',').map((line, idx) => {
        const [start, end] = line.split('-').map(s => s.trim());
        return (
          <li key={idx} className="flex justify-between">
            <span>{start}</span>
            <span>{end}</span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default HoursTab;