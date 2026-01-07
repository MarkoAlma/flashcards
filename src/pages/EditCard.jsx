import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';
import { updateCard } from '../myBackend';

const EditCard = () => {
    const {valasztottTopic, valasztottKartya } = useContext(MyUserContext);
    const navigate = useNavigate();
    const [kerdes, setKerdes] = useState(valasztottKartya.question);
    const [valasz, setValasz] = useState(valasztottKartya.answer);    

    const handleSubmit = () => {
        updateCard(valasztottTopic.id, valasztottKartya.id, {question:kerdes, answer:valasz})
        navigate("/topic")
        //if (!kerdes.trim() || !valasz.trim()) return;
        //addCard(valasztottTopic.id, { question: kerdes, answer: valasz });
        //navigate("/topic");
    };

    return (
        <div className="addcard-container">

            <div className="addcard-box">

                <h1 className="addcard-title">
                    Kártya módosítása
                </h1>


                {/* Question */}
                <div className="input-group">
                    <label className={kerdes ? "filled" : ""}></label>
                    <input 
                        type="text"
                        value={kerdes}
                        onChange={e => setKerdes(e.target.value)}
                    />
                </div>

                {/* Answer */}
                <div className="input-group">
                    <label className={valasz ? "filled" : ""}></label>
                    <input 
                        type="text"
                        value={valasz}
                        onChange={e => setValasz(e.target.value)}
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
                    onClick={() => navigate("/topic")}
                >
                    Vissza
                </button>

            </div>
        </div>
    );
}

export default EditCard
