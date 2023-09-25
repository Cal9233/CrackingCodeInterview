//Two Pointers is used to compare between data to find the target.
//commonly used as "fast/slow" or "start/end"

//Example of fast/slow

//Linked Lists have nodes that point to another node, so fast node jumps every two nodes
//while slow jumps on every node. Eventually they will both meet at the end

function hasCircle(node) {
  let slow = node;
  let fast = node;

  while(slow !== null && fast !== null && fast.next !== null){
    slow = slow.next; //slow increments to next node
    fast = fast.next.next; //fast increments every two nodes
    if(slow === fast){
      return true; //if they equal the same then there is an end making it a circle
    }
  }
  return false;
}

//fast/slow pointers are used to compare element to element, however the sliding window Algo is used to compare element to complete array.

//There are types of Sliding Windows, like 'Fixed Windows' and 'Dynamically-sized sliding Window'

//Fixed Windows iterates through array as a sub-arry, calculating the set numbers in sub-array and subtracts it by the previously first element when it
//iterates to the next element

//Example of 'Fixed' sliding window

function findAverageOfSubarrays(arr, k) {
  const result = [];
  let windowStart = 0;
  let windowSum = 0;

  for(let windowEnd = 0; windowEnd < arr.length; windowEnd++){
    //add new element to window sum
    windowSum += arr[windowEnd];

    //if we have reached the window size, calc avg and add to result
    if(windowEnd >= k - 1){
      result.push(windowSum / k);
      //remove the left most element from window
      windowSum -= arr[windowStart];
      windowStart++;
    }
  }

  return result;
}

//example of Dynamically sized sliding window

function findLongestSubstring(str){
  let charIndexMap = {};
  let maxLength = 0;
  let windowStart = 0;

  for(let windowEnd = 0; windowEnd < str.length; windowEnd++){
    const currentStr = str[windowEnd];

    // If the character is already in the window and its index is greater than or equal to windowStart,
    // update windowStart to the next index of the repeated character.
    if(charIndexMap[currentStr] !== undefined && charIndexMap[currentStr] >= windowStart){
      windowStart = charIndexMap[currentStr] + 1;
    }

    // Update the character's index in the map
    charIndexMap[currentStr] = windowEnd;

    // Update the maximum length
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}