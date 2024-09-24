import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users);
      } catch (error) {
        setError('Erro ao buscar usuários');
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError('Erro ao excluir usuário');
    }
  };

  return (
    <div className="user-list-container">
      <h2>Lista de Usuários</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)} className="delete-button">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
