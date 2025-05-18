
import { useLocation, Link } from "react-router-dom";

const ReservationConfirmationPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const barName = params.get("barName") || "the bar";
  const date = params.get("date");
  const time = params.get("time");
  const people = params.get("people");

  return (
    <div className="container mx-auto px-6 lg:px-20 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-amber-500">
        🎉 Congratulations!
      </h1>
      <p className="text-xl mb-2">
        You’ve successfully booked a table at&nbsp;
        <strong>{barName}</strong>.
      </p>
      <p className="mb-6">
        <strong>{people}</strong> people on{" "}
        <strong>{date}</strong> at <strong>{time}</strong>.
      </p>
      <Link
        to={`/detail/${params.get("barId")}`}
        className="inline-block bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded"
      >
        Back to {barName}
      </Link>
    </div>
  );
};

export default ReservationConfirmationPage;
