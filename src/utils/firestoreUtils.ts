import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { FIREBASE_CONFIG } from "@environment";

export function getFirestoreUtils() {
  const app = initializeApp(FIREBASE_CONFIG);
  const db = getFirestore(app);

  const handleFetchAllDocs = async (collectionName: string): Promise<unknown> => {
    try {
      const dataCollection = collection(db, collectionName);
      const dataSnapshot = await getDocs(dataCollection);
      if (!dataSnapshot) return null;
      const data = dataSnapshot.docs.map((doc) => {
        const docData = doc.data();
        return { ...docData, id: doc.id };
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFetchDocById = async (collectionName: string, id: string): Promise<unknown> => {
    try {
      const dataReference = doc(db, collectionName, id);
      const dataSnapshot = await getDoc(dataReference);
      if (!dataSnapshot) return null;
      const data = {
        ...dataSnapshot.data(),
        id: dataSnapshot.id,
      };
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFetchDocByQuery = async (
    collectionName: string,
    queryField: string,
    queryValue: string,
  ): Promise<unknown> => {
    try {
      const dataCollection = collection(db, collectionName);
      const dataQuery = query(dataCollection, where(queryField, "==", queryValue));
      const dataSnapshot = await getDocs(dataQuery);
      if (!dataSnapshot) return null;
      const data = dataSnapshot.docs.map((doc) => {
        const docData = doc.data();
        return { ...docData, id: doc.id };
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    db,
    fetchAllDocs: handleFetchAllDocs,
    fetchDocById: handleFetchDocById,
    fetchDocsByQuery: handleFetchDocByQuery,
    collectionNames: {
      drivers: "drivers",
      trafficViolations: "traffic-violations",
      appeals: "appeals",
      employees: "employees",
    },
  };
}
