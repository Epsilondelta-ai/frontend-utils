import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
  writeBatch,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseApp } from "./client";

function getStore(): Firestore {
  return getFirestore(getFirebaseApp());
}

type AnyRecord = { [x: string]: any };
export type Document<T extends AnyRecord> = T & { id: string };

export async function createDocument<T extends AnyRecord>(
  collectionName: string,
  data: T
): Promise<Document<T>> {
  if (data.id) {
    const tmp = { ...data };
    const id = data.id;

    delete tmp.id;

    await setDoc(doc(getStore(), collectionName, id), tmp);

    return data as Document<T>;
  }

  const ref = await addDoc(collection(getStore(), collectionName), data);
  return { id: ref.id, ...data };
}

export async function createDocuments<T extends AnyRecord>(
  collectionName: string,
  data: T[]
): Promise<Document<T>[]> {
  const batch = writeBatch(getStore());

  data.forEach((item) => {
    if (item.id) {
      const tmp = { ...item };
      const id = item.id;

      delete tmp.id;

      batch.set(doc(getStore(), collectionName, id), tmp);
      return;
    }

    batch.set(doc(getStore(), collectionName), item);
  });

  await batch.commit();

  return data.map((item) => ({
    id: item.id,
    ...item,
  }));
}

/**
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 */
export async function readDocuments<T extends AnyRecord>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<Document<T>[]> {
  const q = query(collection(getStore(), collectionName), ...queryConstraints);
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Document<T>[];
}

export async function readDocument<T extends AnyRecord>(
  collectionName: string,
  id: string
): Promise<Document<T> | null> {
  const docRef = doc(getStore(), collectionName, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() } as Document<T>;
}

export function updateDocument<T extends AnyRecord>(
  collectionName: string,
  id: string,
  data: T
): Promise<void> {
  delete data.id;
  return updateDoc(doc(getStore(), collectionName, id), data);
}

export function updateDocuments<T extends AnyRecord>(
  collectionName: string,
  data: T[]
): Promise<void> {
  const batch = writeBatch(getStore());

  data.forEach((item) => {
    const id = item.id;
    delete item.id;
    batch.update(doc(getStore(), collectionName, id), item);
  });

  return batch.commit();
}

export function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  return deleteDoc(doc(getStore(), collectionName, id));
}

export function deleteDocuments(
  collectionName: string,
  ids: string[]
): Promise<void> {
  const batch = writeBatch(getStore());

  ids.forEach((id) => {
    batch.delete(doc(getStore(), collectionName, id));
  });

  return batch.commit();
}
