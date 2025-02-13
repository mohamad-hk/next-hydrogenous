import PersianNumbers from "./ToPersianNumber";

const CalcPercent = ({ price, d_percent }) => {
  return PersianNumbers(((100 - d_percent) * price) / 100);
};
export default CalcPercent;
