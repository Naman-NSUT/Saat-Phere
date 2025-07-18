export function validateProduct(data) {
  if (!data.name || !data.price) return false;
  return true;
} 