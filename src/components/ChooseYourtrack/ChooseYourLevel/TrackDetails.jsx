import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrackDetails = () => {
  const { trackId } = useParams();
  // console.log("Track ID from useParams:", trackId);

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
              "Authorization": `Bearer`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setTrackDetails(data[0]);
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
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  if (!trackDetails || !trackDetails.frameworkName) {
    return <div className="mt-10 text-center">Data Not Found</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">{trackDetails.frameworkName}</h1>
      <p className="text-gray-700">{trackDetails.description}</p>

      {trackDetails.mainTrack && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">تفاصيل المسار الرئيسي</h2>
          <p><strong> path name :</strong> {trackDetails.mainTrack.tarckName}</p>
          <p><strong>Description :</strong> {trackDetails.mainTrack.description}</p>
          {trackDetails.photo ? (
            <img
              src={`${baseURL}${trackDetails.photo}`}
              alt={trackDetails.frameworkName}
              style={{ width: "200px", height: "auto" }}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackDetails;