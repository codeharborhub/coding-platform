import { Problem } from "../types/types";

export const sampleProblems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    problemStatement: 
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    inputFormat: 
      "The first line contains an array of integers separated by commas. The second line contains the target sum.",
    outputFormat: 
      "Return the indices of the two numbers that add up to the target as an array [index1, index2].",
    constraints: 
      "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    sampleInputs: ["2,7,11,15\n9", "3,2,4\n6", "3,3\n6"],
    sampleOutputs: ["[0,1]", "[1,2]", "[0,1]"],
    hiddenInputs: ["1,5,8,3,9,13\n17", "-1,-2,-3,-4,-5\n-8"],
    hiddenOutputs: ["[2,4]", "[2,4]"],
    hints: [
      "Consider using a hash table to store previously seen numbers",
      "For each number, check if its complement (target - num) exists in the hash table"
    ],
    solution: {
      approach: "Use a hash map to store the complement of each number and its index",
      complexity: {
        time: "O(n)",
        space: "O(n)"
      },
      explanation: "We can use a hash map to store each number's complement (target - num) and its index. For each number, we check if its complement exists in the hash map. If it does, we've found our pair."
    }
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    problemStatement: 
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
    inputFormat: "A string s consisting of ASCII characters.",
    outputFormat: "Return true if the string is a palindrome, false otherwise.",
    constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
    sampleInputs: [
      "A man, a plan, a canal: Panama",
      "race a car",
      " "
    ],
    sampleOutputs: ["true", "false", "true"],
    hiddenInputs: ["Madam, I'm Adam.", "0P"],
    hiddenOutputs: ["true", "false"],
    hints: [
      "Consider using two pointers, one from start and one from end",
      "Remember to skip non-alphanumeric characters"
    ],
    solution: {
      approach: "Use two pointers to compare characters from both ends",
      complexity: {
        time: "O(n)",
        space: "O(1)"
      },
      explanation: "We can use two pointers, one starting from the beginning and one from the end. Skip non-alphanumeric characters and compare the characters at both pointers."
    }
  },
  {
    id: "merge-sorted-arrays",
    title: "Merge Sorted Arrays",
    difficulty: "Easy",
    tags: ["Array", "Two Pointers"],
    problemStatement: 
      "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums2 into nums1 in non-decreasing order.",
    inputFormat: 
      "First line contains nums1 array and m\nSecond line contains nums2 array and n",
    outputFormat: 
      "Return nums1 array after merging nums2 into it",
    constraints: 
      "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n1 <= m + n <= 200",
    sampleInputs: [
      "[1,2,3,0,0,0],3\n[2,5,6],3",
      "[1],1\n[],0",
      "[0],0\n[1],1"
    ],
    sampleOutputs: [
      "[1,2,2,3,5,6]",
      "[1]",
      "[1]"
    ],
    hiddenInputs: [
      "[4,5,6,0,0,0],3\n[1,2,3],3",
      "[2,0],1\n[1],1"
    ],
    hiddenOutputs: [
      "[1,2,3,4,5,6]",
      "[1,2]"
    ],
    hints: [
      "Try working from the end of the arrays",
      "Compare elements from both arrays and place the larger one at the end"
    ],
    solution: {
      approach: "Use three pointers: one for each array and one for the current position",
      complexity: {
        time: "O(m+n)",
        space: "O(1)"
      },
      explanation: "Start from the end of both arrays and compare elements. Place the larger element at the end of nums1 and move the corresponding pointer backward."
    }
  }
];