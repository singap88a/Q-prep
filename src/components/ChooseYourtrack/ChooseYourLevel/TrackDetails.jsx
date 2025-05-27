import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const TrackDetails = () => {
  const { trackId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [trackDetails, setTrackDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { tarckName } = location.state || {};

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://redasaad.azurewebsites.net/api/Frameworks/GetFramework/${trackId}`,
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
        setTrackDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-4xl text-secondary animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 font-semibold text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!trackDetails || trackDetails.length === 0) {
    return (
      <div className="mt-10 text-center text-secondary">
        No frameworks found for this track
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      {/* Header */}
      <div className="headRight">
        <div className="flex gap-3">
          <i 
            className="text-2xl font-bold fa-solid fa-chevron-left text-primary cursor-pointer" 
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-2xl font-bold">{tarckName}</h1>
        </div>
        <h1 className="text-sm text-gray-600 md:text-xl ms-6">
          Choose the framework
        </h1>
      </div>

      {/* Tracks */}
      <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {trackDetails.map((track) => (
          <Link
            key={track.frameworkId}
            to={`${location.pathname}/level`}
            state={{
              frameworkId: track.frameworkId,
              frameworkName: track.frameworkName,
            }}
            className="transition-shadow duration-300 cursor-pointer track card hover:shadow-lg"
          >
            <div className="">
              <div className="bg_card">
                {track.photo ? (
                  <img
                    src={`https://prep.blob.core.windows.net/photosprep/${track.photo}`}
                    alt={track.frameworkName}
                    className="object-cover w-full h-full rounded-lg"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Placeholder"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="text-lg font-semibold ">{track.frameworkName}</h3>
              <p className="text-gray-600 ">{track.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrackDetails;