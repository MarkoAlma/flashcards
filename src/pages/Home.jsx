import React, { useContext, useEffect, useState } from 'react';
import { deleteTopicWithCards, readTopicsOnce } from '../myBackend';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';
import { Button, Spinner, Card, CardBody } from 'reactstrap';
import { FaPlus} from "react-icons/fa";
import MyModal from '../components/MyModal';
import { MyAuthContext } from '../context/AuthContext';
import { IoExitOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const Home = () => {

    const [open, setOpen] = React.useState(false);

    const {hasAccess, clearKey, setMsg} = useContext(MyAuthContext)

    const [topics, setTopics] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [atVigyenE, setAtVigyenE] = useState(false)

    useEffect(() => {
        readTopicsOnce(setTopics, setLoading);
    }, []);

    const navigate = useNavigate();
    const { setValasztottTopic } = useContext(MyUserContext);

    const handleSubmit = (obj) => {
        setValasztottTopic(obj);
        navigate("/topic");
    };

    const handleClick = ()=> {
        setAtVigyenE(true)
        if (hasAccess) {
            navigate("/addtopic")
        }else {
            setOpen(true)
        }
    }

    const handleClick2 = ()=> {
        setAtVigyenE(false)
        if (!hasAccess) {
            setOpen(true)
        }
    }

    const torles = (e, id) => {
        e.stopPropagation();
        deleteTopicWithCards(id)
        setMsg({jo:"Téma kitörölve!"})
    }

    const modositas = (e, obj) => {
        e.stopPropagation();
        if (!hasAccess) {
            setOpen(true)
        }else {
            setValasztottTopic(obj)
            navigate("/edittopic/")
        }
    }

    return (
        <div className="home-container">      
            <div className="header-row">
                <h1 className="main-title"> Témakörök</h1>
                <div style={{display:'flex', gap:'10px'}}>
                {!isLoading && <Button 
                    color="primary" 
                    className="add-btn"
                    onClick={handleClick}
                >
                    
                    <FaPlus /> Új témakör
                    
                </Button> }

                {!hasAccess && !isLoading && <Button
                className="add-btn"
                onClick={handleClick2}
                ><IoExitOutline/>Belépés</Button>}
                </div>
                {hasAccess && !isLoading &&
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
            </div>
            <MyModal open={open} setOpen={setOpen} onSuccess={()=>navigate("/addtopic")} atVigyenE={atVigyenE}/>

            {isLoading ? (
                <div className="loading-box">
                    <Spinner color="light" />
                    <p>Töltés...</p> 
                </div>
            ) : (
                <div className="topics-grid">
                    {topics.length > 0 ? (
                        topics.map(obj => (
                            <Card 
                                key={obj.id} 
                                className="topic-card"
                                onClick={() => handleSubmit(obj)}
                            >
                                <CardBody>
                                    <h3>{obj.name}</h3>
                                          
                                </CardBody>
                                {hasAccess && (<> <div className='glass-btnk balos' style={{cursor:'pointer'}} onClick={(e)=>torles(e, obj.id)}><FaRegTrashAlt height={"0.8em"} width={"0.8em"}/></div>
      <div className='glass-btnk jobbos' style={{cursor:'pointer'}}  onClick={(e)=>modositas(e, obj)}><CiEdit    /></div></>)}
                            </Card>
                        ))
                    ) : (
                        <h2 className="empty-text">Nincs még témakör</h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
