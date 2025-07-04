import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Employee } from '@/data/hr';


export async function getEmployees(): Promise<Employee[]> {
  const employeesCollection = collection(db, 'employees');
  const snapshot = await getDocs(employeesCollection);

  if (snapshot.empty) {
    console.warn("Firestore 'employees' collection is empty. Please seed your database.");
    return [];
  }
  // Assuming the document ID is the employee ID
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Employee));
}

export async function getHrStats() {
  const statsDocRef = doc(db, 'hr_stats', 'main');
  const docSnap = await getDoc(statsDocRef);
  
  // Also fetch employees to get a dynamic count
  const employeesSnapshot = await getDocs(collection(db, 'employees'));
  const totalEmployees = employeesSnapshot.size;

  if (docSnap.exists()) {
    return {
        ...docSnap.data(),
        totalEmployees: totalEmployees
    };
  } else {
    console.warn("Firestore 'hr_stats/main' document not found. Using default values.");
    return {
      totalEmployees: totalEmployees,
      newThisMonth: 0,
      attendance: 0,
    };
  }
}
