// Your solution goes here
function isStrongPassword(password) {
  let strong = true;
  if (password.length < 8) {
    return false;
  }
  if (password.includes("password")) return false;
  if (!password.match(/[a-z]/)) {
    return false;
  }
  return true;
}
