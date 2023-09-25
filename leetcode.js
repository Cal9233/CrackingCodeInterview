// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
 

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false
let s = "(}[]{}";

var isValid = function(s) {
    let stack = [];
    let v = {
        '(': ')',
        '{': '}',
        '[': ']'
    }

    for(let char of s){
        if(char === '[' || char === '(' || char === '{'){
            stack.push(char);
        } else {
            if(char === v[stack[char]]) stack.shift();
        }
    }

    return stack.length > 0;
};

//Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

var generateParenthesis = function(n) {
    let combinations = [];

    function generate(current, open, close) {
        if(current.length === 2 * n){
            combinations.push(current);
            return;
        }
        if(open < n){
            generate(current + '(', open + 1, close);
        }
        if(close < open) {
            generate(current + ')', open, close + 1);
        }
    };


    generate('', 0, 0);

    return combinations;
};

function generateHashtag (str) {
    if(str.length === 0) return false;
    str = str.trim();
    str = str.split(' ');
    let result = str.map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join('');
    result = '#' + result;
    return result.length <= 140 ? result : false;
}

// Given an array of integers, find the one that appears an odd number of times.
// There will always be only one integer that appears an odd number of times.

function findOdd(A) {
    let result = 0;
  
    for (const num of A) {
      result ^= num;
    }
  
    return result;
}

//Used bitwise XOR operation to solve
// The XOR operation has a property that when you XOR two identical numbers, the result is 0, and when you XOR any number with 0, 
// the result is the number itself. Therefore, XORing all the elements in the array will cancel out the even occurrences of numbers, 
// leaving you with the integer that appears an odd number of times. 

// In this code, we initialize result to 0 and then loop through the array. In each iteration, we XOR the current number in the array with 
// the result. Since XORing an even number of occurrences of the same number will result in 0, and XORing with 0 leaves the number unchanged, 
// the final result will be the integer that appears an odd number of times.

