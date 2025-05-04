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
  faEdit,
  faTrash,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { FiPlus } from "react-icons/fi";

import defaultUserImage from "../../assets/user.png";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [showOptionsForPost, setShowOptionsForPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const optionsRef = useRef(null);
  const [isMember, setIsMember] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Improved image URL handler
  const getImageUrl = (photo, type = "group") => {
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

  // Fetch current user data and membership status
  useEffect(() => {
    const fetchCurrentUserAndMembership = async () => {
      try {
        const [userResponse, membershipResponse] = await Promise.all([
          axios.get(
            "https://redasaad.azurewebsites.net/api/Account/GetCurrentUser",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.get(
            `https://redasaad.azurewebsites.net/api/UserGroup/CheckMembership/${groupId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
        ]);

        setCurrentUser(userResponse.data);
        setIsMember(membershipResponse.data.isMember);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCurrentUserAndMembership();
  }, [groupId]);

  // Fetch group data and posts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [groupResponse, postsResponse] = await Promise.all([
          axios.get(
            `https://redasaad.azurewebsites.net/api/Groups/GetGroupById/${groupId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios
            .get(
              `https://redasaad.azurewebsites.net/api/Posts/GetAllPosts/${groupId}`,
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
          userId: post.userId,
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
  }, [groupId, navigate, isMember]); // Add isMember to dependencies

  // Close options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptionsForPost(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Reset post form
  const resetPostForm = () => {
    setPostText("");
    setPostImages([]);
    setPostLink("");
    setActiveTab("Text");
    setEditingPost(null);
    setShowPostForm(false);
  };

  // Handle join/leave group
  const handleGroupAction = async () => {
    if (!group) return;
    
    setActionLoading(true);
    try {
      if (isMember) {
        // Leave group
        await axios.post(
          "https://redasaad.azurewebsites.net/api/UserGroup/LeaveGroup",
          {
            connectionId: group.id,
            groupName: group.groupName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setIsMember(false);
        setGroup(prev => ({
          ...prev,
          numberOfMembers: (parseInt(prev.numberOfMembers) - 1).toString()
        }));
        toast.success(`Left group ${group.groupName}`);
      } else {
        // Join group
        await axios.post(
          "https://redasaad.azurewebsites.net/api/UserGroup/JoinGroup",
          {
            connectionId: group.id,
            groupName: group.groupName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setIsMember(true);
        setGroup(prev => ({
          ...prev,
          numberOfMembers: (parseInt(prev.numberOfMembers) + 1).toString()
        }));
        toast.success(`Joined group ${group.groupName}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Submit or update post
  const handleSubmitPost = async () => {
    if (!postText.trim() && postImages.length === 0 && !postLink) return;
    if (!group || !isMember) return;

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

      if (editingPost) {
        // Update existing post
        const params = new URLSearchParams();
        params.append("Text", finalText);

        await axios.put(
          `https://redasaad.azurewebsites.net/api/Posts/UpdatePost/${editingPost.id}?${params.toString()}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Update the post in state
        setPosts((prev) =>
          prev.map((post) =>
            post.id === editingPost.id
              ? {
                  ...post,
                  text: finalText,
                  images: postImages.length
                    ? postImages.map((img) =>
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      )
                    : post.images,
                  links: extractLinks(finalText),
                }
              : post
          )
        );

        toast.success("Post updated successfully!");
      } else {
        // Create new post
        const params = new URLSearchParams();
        params.append("groupId", group.id);
        params.append("Text", finalText);
        params.append("TypeOfBody", "post");

        const response = await axios.post(
          `https://redasaad.azurewebsites.net/api/Posts/CreatePost?${params.toString()}`,
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
          userId: currentUser?.id,
          images: postImages.map((img) => URL.createObjectURL(img)),
          createdDate: response.data.postDate || new Date().toISOString(),
          userName: "You",
          userPhoto: getImageUrl(currentUser?.photo, "profile"),
          text: finalText,
          likesCount: 0,
          isLiked: false,
          links: extractLinks(finalText),
        };

        setPosts((prev) => [newPost, ...prev]);
        toast.success("Post created successfully!");
      }

      resetPostForm();
    } catch (err) {
      console.error(
        editingPost ? "Error updating post:" : "Error creating post:",
        err
      );
      toast.error(
        editingPost ? "Failed to update post" : "Failed to create post"
      );
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

      const endpoint = `https://redasaad.azurewebsites.net/api/Likes/AddLike/${postId}`;

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

  // Handle delete post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `https://redasaad.azurewebsites.net/api/Posts/DeletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post");
    }
  };

  // Handle edit post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostText(post.text);
    setPostImages(post.images || []);
    setActiveTab("Text");
    setShowPostForm(true);
  };

  // Toggle post options menu
  const togglePostOptions = (postId, e) => {
    e.stopPropagation();
    setShowOptionsForPost(showOptionsForPost === postId ? null : postId);
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
      <div className="flex flex-col gap-4 p-4 mb-8 bg-white border-b-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={getImageUrl(group.photo, "group") || defaultUserImage}
            alt={group.groupName}
            className="object-cover w-16 h-16 rounded-full"
            onError={(e) => {
              e.target.src = defaultUserImage;
            }}
          />
          <div>
            <h2 className="text-2xl font-bold">{group.groupName}</h2>
            <p className="text-sm text-gray-500">
              {group.numberOfMembers} members
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleGroupAction}
            disabled={actionLoading}
            className={`flex items-center gap-1 px-4 py-2 font-bold transition-all border-2 rounded-lg ${
              isMember
                ? "border-red-500 text-red-500 hover:bg-red-50"
                : "border-secondary text-secondary hover:bg-primary hover:text-white hover:border-primary"
            }`}
          >
            {actionLoading ? (
              <div className="flex items-center gap-2">
                <span>Processing...</span>
                <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : isMember ? (
              "Leave Group"
            ) : (
              "Join Group"
            )}
          </button>
          
          <button
            onClick={() => {
              if (!isMember) {
                toast.info("You need to join the group first to create posts");
                return;
              }
              resetPostForm();
              setShowPostForm(true);
            }}
            className={`flex items-center gap-1 px-4 py-2 font-bold transition-all border-2 rounded-lg ${
              isMember
                ? "border-secondary text-secondary hover:bg-primary hover:text-white hover:border-primary"
                : "border-gray-400 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiPlus className="font-bold" /> Create Post
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col-reverse gap-10 py-5 md:flex-row">
        {/* Posts section */}
        <div className="px-1 basis-2/3">
          {/* Post creation/editing form */}
          {showPostForm && (
            <div className="p-4 mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold">
                  {editingPost ? "Edit Post" : "Create Post"}
                </h3>
                <button
                  onClick={resetPostForm}
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
                        {typeof image === "string" ? (
                          <img
                            src={image}
                            alt={`preview-${index}`}
                            className="object-cover w-20 h-20 rounded-lg"
                          />
                        ) : image.type.startsWith("image/") ? (
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
                      <span className="mr-2">
                        {editingPost ? "Updating..." : "Posting..."}
                      </span>
                      <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                    </span>
                  ) : editingPost ? (
                    "Update Post"
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
              <div key={post.id} className="relative border-t border-gray-300 py-7">
                <div className="flex items-center justify-between gap-5 mb-4">
                  <div className="flex items-center gap-5">
                    <img
                      src={post.userPhoto || defaultUserImage}
                      alt="profile"
                      className="object-cover w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.target.src = defaultUserImage;
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
                  <div className="relative">
                    <button
                      onClick={(e) => togglePostOptions(post.id, e)}
                      className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
                    >
                      <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
                    </button>
                    
                    {/* Post options dropdown */}
                    {showOptionsForPost === post.id && (
                      <div 
                        ref={optionsRef}
                        className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        {currentUser?.id === post.userId ? (
                          <>
                            <button
                              onClick={() => {
                                handleEditPost(post);
                                setShowOptionsForPost(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FontAwesomeIcon icon={faEdit} className="mr-2" />
                              Edit Post
                            </button>
                            <button
                              onClick={() => {
                                handleDeletePost(post.id);
                                setShowOptionsForPost(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <FontAwesomeIcon icon={faTrash} className="mr-2" />
                              Delete Post
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              // Handle report functionality
                              toast.info("Post reported");
                              setShowOptionsForPost(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FontAwesomeIcon icon={faFlag} className="mr-2" />
                            Report Post
                          </button>
                        )}
                      </div>
                    )}
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
              {isMember
                ? "No posts in this community yet. Be the first to post!"
                : "Join the group to see posts"}
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