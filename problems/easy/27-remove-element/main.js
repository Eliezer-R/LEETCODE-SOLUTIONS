const removeElement = function (nums, val) {
  let k = 0 // Puntero para la posición de los elementos válidos
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i] // Colocamos el elemento válido en la posición k
      k++
    }
  }
  return k
}

const nums1 = [3, 2, 2, 3]
console.log(removeElement(nums1, 3), nums1) // 2, [2,2,2,3] (los dos primeros son válidos)

const nums2 = [0, 1, 2, 2, 3, 0, 4, 2]
console.log(removeElement(nums2, 2), nums2) // 5, [0,1,3,0,4,...]
