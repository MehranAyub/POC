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

export const ClientTimeCard: React.FunctionComponent = () => {
  const { data, isLoading, refetch } = useGetEmployeesQuery();
  const { data: projectsData } = useGetProjectsQuery();
  const [formInitialValues, setFormInitialValues] = useState<Timesheet>(
    TimeSheetInitialValues
  );
  const formRef = useRef<FormikProps<Timesheet>>(null);

  const [addTimeSheetMutation, addTimeSheetMutationResult] =
    useAddTimesheetMutation();
  const [inValidSize, setInvalidSize] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isVerified, setIsVerified] = React.useState(false);
  const [showVerification, setShowVerification] = React.useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf" || file.size > 20971520) {
        setInvalidSize(true);
      } else {
        setInvalidSize(false);
        setFiles((prevFiles) => [...prevFiles, file]);
        const fileUrl = URL.createObjectURL(file);
        setSelectedFile(file);
        setPdfUrl(fileUrl);
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      }
    }
  };
  const employeeDefaultProps = {
    options: data && data.entityList ? data.entityList : [],
    getOptionLabel: (option: any) => option.name,
  };
  const handleReInitializeForm = () => {
    formRef.current?.setFieldValue("userId", "");
    formRef.current?.setFieldValue("projectId", undefined);
    console.log("called method");
    setFormInitialValues(TimeSheetInitialValues);
  };
  useEffect(() => {
    if (projectsData && projectsData.status === 200) {
      setProjects(projectsData.entityList);
    }
  }, [projectsData]);
  useEffect(() => {
    console.log("Employees", files);
  }, [files]);
  const handleFileChange = (file: any) => {
    setSelectedFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  };
  const handleCloseAlert = () => {
    setShowVerification(false);
  };
  const handleDeleteSelectedFile = () => {
    setFiles(files.filter((file) => file.name !== selectedFile.name));
    setPdfUrl("");
  };
  const handleOnSubmit = (values: Timesheet) => {
    setShowVerification(false);
    setVerificationMessage("");
    console.log("Submitted Data", values);
    const formattedFromDate = `${values.fromDate.getFullYear()}-${
      values.fromDate.getMonth() + 1
    }-${values.fromDate.getDate()}`;
    const formattedToDate = `${values.toDate.getFullYear()}-${
      values.toDate.getMonth() + 1
    }-${values.toDate.getDate()}`;

    const formData = new FormData();
    formData.append("userId", values.userId.toString() ?? "");
    formData.append("projectId", values.projectId.toString());
    formData.append("fromDate", formattedFromDate);
    formData.append("toDate", formattedToDate);
    formData.append("totalHours", values.totalHours.toString());
    formData.append("isApproved", values.isApproved ? "1" : "0");
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    addTimeSheetMutation({ data: formData }).then((res: any) => {
      if (res && res.data) {
        if (res.data.status === 200) {
          setIsVerified(true);
          setVerificationMessage("TimeCard has been saved successfully");
          setShowVerification(true);
          setFormInitialValues({
            totalHours: 0,
            userId: "",
            projectId: "",
            isApproved: false,
            fromDate: new Date(),
            toDate: new Date(),
          });
          setFiles([]);
          setPdfUrl("");
        } else {
          setIsVerified(false);
          setVerificationMessage(
            "Your Shopify credentials (Shopify Url OR Access token) are not Valid."
          );
          setShowVerification(true);
        }
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues ?? TimeSheetInitialValues}
        validationSchema={TimeSheetValidationSchema}
        enableReinitialize
        innerRef={formRef}
        onSubmit={(values) => {
          console.log("submit values", values);
          handleOnSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <>
            <Form>
              <Grid
                sx={{ display: "flex", alignItems: "center" }}
                container
                spacing={2}
              >
                <Grid sx={{ textAlign: "end" }} item md={2}>
                  Uploaded By
                </Grid>
                <Grid item md={3}>
                  <Autocomplete
                    {...employeeDefaultProps}
                    id="clear-on-escape"
                    loading={isLoading}
                    clearOnEscape
                    size="small"
                    onBlur={handleBlur}
                    onChange={(e, value) => {
                      setFieldValue("userId", value ? value.id : "");
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <ErrorMessage
                    className="error-msg"
                    component={"div"}
                    name="userId"
                  />
                </Grid>
                <Grid sx={{ textAlign: "end" }} item md={2}>
                  Add Timesheets
                </Grid>
                <Grid item md={3}>
                  <TextField
                    size="small"
                    id="timesheet"
                    name="timesheet"
                    fullWidth
                    onChange={handleFileUpload}
                    error={inValidSize}
                    helperText={
                      inValidSize
                        ? "File must be less than 20 mb and file should be pdf only"
                        : ""
                    }
                    type="file"
                    inputProps={{ accept: ".pdf" }}
                  />
                </Grid>
                <Grid item md={2}>
                  <Button size="small" variant="contained">
                    Upload
                  </Button>
                </Grid>
                <Grid mt={2} sx={{ textAlign: "end" }} item md={2}>
                  List of Time Sheets to Process
                </Grid>
                <Grid mt={2} item md={3}>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    size="small"
                    fullWidth
                    value={selectedFile}
                    onChange={(e) => handleFileChange(e.target.value)}
                  >
                    {files && files.length > 0 ? (
                      files.map((file, index: number) => (
                        <MenuItem key={index} value={file}>
                          <ListItemText primary={file.name} />
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No TimeSheet uploaded</MenuItem>
                    )}
                  </Select>
                </Grid>
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
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleDeleteSelectedFile}
                    >
                      Delete Below File
                    </Button>
                    <Typography>Preview of Scanned Copy</Typography>
                    <Typography>:</Typography>
                  </Box>
                  <iframe
                    src={pdfUrl}
                    style={{ width: "100%", height: "70vh" }}
                  />
                </Grid>
                <Grid sx={{ textAlign: "end" }} item md={2}>
                  Approved From Client:
                </Grid>
                <Grid item md={4}>
                  <RadioGroup
                    aria-label="choice"
                    name="isApproved"
                    id="isApproved"
                    row
                    value={values.isApproved}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <ErrorMessage
                    className="error-msg"
                    component={"div"}
                    name="isApproved"
                  />
                </Grid>
                <Grid sx={{ textAlign: "end" }} item md={2}>
                  Project Name:
                </Grid>
                <Grid item md={3}>
                  <Autocomplete
                    size="small"
                    options={projects}
                    getOptionLabel={(option) => option.name}
                    id="projectId"
                    clearOnEscape
                    onChange={(e, value) => {
                      setFieldValue("projectId", value ? value.id : "");
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <ErrorMessage
                    className="error-msg"
                    component={"div"}
                    name="projectId"
                  />
                </Grid>
                <Grid sx={{ textAlign: "end" }} item md={2}>
                  TimeSheet for (From:To):
                </Grid>
                <Grid item md={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={values.fromDate ? dayjs(values.fromDate) : null}
                      onChange={(newValue) => {
                        setFieldValue(
                          "fromDate",
                          newValue ? newValue.toDate() : null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          helperText={null}
                          fullWidth
                          variant="standard"
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <ErrorMessage
                    className="error-msg"
                    component={"div"}
                    name="fromDate"
                  />
                </Grid>
                <Grid sx={{ boxSizing: "border-box" }} item md={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={values.toDate ? dayjs(values.toDate) : null}
                      onChange={(newValue) => {
                        setFieldValue(
                          "toDate",
                          newValue ? newValue.toDate() : null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          helperText={null}
                          fullWidth
                          variant="standard"
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <ErrorMessage
                    className="error-msg"
                    component={"div"}
                    name="toDate"
                  />
                </Grid>
                <Grid sx={{ textAlign: "end" }} item md={2}>
                  Total TimeSheet Hours:
                </Grid>
                <Grid item md={3}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.totalHours}
                    name="totalHours"
                    id="totalHours"
                    size="small"
                  />
                  <ErrorMessage
                    className="error-msg"
                    component={"div"}
                    name="totalHours"
                  />
                </Grid>
                <Grid item sx={{ textAlign: "end" }} md={6}>
                  <Button variant="contained" type="submit">
                    Save & Upload
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={handleReInitializeForm}>
                    Add New
                  </Button>
                </Grid>
                <Grid item md={12} sx={{ textAlign: "center" }}>
                  <Box>
                    {showVerification ? (
                      <Alert
                        onClose={handleCloseAlert}
                        severity={isVerified ? "success" : "error"}
                      >
                        {verificationMessage}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
