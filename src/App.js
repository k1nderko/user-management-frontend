import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserList from "./components/UserList";
import UserEditor from "./components/UserEditor";
import "./styles.css";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSaveUser = (updatedUser) => {
    console.log("Сохраненные данные пользователя:", updatedUser);
  };

  return (
    <Provider store={store}>
      <div className="container">
        <UserList onSelect={setSelectedUser} />
        {selectedUser && (
        <UserEditor user={selectedUser} onSave={handleSaveUser} />

        )}
      </div>
    </Provider>
  );
};

export default App;
