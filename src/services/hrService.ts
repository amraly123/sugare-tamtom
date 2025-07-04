import { employees, stats } from '@/data/hr';

// In a real app, this would fetch data from a database like Firestore.
// We're using a delay to simulate a network request.

export async function getEmployees() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return employees;
}

export async function getHrStats() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return stats;
}
