import { Employee } from "@types";
import { getFirestoreUtils, isEmployeeData } from "@utils";

export const fetchEmployees = async (): Promise<Employee[] | null> => {
  try {
    const fb = getFirestoreUtils();
    const data = await fb.fetchAllDocs(fb.collectionNames.employees);
    const validData = Array.isArray(data) ? data.filter(isEmployeeData) : null;
    return validData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEmployeeById = async (employeeId: string): Promise<Employee | null> => {
  try {
    if (!employeeId) throw new Error("Invalid employeeId");
    const fb = getFirestoreUtils();
    const data = await fb.fetchDocById(fb.collectionNames.employees, employeeId);
    const validData = isEmployeeData(data) ? data : null;
    return validData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
