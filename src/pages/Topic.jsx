import React, { useContext, useEffect, useState } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { useNavigate } from 'react-router';
import { deleteCard, readCardsOnce } from '../myBackend';
import HomeButton from '../components/HomeButton';
import MyModal from '../components/MyModal';
import { MyAuthContext } from '../context/AuthContext';
import { Button, Spinner } from 'reactstrap';
import { IoExitOutline } from 'react-icons/io5';
import { FaLongArrowAltRight, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { CiEdit } from 'react-icons/ci';

const Topic = () => {
    const [open, setOpen] = React.useState(false);
    const { valasztottTopic } = useContext(MyUserContext);
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const {hasAccess, setMsg, clearKey} = useContext(MyAuthContext)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [atVigyenE, setAtVigyenE] = useState(false)

    const handleClick2 = () => {
        setAtVigyenE(false)
        if (!hasAccess) {
            setOpen(true)
        }
    }

    const handleClick = () => {
        setAtVigyenE(true)
        if (hasAccess) {
            navigate("/addcard")
        }else {
            setOpen(true)
        }
    }

    useEffect(() => {
        readCardsOnce(valasztottTopic.id, setTopics, setLoading);
    }, []);

    // useEffect(()=>{
    //     ()=>navigate("/addcard")
    //     console.log(hasAccess);
    // },[hasAccess])

    return (
        <div className="topic-container">
            
            <HomeButton />

            <div className="topic-header">
                <div style={{height:'0'}}></div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                <h1>{valasztottTopic.name}</h1>
                </div>
                <div className='gombKozepre' style={{display:'flex', justifyContent:'end', gap:'10px'}}>
                <Button color="primary" className="add-btn" onClick={handleClick}>
                    <FaPlus /> Új kártya
                </Button>
                                {!hasAccess && !isLoading && <Button
                                className="add-btn"
                                onClick={handleClick2}
                                ><IoExitOutline/> Belépés</Button>}
                </div>
            </div>
                            {hasAccess &&
                                <Button 
                    color="danger" 
                    className="add-btn exit-btn"
                    
                    onClick={
                        // () => navigate("/addtopic"),
                      ()=>{
                        setMsg({jo:'Admin módbol kilépve'})
                        clearKey()
                        navigate("/")
                      }
                    }
                >
                    <IoExitOutline /> Adminból kilépés
                </Button>}

            {isLoading ? (
                <div className="loading-box">
                    <Spinner color="light" />
                    <p>Töltés...</p>
                </div>
            ) : topics.length >0 ? <div className="topic-grid">
                <div className='kozep'>
                {topics && topics.length > 0 &&
                    <FlipCard key={topics[currentIndex].id} topicId={valasztottTopic.id} obj={topics[currentIndex]} hasAccess={hasAccess} />
                }
            
                </div>
                <div style={{display:'flex',alignItems:'center', width:'230px', justifyContent:'space-between', paddingTop:'25px'}}>
                    <Button onClick={0<currentIndex ? ()=>setCurrentIndex(currentIndex-1) : ()=>setCurrentIndex(topics.length-1)}><FaLongArrowAltLeft/></Button>
                    <div>{currentIndex+1}/{topics.length}</div>
                    <Button onClick={topics.length-1>currentIndex ? ()=>setCurrentIndex(currentIndex+1) : ()=>setCurrentIndex(0)}><FaLongArrowAltRight/></Button>
                </div>
            </div> : <h3 style={{textAlign:'center'}}>Még nincs egy kártya sem hozzáadva</h3> }
                                    
                                    <MyModal open={open} setOpen={setOpen} onSuccess={()=>navigate("/addcard")} atVigyenE={atVigyenE}/>
        </div>
        
    );
};

export default Topic;



// --- Flip Card Component ---
const FlipCard = ({topicId, obj, hasAccess}) => {
    const [flipped, setFlipped] = useState(false);
    const {setValasztottKartya} = useContext(MyUserContext);

    const kartyaTorles = (e, id) => {
        e.stopPropagation();
        deleteCard(topicId, id)
    }

    const navigate = useNavigate()

    const kartyaModositas = (e, obj) => {
        e.stopPropagation();
        if (!hasAccess) {
            setOpen(true)
        }else {
            setValasztottKartya(obj)
            navigate("/editcard/")
        }
    }

    return (
        <div 
            className={`flip-card ${flipped ? "flipped" : ""}`} 
            onClick={() => setFlipped(!flipped)}
        >
            <div className="flip-inner">
                
                {/* FRONT = Question */}
                <div className="flip-front">
                    <h3>{obj.question}</h3>
                </div>

                {/* BACK = Answer */}
                <div className="flip-back">
                    <h3>{obj.answer}</h3>
                </div>

                {hasAccess && !flipped && (<> <div className='glass-btnk balos' style={{cursor:'pointer'}} onClick={(e)=>kartyaTorles(e, obj.id)}><FaRegTrashAlt height={"0.8em"} width={"0.8em"}/></div>
                      <div className='glass-btnk jobbos' style={{cursor:'pointer'}} onClick={(e)=>kartyaModositas(e, obj)} ><CiEdit    /></div></>)}

            </div>
        </div>
    );
};
