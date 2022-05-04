import moment from "moment";

export const PROJECT_NAME = "Finances Control";
export const THEME_COLOR = "#1976d2";
export const SNACKBAR_DIRECTION = { vertical: "top", horizontal: "right" };
export const DATE_MIN_FILTER = new Date("2021", 1, 1);
export const DATE_MAX_FILTER = new Date(moment().format("YYYY"), 12, 30);
