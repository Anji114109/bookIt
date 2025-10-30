import { validatePromo } from '../utils/promoValidator';

export const validatePromoCode = async (req: any, res: any) => {
  const { code } = req.body;
  const promo = await validatePromo(code);
  if (!promo) {
    return res.status(400).json({ valid: false, message: 'Invalid or expired promo code' });
  }
  res.json({ valid: true, ...promo });
};