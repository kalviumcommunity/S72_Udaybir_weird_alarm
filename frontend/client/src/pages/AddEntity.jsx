import { useState } from 'react';

const AddEntity = ({ onEntityAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEntity = { name, description };

        try {
            const response = await fetch('http://localhost:8000/entities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntity),
            });

            if (response.ok) {
                const addedEntity = await response.json();
                onEntityAdded(addedEntity);  // Update UI with new entity
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
        <div className="p-4 border rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Entity</h2>
            <form onSubmit={handleSubmit}>
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
        </div>
    );
};

export default AddEntity;
