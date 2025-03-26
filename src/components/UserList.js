import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchUsers } from "../api/userApi";
import { setUsers } from "../redux/userSlice"; 
import userIcon from "../assets/user-icon.png";
import "./UserList.css";

const UserList = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers(page);
      if (data.length === 0) return;

      const usersWithId = data.map((user) => ({
        ...user,
        id: user._id.toString(),
      }));

      dispatch(setUsers(usersWithId));
    };

    loadUsers();
  }, [page, dispatch]);

  useEffect(() => {
    if (!triggerRef.current || users.length < 10) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, { threshold: 1.0 });

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [users]);

  return (
    <div className="user-list-container">
      <ul className="user-list">
        {users.map((user, index) => (
          <li
            key={user._id}
            className="user-item"
            onClick={() => onSelect(user)}
            ref={index === users.length - 10 ? triggerRef : null}
          >
            <img src={userIcon} alt="User" className="user-icon" />
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="job-title">{user.jobTitle}</div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={observerRef} style={{ height: "20px", background: "transparent" }} />
    </div>
  );
};

export default UserList;
