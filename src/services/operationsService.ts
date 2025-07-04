import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { InventoryItem, Order, Checklist } from '@/data/operations';

export async function getInventory(): Promise<InventoryItem[]> {
  const inventoryCollection = collection(db, 'inventory');
  const snapshot = await getDocs(inventoryCollection);
  if (snapshot.empty) {
    console.warn("Firestore 'inventory' collection is empty. Please seed your database.");
    return [];
  }
  // Assuming the document ID is the SKU
  return snapshot.docs.map(doc => ({ ...doc.data(), sku: doc.id } as InventoryItem));
}

export async function getRecentOrders(): Promise<Order[]> {
  const ordersCollection = collection(db, 'orders');
  const snapshot = await getDocs(ordersCollection);
  if (snapshot.empty) {
    console.warn("Firestore 'orders' collection is empty. Please seed your database.");
    return [];
  }
  // Assuming the document ID is the order ID
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order));
}

export async function getChecklists(): Promise<Checklist[]> {
  const checklistsCollection = collection(db, 'checklists');
  const snapshot = await getDocs(checklistsCollection);
  if (snapshot.empty) {
    console.warn("Firestore 'checklists' collection is empty. Please seed your database.");
    return [];
  }
  // Assuming the document ID is the checklist ID
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Checklist));
}

export async function getOperationsStats(inventoryData: InventoryItem[]) {
    // This function remains unchanged as it operates on data passed to it.
    const totalStock = inventoryData.reduce((acc, item) => acc + item.stock, 0);

    const availableStock = inventoryData.filter(i => i.status === "متوفر").reduce((acc, item) => acc + item.stock, 0);
    const lowStock = inventoryData.filter(i => i.status === "كمية قليلة").reduce((acc, item) => acc + item.stock, 0);
    const outOfStockCount = inventoryData.filter(i => i.status === "نفذ المخزون").length;
    
    const inventoryStatusData = [
        { name: 'available', label: 'متوفر', value: availableStock, fill: 'hsl(var(--primary))' },
        { name: 'low', label: 'كمية قليلة', value: lowStock, fill: 'hsl(var(--accent))' },
        { name: 'out', label: 'نفذ المخزون', value: outOfStockCount, fill: 'hsl(var(--destructive))' },
    ].filter(d => d.value > 0);

    return {
        totalStock,
        inventoryAccuracy: 98.5, // This would also come from DB/calculation
        avgFulfillmentTime: "3.5 ساعات", // This would also come from DB/calculation
        inventoryStatusData,
        outOfStockCount
    };
}
