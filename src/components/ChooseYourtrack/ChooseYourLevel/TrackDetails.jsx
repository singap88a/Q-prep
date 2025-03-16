import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import card_img from "../../../assets/ChooseTrack/Card-img.png";
import { ClipLoader } from "react-spinners"; // استيراد مكون التحميل

const TrackDetails = () => {
  const { trackId } = useParams();
  const location = useLocation();

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
              Authorization: `Bearer`, // Add token if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }

        const data = await response.json();
        console.log("Track Data:", data);
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

  if (!trackDetails || !trackDetails.frameworkName) {
    return <div className="mt-10 text-center">Data Not Found</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <Link
          to={`${location.pathname}/level`}
          state={{
            frameworkId: trackDetails.frameworkId,
            frameworkName: trackDetails.frameworkName,
          }}
          className="cursor-pointer track card"
        >
          <div className="">
            <div className="bg_card">
              <img src={card_img} alt="" className="m-auto" />
            </div>
            <h3 className="">{trackDetails.frameworkName} </h3>
            <p className="">{trackDetails.description} </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TrackDetails;