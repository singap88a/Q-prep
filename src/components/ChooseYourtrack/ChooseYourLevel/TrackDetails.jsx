import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // استيراد مكون التحميل

const TrackDetails = () => {
  const { trackId } = useParams();
  const location = useLocation();

  const [trackDetails, setTrackDetails] = useState([]); // تخزين جميع البيانات
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await fetch(
          `https://questionprep.azurewebsites.net/api/Frameworks/GetFramework/${trackId}`,
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer`, // Add token if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }

        const data = await response.json();
        console.log("Track Data:", data);
        setTrackDetails(data); // تخزين جميع البيانات
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <ClipLoader color="#4A90E2" size={50} /> {/* تأثير التحميل */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 font-semibold text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!trackDetails || trackDetails.length === 0) {
    return <div className="mt-10 text-center">Data Not Found</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        {trackDetails.map((track) => (
          <Link
            key={track.frameworkId}
            to={`${location.pathname}/level`}
            state={{
              frameworkId: track.frameworkId,
              frameworkName: track.frameworkName,
            }}
            className="cursor-pointer track card"
          >
            <div className="">
              <div className="bg_card">
                {track.photo ? (
                  <img
                    src={`https://questionprep.azurewebsites.net/FrameworkPhoto/${track.photo}`}
                    alt={track.frameworkName}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150" // صورة افتراضية إذا لم تكن هناك صورة
                    alt="Placeholder"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <h3 className="">{track.frameworkName}</h3>
              <p className="">{track.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrackDetails;