import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";


const TrackDetails = () => {
  const { trackId } = useParams();

  const location = useLocation();
  // console.log("Track ID from useParams:", trackId);


  // #### make map arrey =====> Mady 
  const [trackDetails, setTrackDetails] = useState([]);
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
    return <div className="mt-10 text-center font-semibold text-red-500">{error}</div>;
  }

  if (!trackDetails || !trackDetails.frameworkName) {
    return <div className="mt-10 text-center">Data Not Found</div>;
  }

  return (
    <>
      <div className="container p-4 mx-auto">
        <h1 className="text-2xl font-bold">{trackDetails.frameworkName}</h1>
        <p className="text-gray-700">{trackDetails.description}</p>
        <div className="flex flex-wrap gap-10 mb-5">

          {/* Staet to send specific data */}
          <Link to={`${location.pathname}/level`} state={{frameworkId: trackDetails.frameworkId , frameworkName : trackDetails.frameworkName }}>
            <div className="track cursor-pointer">
              {trackDetails.mainTrack ? (
                <div className="mt-5 bg-red-200 p-4 rounded-lg">
                  <h2 className="text-xl font-bold">تفاصيل المسار الرئيسي</h2>
                  <p><strong>Path Name:</strong> {trackDetails.mainTrack.tarckName}</p>
                  <p><strong>Description:</strong> {trackDetails.mainTrack.description}</p>
                  {trackDetails.mainTrack.photo ? (
                    <img
                      src={`https://questionprep.azurewebsites.net/api/Frameworks/GetFramework/${trackId}.${trackDetails.mainTrack.photo}`}
                      alt={trackDetails.mainTrack.trackName}
                      style={{ width: "200px", height: "auto" }}
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
              ) : (
                <p>No Tracks Available</p>
              )}
            </div>
          </Link>
        </div>
      </div >
    </>
  );
};

export default TrackDetails;