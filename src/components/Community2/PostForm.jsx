/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTimes,
   faVideo,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function PostForm({
  groupId,
  isMember,
  currentUser,
  onClose,
  onPostCreated,
  onPostUpdated,
}) {
  const [postText, setPostText] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Text");
  const [postLink, setPostLink] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [editingPost, setEditingPost] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPostImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitPost = async () => {
    if (!postText.trim() && postImages.length === 0 && !postLink) return;
    if (!isMember) return;

    try {
      setUploading(true);

      const formData = new FormData();
      postImages.forEach((image) => {
        formData.append("Images", image);
      });

      let finalText = postText;
      if (postLink) {
        finalText = postText ? `${postText}\n${postLink}` : postLink;
      }

      if (editingPost) {
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

        const updatedPost = {
          ...editingPost,
          text: finalText,
          images: postImages.length
            ? postImages.map((img) =>
                typeof img === "string" ? img : URL.createObjectURL(img)
              )
            : editingPost.images,
        };

        onPostUpdated(updatedPost);
        toast.success("Post updated successfully!");
      } else {
        const params = new URLSearchParams();
        params.append("groupId", groupId);
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
          userPhoto: currentUser?.photo,
          text: finalText,
          likesCount: 0,
          isLiked: false,
        };

        onPostCreated(newPost);
        toast.success("Post created successfully!");
      }

      onClose();
    } catch (err) {
      console.error("Error submitting post:", err);
      toast.error("Failed to submit post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">
          {editingPost ? "Edit Post" : "Create Post"}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

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
  );
}