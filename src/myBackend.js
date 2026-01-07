import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where, writeBatch} from "firebase/firestore";
import { db } from "./firebaseApp";

const tokenKey = import.meta.env.VITE_SECRET_TOKEN

export const addTopic = async(name)=> {
    try {
        console.log(name);

        const collRef = collection(db, "topics")
        const q = query(collRef, where("name", "==", name)); // Kérdezd le azokat a dokumentumokat, amelyeknek a 'name' mezője megegyezik a paraméterrel
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Ha nem üres a querySnapshot, akkor már létezik ilyen nevű dokumentum
            console.log("Ez a téma már létezik!");
            return;
        }
        await addDoc(collRef, {name})
        
    } catch (error) {
        console.log(error); 
    }
}

export const addCard = async(topicId,card)=> {
    console.log(topicId);
    console.log(card);
    try {
        const subCollRef = collection(db, "topics", topicId, "cards")
        await addDoc(subCollRef, {...card})
    } catch (error) {
        console.log(error); 
    }
}

export const updateTopic = async (topicId, ujNev) => {
    try {
        const docRef = doc(db, "topics", topicId)
        await updateDoc(docRef, {name:ujNev})
    } catch (error) {
        console.log("Hiba a topic módosításánál!", error);
        
    }
}

export const updateCard = async (topicId, cardId, kartya) => {
    try {
        const docRef = doc(db, "topics", topicId, "cards", cardId)
        await updateDoc(docRef, {...kartya})
    } catch (error) {
        console.log("Hiba a kártya módosításánál!", error);
        
    }
}

export const readTopicsOnce = async (setTopics, setLoading)=> {
    try {
        const docRef = collection(db, "topics")
        //const snap = await getDocs(docRef)
        const q = query(docRef)
        //const snap = await getDocs(subDocRef)
        const unsubscribe = onSnapshot(q,(snapshot)=> {
            //setRecipes(snapshot.docs.map(doc => doc.data()))
            setTopics(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
            setLoading(false)
        })
        return unsubscribe
        //setTopics(snap.docs.map((d)=>({id:d.id, ...d.data()})))

    } catch (error) {
        console.log("hiba a téma lekérésnél: ", error);
        return null
    }
}

export const readCardsOnce = async (topicId, setCards, setLoading)=> {
    try {
        const subDocRef = collection(db, "topics", topicId, "cards")
        const q = query(subDocRef)
        //const snap = await getDocs(subDocRef)
        
        const unsubscribe = onSnapshot(q,(snapshot)=> {
            //setRecipes(snapshot.docs.map(doc => doc.data()))
            setCards(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
            setLoading(false)
        })
        return unsubscribe

    } catch (error) {
        console.log("hiba a kártya lekérésnél: ", error);
        return []
    }
}

export const deleteTopicWithCards = async (topicId) => {
 try {
    console.log(topicId);
    
  const topicRef = doc(db, "topics", topicId);
  const cardsRef = collection(topicRef, "cards");
  // 1) Lekérjük a kártyákat
  const cardsSnap = await getDocs(cardsRef);
  // 2) Batch törlés a kártyákra
  const batch = writeBatch(db);//a Firestore egyik beépített művelete, 
  // amivel több írást / törlést egyetlen tranzakcióban tudsz lefuttatni.
  // Ezért használjuk subcollection törlésére is.
  cardsSnap.forEach((card) => {
   batch.delete(card.ref);
  });
  await batch.commit(); // kártyák törlése kész
  // 3) Maga a témadokumentum törlése
  await deleteDoc(topicRef);
  console.log("Téma és összes kártya törölve:", topicId);
 } catch (error) {
  console.error("Téma törlési hiba:", error);
 }
};

export const deleteCard = async (topicId, cardId) => {
    try {
        await deleteDoc(doc(db, "topics", topicId, "cards", cardId))
    } catch (error) {
        console.log("Hiba a kártya törlésénél");
        
    }
}