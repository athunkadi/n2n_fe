export const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return value;
  }
  const formatedValue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  return formatedValue;
};