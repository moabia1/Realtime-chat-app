import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/slice/authSlice";

const SideBar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const {users,selectedUser,isUsersLoading} = useSelector((state)=>state.chat)
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  
  return (
    <>
      <div>

      </div>
    </>
  );
};

export default SideBar;
