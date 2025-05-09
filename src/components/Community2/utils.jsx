/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
export const getImageUrl = (photo, type = "group") => {
    if (!photo) return null;
    if (photo.startsWith("http")) return photo;
  
    const baseUrl = "https://prep.blob.core.windows.net/photosprep";
    if (type === "profile") {
      return `${baseUrl}/${photo}`;
    } else if (type === "post") {
      return `${baseUrl}/${photo}`;
    } else {
      return `${baseUrl}/${photo}`;
    }
  };
  
  export const extractLinks = (text) => {
    if (!text) return [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };
  
  export const renderTextWithLinks = (text) => {
    if (!text) return null;
    
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => {
      if (part.match(/^https?:\/\/[^\s]+$/)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 break-all hover:underline"
          >
            {part.length > 30 ? `${part.substring(0, 30)}...` : part}
            <FontAwesomeIcon icon={faLink} className="ml-1 text-xs" />
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };