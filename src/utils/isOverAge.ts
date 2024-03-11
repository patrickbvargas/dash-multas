export function isOverAge(inputBirthdate: string, inputAge: number): boolean {
  try {
    const today = new Date();
    const birthDate = new Date(inputBirthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isAfterBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    return age > inputAge || (age === inputAge && isAfterBirthday);
  } catch (error) {
    console.error(error);
    return false;
  }
}
