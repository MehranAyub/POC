import React, { useEffect, useRef, useState } from "react";
import {
  useAddTimesheetMutation,
  useGetEmployeesQuery,
  useGetProjectsQuery,
} from "../Redux/Reducer/Features/TimeSheet/TimeSheetSlice.tsx";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import {
  TimeSheetInitialValues,
  TimeSheetValidationSchema,
  Timesheet,
} from "../Models/Timesheet.ts";
import dayjs from "dayjs";
interface ViewCardProps {
  timeSheet: Timesheet;
}
export const ViewClientTimeCard: React.FunctionComponent<ViewCardProps> = ({
  timeSheet,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isVerified, setIsVerified] = React.useState(false);

  const handleFileChange = (file: any) => {
    setSelectedFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  };

  return (
    <>
      <Grid
        sx={{ display: "flex", alignItems: "center" }}
        container
        spacing={2}
      >
        <Grid sx={{ textAlign: "end" }} item md={2}>
          Uploaded By
        </Grid>
        <Grid item md={3}>
          {timeSheet.user?.name}
        </Grid>
        <Grid sx={{ textAlign: "end" }} item md={2}>
          Add Timesheets
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={2}>
          <Button size="small" variant="contained">
            Upload
          </Button>
        </Grid>
        <Grid mt={2} sx={{ textAlign: "end" }} item md={2}>
          List of Time Sheets to Process
        </Grid>
        <Grid mt={2} item md={3}></Grid>
        <Grid item md={12}>
          <Box
            sx={{
              height: "6vh",
              border: "1px solid #bfbfbf",
              mt: 5,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Preview of Scanned Copy</Typography>
          </Box>
          <iframe src={pdfUrl} style={{ width: "100%", height: "70vh" }} />
        </Grid>
      </Grid>
    </>
  );
};
