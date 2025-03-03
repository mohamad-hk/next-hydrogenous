export default function CalculatePrice(
  price,
  discount_price,
  discount_percent
) {
  if (discount_percent != null) {
    return Number((100-discount_percent) * price/100);
  } else if (discount_price) {
    return Number(discount_price);
  } else {
    return Number(price);
  }
}
