import moment from "moment-jalaali";

export default function convertToPersianMonthYear(timestamp) {
  moment.loadPersian({ dialect: "persian-modern" });
  return moment(timestamp).format("jMMMM jYYYY");
}
