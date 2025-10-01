import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/slice/chatSlice";
import SlidebarSkeleton from "./skeletons/SlidebarSkeleton";
import { Users } from "lucide-react";
import {setSelectedUser} from "../store/slice/chatSlice"

const SideBar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { users, selectedUser, isUsersLoading } = useSelector(
    (state) => state.chat 
  );
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    console.log(dispatch(getUsers()))
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers?.includes(user._id))
    : users;

  if (isUsersLoading) return <SlidebarSkeleton />;

  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200 bg-white rounded-md">
        {/* Header */}
        <div className="border-b border-gray-200 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-700" />
            <span className="font-medium hidden lg:block text-gray-800">
              Contacts
            </span>
          </div>
          {/* Online Only Filter */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                className="w-4 h-4 border-gray-700 text-blur-600 focus:ring-blue-500"
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
              />
              Show Online Only
            </label>
            <span className="text-xs text-gray-500 ">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>

        
        {/* Users List */}
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers?.length > 0 &&
            filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`w-full p-3 flex items-center gap-3 transition-colors rounded-md ${
                  selectedUser?._id === user._id
                    ? "bg-gray-200 ring-gray-200"
                    : "hover:bg-gray-200"
                }`}
              >
                {/* avatar */}
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user?.avatar?.url || "/avatar-holder.avif"}
                    alt={"/avatar-holder.avif"}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2" />
                  )}
                </div>

                {/* User Info */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {user.fullName}
                  </div>
                  <div className="text-sm text-gray-500 ">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))}
          {filteredUsers?.length === 0 && (
            <div className="text-center text-gray-500 py-4 ">
              No Online User
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
