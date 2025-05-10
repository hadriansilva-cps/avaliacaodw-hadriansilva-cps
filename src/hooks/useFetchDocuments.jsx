import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useFetchDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const collectionRef = collection(db, "suaColecao"); 
        const q = query(collectionRef, orderBy("campoDeOrdenacao")); 

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            setDocuments(docs);
            setLoading(false);
          },
          (err) => {
            setError(err);
            setLoading(false);
          }
        );


        return () => unsubscribe();
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []); 

  return { documents, loading, error };
};