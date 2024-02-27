// Put your solution here
function divideArray(nums) {
  let even = [];
  let odd = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      even.push(nums[i]);
    } else {
      odd.push(nums[i]);
    }
  }
  even.sort((a, b) => a - b);
  odd.sort((a, b) => a - b);
  return printOut(even, odd);
}

function printOut(even, odd) {
  // Even numbers
  console.log("Even numbers:");
  if (even.length === 0) {
    console.log("None");
  } else {
    even.forEach((num) => console.log(num, "\n"));
  }
  // Odd numbers
  console.log("Odd numbers:");
  if (odd.length === 0) {
    console.log("None");
  } else {
    odd.forEach((num) => console.log(num, "\n"));
  }
}
