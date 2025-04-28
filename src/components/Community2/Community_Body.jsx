import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faImage,
  faTimes,
  faHeart,
  faShare,
  faCalendarAlt,
  faLink,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FiPlus } from "react-icons/fi";

import userImage from "../../assets/user.png";
import axios from "axios";
import { toast } from "react-toastify";
import Community_right from "./Community_right";

function CommunityPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [group, setGroup] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [activeTab, setActiveTab] = useState("Text");
  const [postLink, setPostLink] = useState("");

  // Improved image URL handler
  const getImageUrl = (photo, type = "group") => {
    if (!photo) return userImage;
    if (photo.startsWith("http")) return photo;

    const baseUrl = "https://questionprep.azurewebsites.net";
    if (type === "profile") {
      return `${baseUrl}/ProfilePhoto/${photo}`;
    } else if (type === "post") {
      return `${baseUrl}/PostPhotos/${photo}`;
    } else {
      return `${baseUrl}/GroupsPhoto/${photo}`;
    }
  };

  // Fetch group data and posts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [groupResponse, postsResponse] = await Promise.all([
          axios.get(
            `https://questionprep.azurewebsites.net/api/Groups/GetGroupById/${groupId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios
            .get(
              `https://questionprep.azurewebsites.net/api/Posts/GetAllPosts/${groupId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .catch((err) => {
              if (err.response?.status === 404) {
                return { data: [] };
              }
              throw err;
            }),
        ]);

        setGroup(groupResponse.data);

        // Process posts with proper image URLs
        const processedPosts = postsResponse.data.map((post) => ({
          ...post,
          id: post.postId || post.id,
          images: Array.isArray(post.images)
            ? post.images.map((img) => getImageUrl(img, "post"))
            : post.imageUrl
            ? [getImageUrl(post.imageUrl, "post")]
            : [],
          createdDate:
            post.postDate || post.createdDate || new Date().toISOString(),
          userName: post.userName || "Anonymous",
          userPhoto: getImageUrl(post.userPhoto, "profile"),
          text: post.text || post.content || "",
          likesCount: post.likes || post.likesCount || 0,
          isLiked: post.isLiked || false,
          links: extractLinks(post.text || post.content || ""),
        }));

        setPosts(processedPosts);

        // Initialize liked posts set
        const liked = new Set();
        processedPosts.forEach((post) => {
          if (post.isLiked) {
            liked.add(post.id);
          }
        });
        setLikedPosts(liked);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
        toast.error("Failed to load community data");
        navigate("/community");
      }
    };

    fetchData();
  }, [groupId, navigate]);

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
    if (!postText.trim() && postImages.length === 0 && !postLink) return;
    if (!group) return;

    try {
      setUploading(true);

      const formData = new FormData();
      postImages.forEach((image) => {
        formData.append("Images", image);
      });

      // Include link in the post text if provided
      let finalText = postText;
      if (postLink) {
        finalText = postText ? `${postText}\n${postLink}` : postLink;
      }

      const params = new URLSearchParams();
      params.append("groupId", group.id);
      params.append("Text", finalText);
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

      const newPost = {
        ...response.data,
        id: response.data.postId,
        images: Array.isArray(response.data.images)
          ? response.data.images.map((img) => getImageUrl(img, "post"))
          : [getImageUrl(response.data.images, "post")].filter(Boolean),
        createdDate: response.data.postDate || new Date().toISOString(),
        userName: "You",
        userPhoto: getImageUrl(response.data.userPhoto, "profile"),
        text: response.data.text,
        likesCount: 0,
        isLiked: false,
        links: extractLinks(response.data.text),
      };

      setPosts((prev) => [newPost, ...prev]);
      setPostText("");
      setPostImages([]);
      setPostLink("");
      setShowPostForm(false);
      setActiveTab("Text");
      toast.success("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  // Share post function
  const handleSharePost = async (postId) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const postUrl = `${window.location.origin}/community/${groupId}/post/${postId}`;
      const shareData = {
        title: `Post by ${post.userName}`,
        text: post.text?.substring(0, 100) || "Check out this post",
        url: postUrl,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(postUrl);
        toast.success("Post link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      if (err.name !== "AbortError") {
        toast.error("Failed to share post");
      }
    }
  };

  // Handle like/unlike post
  const handleLikePost = async (postId) => {
    try {
      // Check if already liked
      if (likedPosts.has(postId)) {
        toast.info("You've already liked this post");
        return;
      }

      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex === -1) return;

      const post = posts[postIndex];

      // Optimistic update
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...post,
        likesCount: post.likesCount + 1,
        isLiked: true,
      };
      setPosts(updatedPosts);

      // Add to liked posts set
      setLikedPosts((prev) => new Set(prev.add(postId)));

      const endpoint = `https://questionprep.azurewebsites.net/api/Likes/AddLike/${postId}`;

      await axios.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      setPosts(posts);
      toast.error("Failed to update like");
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

  if (!group) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-bold">Community not found</h2>
        <button
          onClick={() => navigate("/community")}
          className="px-4 py-2 mt-4 text-white rounded-lg bg-secondary"
        >
          Back to Communities
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl mx-auto">
      {/* Group header */}
      <div className="flex items-center justify-between gap-4 p-4 mb-8 bg-white border-b-2 ">
        <div className="flex items-center gap-4 ">
          <img
            src={getImageUrl(group.photo, "group")}
            alt={group.groupName}
            className="object-cover w-16 h-16 rounded-full"
            onError={(e) => {
              e.target.src = userImage;
            }}
          />
          <div>
            <h2 className="text-2xl font-bold">{group.groupName}</h2>
            <p className="text-sm text-gray-500">
              {group.numberOfMembers} members
            </p>
          </div>
        </div>
        {/* Create post button */}
        <button
          onClick={() => setShowPostForm(true)}
          className="flex items-center gap-1 px-4 py-2 font-bold transition-all border-2 rounded-lg border-secondary text-secondary hover:bg-primary hover:text-white hover:border-primary"
        >
          <FiPlus className="font-bold" /> Create Post
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col-reverse gap-10 py-5 md:flex-row">
        {/* Posts section */}
        <div className="px-1 basis-2/3">
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
                    setPostLink("");
                    setActiveTab("Text");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex mb-4 border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "Text"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Text")}
                >
                  Text
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "Image & Video"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Image & Video")}
                >
                  Image & Video
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "Link"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Link")}
                >
                  Link
                </button>
              </div>

              {/* Tab content */}
              {activeTab === "Text" && (
                <textarea
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Share your thoughts..."
                  rows="4"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              )}

              {activeTab === "Image & Video" && (
                <div className="mb-4">
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-gray-300 border-dashed rounded-lg">
                    <FontAwesomeIcon
                      icon={faImage}
                      className="mb-2 text-3xl text-gray-400"
                    />
                    <p className="mb-2 text-gray-500">
                      Drag and drop or upload media
                    </p>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 text-white rounded-lg bg-secondary hover:bg-secondary-dark"
                    >
                      Select Files
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                      multiple
                      accept="image/*,video/*"
                    />
                  </div>

                  {/* Selected images preview */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {postImages.map((image, index) => (
                      <div key={index} className="relative">
                        {image.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`preview-${index}`}
                            className="object-cover w-20 h-20 rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-lg">
                            <FontAwesomeIcon
                              icon={faVideo}
                              className="text-gray-500"
                            />
                          </div>
                        )}
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 p-1 text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"
                        >
                          <FontAwesomeIcon icon={faTimes} size="xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Link" && (
                <div className="mb-4">
                  <input
                    type="url"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Paste a link..."
                    value={postLink}
                    onChange={(e) => setPostLink(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  onClick={handleSubmitPost}
                  disabled={
                    uploading ||
                    (activeTab === "Text" && !postText.trim()) ||
                    (activeTab === "Image & Video" && postImages.length === 0) ||
                    (activeTab === "Link" && !postLink)
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
            </div>
          )}

          {/* Posts list */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="border-t border-gray-300 py-7">
                <div className="flex items-center justify-between gap-5 mb-4">
                  <div className="flex items-center gap-5">
                    <img
                      src={post.userPhoto}
                      alt="profile"
                      className="object-cover w-12 h-12 rounded-full"
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

                {post.images.length > 0 && (
                  <div
                    className={`grid gap-2 mb-4 ${
                      post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    {post.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden bg-gray-100 rounded-lg group"
                      >
                        <img
                          src={image}
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
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white rounded-lg bg-secondary"
                          >
                            View Full Size
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    disabled={likedPosts.has(post.id)}
                    className={`flex items-center gap-2 px-4 py-1 rounded-full ${
                      likedPosts.has(post.id)
                        ? "text-red-500 bg-red-100 cursor-not-allowed"
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
              No posts in this community yet. Be the first to post!
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