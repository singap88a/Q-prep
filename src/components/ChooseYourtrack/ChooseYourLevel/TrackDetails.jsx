import   { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrackDetails = () => {
  const { trackId } = useParams();
  const [trackDetails, setTrackDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await fetch(
          `https://questionprep.azurewebsites.net/api/Frameworks/GetFramework/${trackId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }
        const data = await response.json();
        console.log("Fetched Data:", data); // تحقق من البيانات
        setTrackDetails(data);
      } catch (error) {
        console.error("Error fetching track details:", error);
        setError("فشل في تحميل تفاصيل المسار. يرجى المحاولة مرة أخرى لاحقًا.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  if (loading) {
    return <div className="mt-10 text-center">جارٍ التحميل...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  if (!trackDetails || !trackDetails.frameworkName || !trackDetails.mainTrack) {
    return <div className="mt-10 text-center">لا تتوفر بيانات لهذا المسار.</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">{trackDetails.frameworkName}</h1>
      <p className="text-gray-700">{trackDetails.description}</p>

      {trackDetails.mainTrack && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">تفاصيل المسار الرئيسي</h2>
          <p><strong>اسم المسار:</strong> {trackDetails.mainTrack.tarckName}</p>
          <p><strong>الوصف:</strong> {trackDetails.mainTrack.description}</p>
          {trackDetails.mainTrack.photo && (
            <img
              src={`https://questionprep.azurewebsites.net/${trackDetails.mainTrack.photo}`}
              alt={trackDetails.mainTrack.tarckName}
              className="w-48 h-48 mt-3"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TrackDetails;