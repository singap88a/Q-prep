/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faShare,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import PostOptionsMenu from "./PostOptionsMenu";
// import { getImageUrl } from "./utils";
import defaultUserImage from "../../assets/user.png";

// Add URL detection function
const detectAndStyleLinks = (text) => {
  if (!text) return "";

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function PostItem({
  post,
  isMember,
  currentUser,
  onPostDeleted,
  onPostUpdated,
}) {

  const [showOptions, setShowOptions] = useState(false);

  // when refresh return false from zero
  const [liked, setLiked] = useState(false);
  console.log("liked", liked)
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiking, setIsLiking] = useState(false);
  // console.log("isLiking:", isLiking)

  const token = localStorage.getItem("token");




  // const handleLikePost = async () => {
  //   if (!currentUser) {
  //     toast.info("Please login to like posts");
  //     return;
  //   }

  //   if (!isMember) {
  //     toast.info("Join the group to like posts");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       toast.info("Please login to like posts");
  //       return;
  //     }

  //     // تحديث واجهة المستخدم بشكل فوري
  //     // const newLikedState = !liked;
  //     // setLiked(newLikedState);
  //     // setLikesCount((prev) => newLikedState ? prev + 1 : Math.max(0, prev - 1));

  //     // if (newLikedState) {
  //       try {
  //         // إضافة لايك
  //         await axios.post(
  //           `https://redasaad.azurewebsites.net/api/Likes/AddLike/${post.id}`,
  //           {},
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log("data", data)
  //         // return data
  //       } catch (err) {
  //         if (err.response?.status === 400 && err.response?.data === "You have already liked this post") {
  //           // إذا كان المنشور معجب به بالفعل، نترك الحالة كما هي
  //           setLiked((prev) => !prev);
  //           setLikesCount((prev) => liked ? prev + 1 : Math.max(0, prev - 1));
  //         } else {
  //           console.log("error in add Like")
  //           throw err;
  //         }
  //       }
  //     }catch(err){
  //       console.log(err)
  //     }
  //   //   else {
  //   //     // إزالة اللايك
  //   //     await axios.post(
  //   //       `https://redasaad.azurewebsites.net/api/Likes/RemoveLike/${post.id}`,
  //   //       {},
  //   //       {
  //   //         headers: {
  //   //           Authorization: `Bearer ${token}`,
  //   //         },
  //   //       }
  //   //     );
  //   //   }
  //   // } catch (err) {
  //   //   console.error("Error handling like:", err);
  //   //   // إعادة الحالة في حالة حدوث خطأ
  //   //   setLiked((prev) => !prev);
  //   //   setLikesCount((prev) => liked ? prev + 1 : Math.max(0, prev - 1));
  //   //   toast.error(`Failed to ${liked ? "unlike" : "like"} post`);
  //   // }

  // };


  const IsLiked = async () => {
    try {
      const res = await axios.post(
        `https://redasaad.azurewebsites.net/api/Likes?postId=${post.postId || post.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        });
      console.log("isLiked", res.data)
      setLiked(res.data.isLiked)
      return res.data
    } catch (err) {
      console.log("Error:", err)
    }
  }

  useEffect(() => {
    setLikesCount(post.likesCount);
    IsLiked()
  }, [post]);


  const addLike = async () => {
    const url = `https://redasaad.azurewebsites.net/api/Likes/AddLike/${post.postId || post.id}`;
    const res = await axios.post(url, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Add Like response:", res.data);
    return res.data;

  };

  const removeLike = async () => {
    const url = `https://redasaad.azurewebsites.net/api/Likes/RemoveLike/${post.postId || post.id}`;
    const res = await axios.post(url, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Remove Like response:", res.data);
    return res.data;
  };



  const handleLikePost = async () => {
    if (!currentUser) {
      toast.info("Please login to like posts");
      return;
    }

    if (!isMember) {
      toast.info("Join the group to like posts");
      return;
    }

    if (!token) {
      toast.info("Please login to like posts");
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    const previousLiked = liked;
    const previousLikesCount = likesCount;

    try {
      // when refresh
      // zero go to else so it 
      // make add and add return 
      // toast.info("You already liked this post");

      if (liked) {
        await removeLike();
        setLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        await addLike();
        setLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (err) {
      setLiked(previousLiked);
      setLikesCount(previousLikesCount);

      if (err.response?.status === 400 && err.response?.data === "You have already liked this post") {
        toast.info("You already liked this post");
      } else {
        toast.error("Something went wrong");
        console.error(err);
      }
    } finally {
      setIsLiking(false);

    }
  };





  const handleSharePost = async () => {
    try {
      const postUrl = `${window.location.origin}/community/${post.groupId}/post/${post.id}`;
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.userName}`,
          text: post.text?.substring(0, 100) || "Check out this post",
          url: postUrl,
        });
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

  return (
    <div className="relative border-t border-gray-300 py-7">
      <div className="flex items-center justify-between gap-5 mb-4">
        <div className="flex items-center gap-5">
          <img
            src={post.userImage ? `https://prep.blob.core.windows.net/photosprep/${post.userImage}` : defaultUserImage}
            alt="profile"
            className="object-cover w-12 h-12 rounded-full"
            onError={(e) => {
              e.target.src = defaultUserImage;
            }}
          />
          <div>
            <h3 className="text-xl font-semibold">{post.userName}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
              {new Date(post.createdDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
          </button>

          {showOptions && (
            <PostOptionsMenu
              post={post}
              currentUser={currentUser}
              onClose={() => setShowOptions(false)}
              onPostDeleted={onPostDeleted}
              onPostUpdated={onPostUpdated}
            />
          )}
        </div>
      </div>

      {post.text && (
        <p className="mb-4 text-gray-800 whitespace-pre-line">
          {detectAndStyleLinks(post.text)}
        </p>
      )}

      {post.images && post.images.length > 0 && (
        <div
          className={`grid gap-2 mb-4 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
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
          onClick={handleLikePost}
          className={`flex items-center gap-2 px-4 py-1 rounded-full max-w-[120px] 
            ${liked
              ? "text-red-500 bg-red-100"
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className="truncate">{likesCount} Likes</span>
        </button>

        <button
          onClick={handleSharePost}
          className="flex items-center gap-2 px-4 py-1 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faShare} />
          Share
        </button>

      </div>
    </div>
  );
}



// تحديث حالة اللايك عند تغيير البيانات من السيرفر
// useEffect(() => {
//   const checkLikeStatus = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token || !currentUser) return;

//       // التحقق من حالة اللايك من السيرفر
//       const response = await axios.get(
//         `https://redasaad.azurewebsites.net/api/Likes/GetLikes/${post.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // التحقق مما إذا كان المستخدم الحالي قد أعجب بالمنشور
//       const isLiked = response.data.includes(currentUser.id);
//       setLiked(isLiked);
//     } catch (err) {
//       console.error("Error checking like status:", err);
//     }
//   };

//   checkLikeStatus();
// }, [post.id, currentUser]);
