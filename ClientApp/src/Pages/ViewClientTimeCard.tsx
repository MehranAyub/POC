import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Timesheet } from "../Models/Timesheet.ts";
interface ViewCardProps {
  timeSheet: Timesheet;
}
export const ViewClientTimeCard: React.FunctionComponent<ViewCardProps> = ({
  timeSheet,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const handleFileChange = (url: string) => {
    setSelectedFile(url);
    setPdfUrl(url);
  };

  useEffect(() => {
    setSelectedFile(timeSheet.urls ? timeSheet.urls[0] : "");
    setPdfUrl(timeSheet.urls ? timeSheet.urls[0] : "");
  }, []);
  return (
    <>
      <Grid
        sx={{ display: "flex", alignItems: "center" }}
        container
        spacing={2}
      >
        <Grid item md={4}>
          Employee Name/Email/ID:
        </Grid>
        <Grid item md={8}>
          {timeSheet.user?.name} /{timeSheet.user?.email}/{" "}
          {timeSheet.user?.userId}
        </Grid>
        <Grid item md={4}>
          From Date:
        </Grid>
        <Grid item md={8}>
          {timeSheet.fromDate.toString().split("T")[0]}
        </Grid>
        <Grid item md={4}>
          To Date:
        </Grid>
        <Grid item md={8}>
          {timeSheet.toDate.toString().split("T")[0]}
        </Grid>
        <Grid item md={4}>
          Processed TimeSheets:
        </Grid>
        <Grid mt={2} item md={8}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            size="small"
            fullWidth
            value={selectedFile}
            onChange={(e) => handleFileChange(e.target.value)}
          >
            {timeSheet.urls && timeSheet.urls.length > 0 ? (
              timeSheet.urls.map((url, index: number) => (
                <MenuItem key={index} value={url}>
                  <ListItemText primary={url} />
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
              textAlign: "center",
            }}
          >
            <Typography>Preview of Scanned Copy</Typography>
          </Box>
          <iframe
            src={"https://localhost:7148/Assets/" + pdfUrl}
            style={{ width: "100%", height: "70vh" }}
          />
        </Grid>
      </Grid>
    </>
  );
};
