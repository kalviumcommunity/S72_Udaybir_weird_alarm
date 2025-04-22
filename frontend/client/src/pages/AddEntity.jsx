import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddEntity = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [entities, setEntities] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchEntities = async (userId = '') => {
        try {
            let url = 'http://localhost:8000/alarms';
            if (userId) {
                url += `?created_by=${userId}`;
            }
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setEntities(data);
            } else {
                console.error('Failed to fetch entities');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchEntities();
    }, []);

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        fetchEntities(userId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            alert('Please select a user');
            return;
        }

        const newEntity = { name, description, created_by: selectedUser };

        try {
            const response = await fetch('http://localhost:8000/alarms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntity),
            });

            if (response.ok) {
                const addedEntity = await response.json();
                setEntities([...entities, addedEntity]);
                setName('');
                setDescription('');
            } else {
                console.error('Failed to add entity');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Entity</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <select
                    value={selectedUser}
                    onChange={handleUserChange}
                    required
                    className="w-full p-2 mb-3 border rounded"
                >
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name || user.username || user.email || user._id}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entity Name"
                    required
                    className="w-full p-2 mb-3 border rounded"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Entity Description"
                    required
                    className="w-full p-2 mb-3 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Entity
                </button>
            </form>

            <h3 className="text-lg font-semibold mb-2">Entities List</h3>
            <ul>
                {entities.map((entity) => (
                    <li key={entity._id} className="mb-2 border p-2 rounded flex justify-between items-center">
                        <div>
                            <strong>{entity.name}</strong>
                            <p>{entity.description}</p>
                        </div>
                        <Link
                            to={`/update/${entity._id}`}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddEntity;
