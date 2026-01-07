import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';
import { updateTopic } from '../myBackend';

const EditTopic = () => {
    const { valasztottTopic } = useContext(MyUserContext);
    const navigate = useNavigate();
    const [cim, setCim] = useState(valasztottTopic.name);

    const handleSubmit = () => {
        updateTopic(valasztottTopic.id, cim)
        navigate("/")
        //if (!kerdes.trim() || !valasz.trim()) return;
        //addCard(valasztottTopic.id, { question: kerdes, answer: valasz });
        //navigate("/topic");
    };

    return (
        <div className="addcard-container">

            <div className="addcard-box">

                <h1 className="addcard-title">
                    Témacím módosítása
                </h1>


                {/* Question */}
                <div className="input-group">
                    <label className={cim ? "filled" : ""}></label>
                    <input 
                        type="text"
                        value={cim}
                        onChange={e => setCim(e.target.value)}
                    />
                </div>

                <button 
                    className="save-btn"
                    onClick={handleSubmit}
                >
                    Mentés
                </button>

                <button 
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    Vissza
                </button>

            </div>
        </div>
    );
}

export default EditTopic
