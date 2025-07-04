import { inventory, recentOrders, checklists, InventoryItem } from '@/data/operations';

// In a real app, this would fetch data from a database like Firestore.
// We're using a delay to simulate a network request.

const FAKE_DELAY = 700;

export async function getInventory() {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY));
    return inventory;
}

export async function getRecentOrders() {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY));
    return recentOrders;
}

export async function getChecklists() {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY));
    return checklists;
}

export async function getOperationsStats(inventoryData: InventoryItem[]) {
    await new Promise(resolve => setTimeout(resolve, 0)); // No delay for calculation
    
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
