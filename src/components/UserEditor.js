import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, updateUserInList } from '../redux/userSlice';
import "./UserEditor.css";

const UserEditor = ({ user, onSave }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
    company: "",
    jobTitle: "",
    age: "", 
    email: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name,
        department: user.department,
        company: user.company,
        jobTitle: user.jobTitle,
        age: user?.age || '',
        email: user?.email || '',
      });
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    
    const updatedUser = { ...user, ...form };
    
    if (!updatedUser.id) {
      console.error("ID пользователя отсутствует");
      return;
    }
    
    dispatch(updateUser(updatedUser))
      .then(() => {
        dispatch(updateUserInList(updatedUser));
      })
      .catch((error) => {
        console.error("Ошибка при обновлении пользователя:", error);
      });

    onSave(updatedUser);
  };

  return (
    <div className="editor">
      <h2>Edit User</h2>
      {user ? (
        <form onSubmit={handleSave}>
          <div className="editor-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              required
            />
          </div>
          <div className="editor-field">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              placeholder="Department"
              required
            />
          </div>
          <div className="editor-field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company"
              required
            />
          </div>
          <div className="editor-field">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              id="jobTitle"
              type="text"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              placeholder="Job Title"
              required
            />
          </div>
          <div className="editor-field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              placeholder="Age"
            />
          </div>
          <div className="editor-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>Select a user to edit.</p>
      )}
    </div>
  );
};

export default UserEditor;
