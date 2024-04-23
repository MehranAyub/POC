import * as Yup from "yup";
import { User } from "./User";

export interface Project {
  id?: number;
  projectId: string;
  name: string;
  customerName: string;
}
export interface Timesheet {
  id?: number;
  userId: string;
  projectId: string;
  fromDate: Date;
  toDate: Date;
  totalHours: number;
  isApproved: boolean;
  urls?: string[];
  user?: User;
  project?: Project;
}
export const TimeSheetInitialValues: Timesheet = {
  userId: "",
  projectId: "",
  fromDate: new Date(),
  toDate: new Date(),
  totalHours: 0,
  isApproved: false,
};

export const TimeSheetValidationSchema = Yup.object().shape({
  userId: Yup.string().required("Please Select an Employee"),
  projectId: Yup.string().required("Please Select a Project"),
  fromDate: Yup.date().required("From date is required"),
  toDate: Yup.date().required("To date is required"),
  totalHours: Yup.number()
    .required("Total hours are required")
    .min(1, "Total hours must be greater than zero"),
  isApproved: Yup.boolean(),
});
