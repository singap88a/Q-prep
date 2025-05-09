/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { FiPlus } from "react-icons/fi";
import { getImageUrl } from "./utils";
import defaultUserImage from "../../assets/user.png";

export default function CommunityHeader({
  group,
  isMember,
  actionLoading,
  onGroupAction,
  onShowPostForm,
}) {
  return (
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
      
      <div className="flex gap-3">
        <button
          onClick={onGroupAction}
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
            onShowPostForm();
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
  );
}