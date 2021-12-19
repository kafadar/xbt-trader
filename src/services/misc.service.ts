const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatMoney = (value: number): string => formatter.format(value);

export default {
  formatMoney,
};
