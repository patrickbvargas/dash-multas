export function getMaxBirthdateFor18YearsOld(): string | undefined {
  try {
    const today = new Date();
    const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxBirthdate.toISOString().split("T")[0];
  } catch (error) {
    console.error(error);
  }
}
