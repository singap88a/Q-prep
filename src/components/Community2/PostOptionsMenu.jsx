/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFlag,
 } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function PostOptionsMenu({
  post,
  currentUser,
  onClose,
  onPostDeleted,
  onPostUpdated
}) {
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `https://redasaad.azurewebsites.net/api/Posts/DeletePost/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onPostDeleted(post.id);
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post");
    }
  };

  const handleEditPost = () => {
    onPostUpdated(post); // This should trigger the PostForm to open in edit mode
    onClose();
  };

  const handleReportPost = () => {
    toast.info("Post reported");
    onClose();
  };

  return (
    <div 
      ref={optionsRef}
      className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
    >
      {currentUser?.id === post.userId ? (
        <>
          <button
            onClick={handleEditPost}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Edit Post
          </button>
          <button
            onClick={handleDeletePost}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete Post
          </button>
        </>
      ) : (
        <button
          onClick={handleReportPost}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faFlag} className="mr-2" />
          Report Post
        </button>
      )}
    </div>
  );
}