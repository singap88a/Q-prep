import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import card_img from "../../../assets/ChooseTrack/Card-img.png";  

const TrackDetails = () => {
  const { trackId } = useParams();
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
 

         <div className="mt-5">
           <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
            <div className="card">
              <div className="bg_card">
                <img src={card_img} alt="" className="m-auto" />
              </div>
              <h3 className="">{trackDetails.frameworkName}</h3>
              <p className="">{trackDetails.description}</p>
            </div>
          </div>
 
        </div>
     </div>
  );
};

export default TrackDetails;