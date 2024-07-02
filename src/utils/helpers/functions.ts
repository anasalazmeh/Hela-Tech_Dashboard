import { DATE_FORMATE } from "./constants";
import { floor, isArray, xor } from "lodash";
import moment from "moment";

export const toggleLoading = (loading: any[], toggle: any[] | any) => {
  return xor(loading, isArray(toggle) ? toggle : [toggle]);
};

export const formatDate = (date?: Date, format: string = DATE_FORMATE) => {
  return date && moment(date).format(format);
};

export const durationBetweenDates = (
  start: moment.Moment,
  end: moment.Moment
) => {
  // Calculate total duration
  var duration = moment.duration(end.diff(start));

  // Duration in hours
  var hours = floor(duration.asHours());

  // Duration in minutes
  var minutes = duration.asMinutes() % 60;

  return `${hours} H, ${minutes} Min`;
};

export const a2e = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

export const getpage = (page: number, pageSize: number) => {
  return page / pageSize;
};
export const nextPage = (page: number, pageSize: number) => {
  return page * pageSize;
};

export const getFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key]?.forEach((item: any) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, data[key] ?? "");
    }
  });
  return formData;
};
