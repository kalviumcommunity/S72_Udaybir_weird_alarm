import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEntity = ({ onEntityUpdated, onEntityDeleted }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntity = async () => {
            try {
                const response = await fetch(`http://localhost:8000/alarms/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setDescription(data.description);
                } else {
                    setError('Failed to fetch entity');
                }
            } catch (err) {
                setError('Error fetching entity');
            } finally {
                setLoading(false);
            }
        };
        fetchEntity();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/alarms/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description }),
            });
            if (response.ok) {
                const updatedEntity = await response.json();
                onEntityUpdated(updatedEntity);
                navigate('/'); // Navigate back to list or home page
            } else {
                setError('Failed to update entity');
            }
        } catch (err) {
            setError('Error updating entity');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this entity?')) return;
        try {
            const response = await fetch(`http://localhost:8000/alarms/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onEntityDeleted(id);
                navigate('/'); // Navigate back to list or home page
            } else {
                setError('Failed to delete entity');
            }
        } catch (err) {
            setError('Error deleting entity');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-4 border rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Update Entity</h2>
            <form onSubmit={handleUpdate}>
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
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Update Entity
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete Entity
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEntity;
