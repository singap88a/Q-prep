/* eslint-disable react/prop-types */
 import PostItem from "./PostItem";

export default function PostList({ 
  posts, 
  isMember,
  currentUser,
  onPostDeleted,
  onPostUpdated
}) {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            isMember={isMember}
            currentUser={currentUser}
            onPostDeleted={onPostDeleted}
            onPostUpdated={onPostUpdated}
          />
        ))
      ) : (
        <div className="py-8 text-center text-gray-500">
          {isMember
            ? "No posts in this community yet. Be the first to post!"
            : "Join the group to see posts"}
        </div>
      )}
    </div>
  );
}