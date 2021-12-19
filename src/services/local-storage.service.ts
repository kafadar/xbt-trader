import { SecondaryCurrency } from '@/types';

const SECONDARY_CURRENCY = 'SECONDARY_CURRENCY';

export const saveSecondaryCurrency = (currency: SecondaryCurrency): void => {
  localStorage.setItem(SECONDARY_CURRENCY, currency);
};

export const loadSecondaryCurrency = (): SecondaryCurrency => {
  const currency = localStorage.getItem(SECONDARY_CURRENCY) as SecondaryCurrency;

  if (currency === null) {
    saveSecondaryCurrency('Aud');
    return 'Aud';
  }

  return currency;
};
