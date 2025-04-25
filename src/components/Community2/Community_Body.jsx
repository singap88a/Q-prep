import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsis,
  faImage,
  faTimes,
  faHeart,
  faShare,
  faCalendarAlt,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import userImage from "../../assets/user.png";
import axios from "axios";
import Community_right from "./Community_right";

function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://questionprep.azurewebsites.net/api/Groups/GetAllGroups",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGroups(response.data);

        if (response.data.length > 0) {
          setSelectedGroup(response.data[0]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGroups();
  }, []);

  // Fetch posts for selected group
  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedGroup) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `https://questionprep.azurewebsites.net/api/Posts/GetAllPosts/${selectedGroup.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Process posts data
        const processedPosts = response.data.map((post) => ({
          ...post,
          id: post.postId || post.id,
          images: Array.isArray(post.images)
            ? post.images
            : post.imageUrl
            ? [post.imageUrl]
            : [],
          createdDate:
            post.postDate || post.createdDate || new Date().toISOString(),
          userName: post.userName || "Anonymous",
          text: post.text || post.content || "",
          likesCount: post.likes || post.likesCount || 0,
          isLiked: post.isLiked || false, // Add isLiked property
          // Extract links from text
          links: extractLinks(post.text || post.content || ""),
        }));

        setPosts(processedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedGroup]);

  // Extract links from text
  const extractLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPostImages((prev) => [...prev, ...filesArray]);
    }
  };

  // Remove selected image
  const removeImage = (index) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit new post
  const handleSubmitPost = async () => {
    if (!postText.trim() && postImages.length === 0) return;
    if (!selectedGroup) return;

    try {
      setUploading(true);

      const formData = new FormData();

      // Add images to form data with correct field name
      postImages.forEach((image) => {
        formData.append("Images", image);
      });

      // Add query parameters
      const params = new URLSearchParams();
      params.append("groupId", selectedGroup.id);
      params.append("Text", postText);
      params.append("TypeOfBody", "post");

      const response = await axios.post(
        `https://questionprep.azurewebsites.net/api/Posts/CreatePost?${params.toString()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add the new post to the posts list
      const newPost = {
        ...response.data,
        id: response.data.postId,
        images: Array.isArray(response.data.images)
          ? response.data.images
          : [response.data.images].filter(Boolean),
        createdDate: response.data.postDate || new Date().toISOString(),
        userName: "You",
        text: response.data.text,
        likesCount: 0,
        isLiked: false,
        links: extractLinks(response.data.text),
      };

      setPosts((prev) => [newPost, ...prev]);
      setPostText("");
      setPostImages([]);
      setShowPostForm(false);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Function to construct proper image URL
  const getImageUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith("http")) return photo;

    // Try different possible paths
    const baseUrl = "https://questionprep.azurewebsites.net";
    const possiblePaths = [
      `/PostPhotos/${photo}`,
      `/PostPhotos/${photo}`,
      `/GroupsPhoto/${photo}`,
      `/GroupsPhoto/${photo}`,
    ];

    // Return the first possible path (error will be handled in the UI)
    return `${baseUrl}${possiblePaths[0]}`;
  };

  // Share post function
  const handleSharePost = (postId) => {
    const postUrl = `${window.location.origin}/community/post/${postId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post",
          url: postUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          copyToClipboard(postUrl);
        });
    } else {
      copyToClipboard(postUrl);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  // Handle like/unlike post
  const handleLikePost = async (postId) => {
    try {
      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex === -1) return;

      const post = posts[postIndex];
      const isLiked = post.isLiked;

      // Optimistic update
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...post,
        likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
        isLiked: !isLiked,
      };
      setPosts(updatedPosts);

      // Make API call
      const endpoint = isLiked
        ? `https://questionprep.azurewebsites.net/api/Likes/RemoveLike/${postId}`
        : `https://questionprep.azurewebsites.net/api/Likes/AddLike/${postId}`;

      const response = await axios.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update with actual data from server if needed
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likesCount: response.data.likesCount,
      };
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Error toggling like:", err);
      // Revert optimistic update on error
      setPosts(posts);
    }
  };

  // Render text with links
  const renderTextWithLinks = (text) => {
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

  // Filter groups based on search
  const filteredGroups = groups.filter((item) =>
    item.groupName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Current page posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-secondary animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 ml-4 text-white rounded-lg bg-secondary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl mx-auto">
      {/* Community selection */}
      <div className="flex flex-wrap gap-4 mb-8">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              selectedGroup?.id === group.id
                ? "border-secondary bg-secondary bg-opacity-10"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedGroup(group)}
          >
            <img
              src={getImageUrl(group.photo) || userImage}
              alt={group.groupName}
              className="object-cover w-10 h-10 mr-3 rounded-full"
              onError={(e) => {
                e.target.src = userImage;
              }}
            />
            <div>
              <h3 className="font-medium">{group.groupName}</h3>
              <p className="text-xs text-gray-500">
                {group.numberOfMembers} member
                {group.numberOfMembers !== "1" ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col-reverse gap-10 py-5 md:flex-row">
        {/* Posts section */}
        <div className="px-1 basis-2/3">
          {selectedGroup && (
            <div className="p-4 mb-6 rounded-lg bg-gray-50">
              <h2 className="text-xl font-bold">{selectedGroup.groupName}</h2>
              <p className="text-gray-600">{selectedGroup.description}</p>

              {/* Create post button */}
              <button
                onClick={() => setShowPostForm(true)}
                className="w-full p-3 mt-4 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                What's on your mind?
              </button>
            </div>
          )}

          {/* Post creation form */}
          {showPostForm && (
            <div className="p-4 mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold">Create Post</h3>
                <button
                  onClick={() => {
                    setShowPostForm(false);
                    setPostText("");
                    setPostImages([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <textarea
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Share your thoughts..."
                rows="4"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />

              {/* Selected images preview */}
              <div className="flex flex-wrap gap-2 mb-4">
                {postImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="object-cover w-20 h-20 rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 p-1 text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center p-2 text-gray-600 hover:text-secondary"
                >
                  <FontAwesomeIcon icon={faImage} className="mr-2" />
                  Add Photo
                </button>

                <button
                  onClick={handleSubmitPost}
                  disabled={
                    uploading || (!postText.trim() && postImages.length === 0)
                  }
                  className={`px-4 py-2 text-white rounded-lg ${
                    uploading
                      ? "bg-gray-400"
                      : "bg-secondary hover:bg-secondary-dark"
                  } disabled:opacity-50`}
                >
                  {uploading ? (
                    <span className="flex items-center">
                      <span className="mr-2">Posting</span>
                      <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                    </span>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                multiple
                accept="image/*"
              />
            </div>
          )}

          {/* Posts list */}
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div key={post.id} className="border-t border-gray-300 py-7">
                <div className="flex items-center justify-between gap-5 mb-4">
                  <div className="flex items-center gap-5">
                    <img
                      src={getImageUrl(post.userPhoto) || userImage}
                      alt="profile"
                      className="w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.target.src = userImage;
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{post.userName}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-1"
                        />
                        {new Date(post.createdDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                    />
                  </div>
                </div>

                {post.text && (
                  <p className="mb-4 text-gray-800 whitespace-pre-line">
                    {renderTextWithLinks(post.text)}
                  </p>
                )}

                {post.images && post.images.length > 0 && (
                  <div
                    className={`grid gap-2 mb-4 ${
                      post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    {post.images.map((image, index) => {
                      const imageUrl = getImageUrl(image);
                      return imageUrl ? (
                        <div
                          key={index}
                          className="relative overflow-hidden bg-gray-100 rounded-lg group"
                        >
                          <img
                            src={imageUrl}
                            alt={`Post ${index}`}
                            className="object-cover w-full h-full min-h-[200px]"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/400x200?text=Image+Not+Found";
                              e.target.className =
                                "object-cover w-full h-full min-h-[200px] bg-gray-100";
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 group-hover:opacity-100 bg-opacity-30">
                            <a
                              href={imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-white rounded-lg bg-secondary"
                            >
                              View Full Size
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg"
                        >
                          <span className="text-gray-500">
                            Image not available
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-2 px-4 py-1 rounded-full ${
                      post.isLiked
                        ? "text-red-500 bg-red-100 hover:bg-red-200"
                        : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    {post.likesCount} Likes
                  </button>
                  <button
                    onClick={() => handleSharePost(post.id)}
                    className="flex items-center gap-2 px-4 py-1 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <FontAwesomeIcon icon={faShare} />
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              {selectedGroup
                ? "No posts in this community yet. Be the first to post!"
                : "Select a community to view posts"}
            </div>
          )}

          {/* Pagination */}
          {posts.length > postsPerPage && (
            <div className="flex justify-center mt-6 mb-10">
              <button
                className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-secondary text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="basis-1/3">
          <Community_right />
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;