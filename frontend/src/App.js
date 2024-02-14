import React, { useState } from 'react';

function App() {
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const newText = e.target.value;
        setText(newText);
        try {
            const response = await fetch(`/spellcheck/${newText}`);
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dynamic Spell Check</h1>
            <textarea className="form-control mb-3" rows="5" value={text} onChange={handleChange} />
            <div>
                <h2>Suggestions:</h2>
                <ul className="list-group">
                    {suggestions.map((item, index) => (
                        <li key={index} className="list-group-item">
                            {typeof item === 'string' ? item : `${item.word}: ${item.suggestions.join(', ')}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
