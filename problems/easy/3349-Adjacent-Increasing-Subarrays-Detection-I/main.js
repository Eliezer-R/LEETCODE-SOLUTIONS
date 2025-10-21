const hasIncreasingSubarrays = function (nums, k) {
  const n = nums.length
  let cnt = 1
  let precnt = 0
  let ans = 0

  for (let i = 1; i < n; ++i) {
    if (nums[i] > nums[i - 1]) {
      ++cnt
    } else {
      precnt = cnt
      cnt = 1
    }
    // Máximo entre: anterior con actual, o mitad del actual
    ans = Math.max(ans, Math.min(precnt, cnt))
    ans = Math.max(ans, Math.floor(cnt / 2))
  }

  return ans >= k
}

console.log(hasIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1], 3)) // true
console.log(hasIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7], 5)) // false

/**
 * Explicación del algoritmo:
 *
 * nums = [2,5,7,8,9,2,3,4,3,1], k = 3
 *
 * i=1: 5>2 → cnt=2
 * i=2: 7>5 → cnt=3
 * i=3: 8>7 → cnt=4
 * i=4: 9>8 → cnt=5
 * i=5: 2<9 → precnt=5, cnt=1, ans=max(0,min(5,1),floor(1/2))=1
 * i=6: 3>2 → cnt=2, ans=max(1,min(5,2),floor(2/2))=2
 * i=7: 4>3 → cnt=3, ans=max(2,min(5,3),floor(3/2))=3
 * i=8: 3<4 → precnt=3, cnt=1, ans=3
 * i=9: 1<3 → precnt=1, cnt=1, ans=3
 *
 * ans=3 >= k=3 → true
 */
