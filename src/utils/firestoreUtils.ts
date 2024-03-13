import { FirebaseError, initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_CONFIG } from "@environment";
import { Appeal, Driver, TrafficViolation } from "@types";

export function getFirestoreUtils() {
  const app = initializeApp(FIREBASE_CONFIG);
  const db = getFirestore(app);

  const handleFetchAllDocs = async (collectionName: string): Promise<unknown> => {
    try {
      const dataCollection = collection(db, collectionName);
      const dataSnapshot = await getDocs(dataCollection);
      if (!dataSnapshot) return null;
      return dataSnapshot.docs.map((doc) => doc.data());
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
      return dataSnapshot.data();
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
      return dataSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSetDoc = async (
    collectionName: string,
    data: Driver | TrafficViolation | Appeal,
    merge: boolean,
  ): Promise<void> => {
    try {
      const dataDocument = doc(db, collectionName, data.id);
      await setDoc(dataDocument, data, { merge });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteDoc = async (
    collectionName: string,
    data: Driver | TrafficViolation | Appeal,
  ): Promise<void> => {
    try {
      const dataDocument = doc(db, collectionName, data.id);
      await deleteDoc(dataDocument);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCustomErrorMessage = (error: unknown) => {
    const errorMessage =
      error instanceof FirebaseError && error.message.includes("Missing or insufficient permissions")
        ? "Você não possui permissões suficientes para prosseguir com esta ação."
        : "Houve um erro durante esta operação. Por favor, tente novamente mais tarde.";
    return errorMessage;
  };

  const getTimestamp = () => {
    return serverTimestamp();
  };

  return {
    app,
    db,
    fetchAllDocs: handleFetchAllDocs,
    fetchDocById: handleFetchDocById,
    fetchDocsByQuery: handleFetchDocByQuery,
    setDoc: handleSetDoc,
    deleteDoc: handleDeleteDoc,
    getCustomErrorMessage,
    getTimestamp,
    collectionNames: {
      drivers: "drivers",
      trafficViolations: "traffic-violations",
      appeals: "appeals",
      employees: "employees",
    },
  };
}
