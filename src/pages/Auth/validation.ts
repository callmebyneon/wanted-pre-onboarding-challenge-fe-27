export const validateEmail = (text: string): boolean => {
  const emailReg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "g");
  if (emailReg.test(text)) {
    return true
  }
  return false;
}
export const validatePassword = (text: string): boolean => {
  if (text.trim().length >= 8) {
    return true
  }
  return false;
}