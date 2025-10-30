import PromoCode from '../models/PromoCode';

export const validatePromo = async (code: string) => {
  const promo = await PromoCode.findOne({ code, isActive: true });
  if (!promo) return null;
  return { type: promo.type, value: promo.value };
};