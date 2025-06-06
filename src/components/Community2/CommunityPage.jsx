import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import CommunityHeader from "./CommunityHeader";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { getImageUrl } from "./utils";
import Community_right from "./Community_right";

function CommunityPage1() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [group, setGroup] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const postFormRef = useRef(null);

  // Fetch current user data and membership status
  useEffect(() => {
    const fetchCurrentUserAndMembership = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // First get the current user
        const userResponse = await axios.get(
          "https://redasaad.azurewebsites.net/api/Account/GetUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(userResponse.data);

        // Then check membership status
        try {
          // const membershipResponse = await axios.get(
          //   `https://redasaad.azurewebsites.net/api/UserGroup/IsMember/${groupId}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );

          // setIsMember(membershipResponse.data);
          localStorage.setItem(`group_${groupId}_membership_${userResponse.data.id}`, membershipResponse.data);
        } catch (membershipError) {
          // console.error("Error checking membership:", membershipError);
          // If membership check fails, use the saved value for this specific user
          const savedMembership = localStorage.getItem(`group_${groupId}_membership_${userResponse.data.id}`) === 'true';
          setIsMember(savedMembership);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          toast.error("Failed to load user data");
        }
      }
    };

    fetchCurrentUserAndMembership();
  }, [groupId, navigate]);

  // Fetch group data and posts
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const [groupResponse, postsResponse] = await Promise.all([
          axios.get(
            `https://redasaad.azurewebsites.net/api/Groups/GetGroupById/${groupId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios
            .get(
              `https://redasaad.azurewebsites.net/api/Posts/GetAllPosts/${groupId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
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

        // Process posts with proper image URLs and user-specific like status
        const processedPosts = await Promise.all(postsResponse.data.map(async (post) => {
          try {
            // الحصول على قائمة اللايكات لكل منشور
            // const likesResponse = await axios.get(
            //   `https://redasaad.azurewebsites.net/api/Likes/AddLike/${post.postId || post.id}`,
            //   {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //   }
            // );
            // consol.log("likesResponse:", likesResponse)

            // const isLiked = likesResponse.data.includes(currentUser.id);
            // const likesCount = likesResponse.data.length;

            return {
              ...post,
              id: post.postId || post.id,
              userId: post.userId,
              images: Array.isArray(post.images)
                ? post.images.map((img) => getImageUrl(img, "post"))
                : post.imageUrl
                  ? [getImageUrl(post.imageUrl, "post")]
                  : [],
              createdDate: post.postDate || post.createdDate || new Date().toISOString(),
              userName: post.userName || "Anonymous",
              userPhoto: getImageUrl(post.userPhoto, "profile"),
              text: post.text || post.content || "",
              // khaly balak
              likesCount:post?.likes,
              isLiked: post.isLiked,
            };
          } catch (err) {
            console.error("Error fetching likes for post:", err);
            return {
              ...post,
              id: post.postId || post.id,
              userId: post.userId,
              images: Array.isArray(post.images)
                ? post.images.map((img) => getImageUrl(img, "post"))
                : post.imageUrl
                  ? [getImageUrl(post.imageUrl, "post")]
                  : [],
              createdDate: post.postDate || post.createdDate || new Date().toISOString(),
              userName: post.userName || "Anonymous",
              userPhoto: getImageUrl(post.userPhoto, "profile"),
              text: post.text || post.content || "",
              likesCount: post.likes || 0,
              isLiked: false,
            };
          }
        }));

        console.log(processedPosts)

        setPosts(processedPosts);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        toast.error("Failed to load community data");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (groupId && currentUser) {
      fetchData();
    }
  }, [groupId, navigate, currentUser]);

  // Handle join/leave group
  const handleGroupAction = async () => {
    if (!group || !currentUser) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (isMember) {
        await axios.post(
          "https://redasaad.azurewebsites.net/api/UserGroup/LeaveGroup",
          {
            connectionId: group.id,
            groupName: group.groupName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsMember(false);
        localStorage.setItem(`group_${groupId}_membership_${currentUser.id}`, 'false');

        // Fetch updated group data after leaving
        const updatedGroupResponse = await axios.get(
          `https://redasaad.azurewebsites.net/api/Groups/GetGroupById/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGroup(updatedGroupResponse.data);

        toast.success(`Left group ${group.groupName}`);
      } else {
        await axios.post(
          "https://redasaad.azurewebsites.net/api/UserGroup/JoinGroup",
          {
            connectionId: group.id,
            groupName: group.groupName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsMember(true);
        localStorage.setItem(`group_${groupId}_membership_${currentUser.id}`, 'true');

        // Fetch updated group data after joining
        const updatedGroupResponse = await axios.get(
          `https://redasaad.azurewebsites.net/api/Groups/GetGroupById/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGroup(updatedGroupResponse.data);

        toast.success(`Joined group ${group.groupName}`);
      }
    } catch (error) {
      console.error("Error in group action:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setEditingPost(null);
    setShowPostForm(false);
  };

  const scrollToForm = () => {
    if (postFormRef.current) {
      postFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      < ToastContainer />

      <CommunityHeader
        group={group}
        currentUser={currentUser}
        isMember={isMember}
        actionLoading={actionLoading}
        onGroupAction={handleGroupAction}
        onShowPostForm={() => {
          setEditingPost(null);
          setShowPostForm(true);
          setTimeout(scrollToForm, 100);
        }}
      />

      <div className="flex flex-col-reverse gap-10 py-5 md:flex-row">
        <div className="px-1 basis-2/3">
          {showPostForm && (
            <div ref={postFormRef}>
              <PostForm
                groupId={groupId}
                isMember={isMember}
                currentUser={currentUser}
                onClose={() => {
                  setShowPostForm(false);
                  setEditingPost(null);
                }}
                onPostCreated={(newPost) => setPosts([newPost, ...posts])}
                onPostUpdated={handlePostUpdated}
                editingPost={editingPost}
              />
            </div>
          )}

          <PostList
            posts={posts}
            isMember={isMember}
            currentUser={currentUser}
            onPostDeleted={(postId) => setPosts(posts.filter(p => p.id !== postId))}
            onPostUpdated={(post) => {
              setEditingPost(post);
              setShowPostForm(true);
              setTimeout(scrollToForm, 100);
            }}
          />
        </div>

        <div className="basis-1/3">
          <Community_right />
        </div>
      </div>
    </div>
  );
}

export default CommunityPage1;