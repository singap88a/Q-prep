import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const TrackDetails = () => {
  const { trackId } = useParams();
  const location = useLocation();

  const [trackDetails, setTrackDetails] = useState(null);
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
        setTrackDetails(data[0]); // Assuming the API returns an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  if (loading) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10 font-semibold text-center text-red-500">{error}</div>;
  }

  if (!trackDetails || !trackDetails.frameworkName) {
    return <div className="mt-10 text-center">Data Not Found</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">{trackDetails.frameworkName}</h1>
      <p className="text-gray-700">{trackDetails.description}</p>

      <div className="flex flex-wrap gap-10 mb-5">
        {/* Link to navigate to the level page */}
        <Link
          to={`${location.pathname}/level`}
          state={{ frameworkId: trackDetails.frameworkId, frameworkName: trackDetails.frameworkName }}
          className="cursor-pointer track"
        >
          <div className="p-4 mt-5 bg-red-200 rounded-lg">
            <h2 className="text-xl font-bold">تفاصيل المسار الرئيسي</h2>
            {trackDetails.mainTrack ? (
              <>
                <p>
                  <strong>Path Name:</strong> {trackDetails.mainTrack.trackName}
                </p>
                <p>
                  <strong>Description:</strong> {trackDetails.mainTrack.description}
                </p>
                {trackDetails.mainTrack.photo ? (
                  <img
                    src={`https://questionprep.azurewebsites.net/${trackDetails.mainTrack.photo}`}
                    alt={trackDetails.mainTrack.trackName}
                    className="w-48 h-auto"
                  />
                ) : (
                  <p>No Image Available</p>
                )}
              </>
            ) : (
              <p>No Tracks Available</p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TrackDetails;