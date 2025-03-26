const API_URL = "https://stormy-cove-93039-0eb30ae2b11f.herokuapp.com/api/users"; 

export const fetchUsers = async (page = 1, limit = 100) => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке пользователей");
  }
  return response.json();
};


export const updateUserApi = async (id, userData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении пользователя");
  }

  return response.json();
};