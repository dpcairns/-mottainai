export function removeByIndex(arr, index) {
      return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ]}