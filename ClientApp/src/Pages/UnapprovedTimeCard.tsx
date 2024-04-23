import React, { useEffect, useState } from "react";
import {
  useGetTimeSheetsMutation,
  useDeleteTimesheetMutation,
} from "../Redux/Reducer/Features/TimeSheet/TimeSheetSlice.tsx";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Timesheet } from "../Models/Timesheet.ts";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UnapprovedTimeCard: React.FunctionComponent = () => {
  const [timeSheetMutation, timeSheetMutationResult] =
    useGetTimeSheetsMutation();
  const [deleteTimeSheetMutation, deleteTimeSheetMutationResult] =
    useDeleteTimesheetMutation();
  const [timeSheets, setTimeSheets] = useState<Timesheet[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<Timesheet>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [formData, setFormData] = useState({
    employeeName: "",
    customerName: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFromDateChange = (date) => {
    setFormData({
      ...formData,
      fromDate: date.toISOString().split("T")[0],
    });
  };
  const handleToDateChange = (date) => {
    setFormData({
      ...formData,
      toDate: date.toISOString().split("T")[0],
    });
  };
  const handleSearch = () => {
    timeSheetMutation({
      data: {
        EmployeeName: formData.employeeName,
        CustomerName: formData.customerName,
        FromDate: formData.fromDate,
        ToDate: formData.toDate,
      },
    }).then((res: any) => {
      if (res && res.data) {
        setTimeSheets(res.data.entityList);
      }
      console.log("response of sheets", res);
    });
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: Timesheet
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(item);
    console.log("selected row", item);
  };
  const handleClose = (params: any) => {
    setAnchorEl(null);
  };
  useEffect(() => {
    handleSearch();
  }, []);
  useEffect(() => {
    console.log("selected row", selectedRow);
  }, [selectedRow]);
  const handleDeleteTimeSheet = () => {
    handleClose(true);
    setTimeSheets(timeSheets.filter((time) => time.id !== selectedRow?.id));
    deleteTimeSheetMutation({ id: selectedRow?.id ?? 0 }).then((res) => {
      console.log("response of delete", res);
    });
  };
  const ActionsButton = (params: Timesheet) => {
    return (
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(e) => {
            handleClick(e, params);
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              //   handleGetProductDetail();
            }}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteTimeSheet}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              window.open(`/ProductDetailView/${selectedRow?.id}`);
            }}
          >
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText>Approve</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <>
      <Box
        mt={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          size="medium"
          label="Employee/Project Name"
          name="employeeName"
          onChange={handleChange}
          value={formData.employeeName}
        />
        <TextField
          size="medium"
          label="Customer Name"
          name="customerName"
          onChange={handleChange}
          value={formData.customerName}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From Date"
            value={formData.fromDate}
            onChange={handleFromDateChange}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To Date"
            value={formData.toDate}
            onChange={handleToDateChange}
            renderInput={(params) => (
              <TextField name="toDate" {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>
        <Button
          size="medium"
          type="submit"
          disabled={timeSheetMutationResult.isLoading}
          onClick={handleSearch}
          variant="contained"
          endIcon={
            timeSheetMutationResult.isLoading ? (
              <CircularProgress size="1rem"></CircularProgress>
            ) : (
              ""
            )
          }
        >
          Search
        </Button>
      </Box>
      <TableContainer sx={{ mt: 5 }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Employee Name/ID/Email</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Project Name/Id</StyledTableCell>
              <StyledTableCell>Uploaded Date</StyledTableCell>
              <StyledTableCell>Total Hrs.</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell>Uploaded By</StyledTableCell>
              <StyledTableCell align="center">
                Approved From Client
              </StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSheets.length > 0 ? (
              timeSheets.map((row, index: number) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.user?.name}
                    <br />
                    {row.user?.userId}
                    <br />
                    {row.user?.email}
                  </StyledTableCell>
                  <StyledTableCell>{row.project?.customerName}</StyledTableCell>
                  <StyledTableCell>
                    {row.project?.name}
                    <br />
                    {row.project?.projectId}
                  </StyledTableCell>
                  <StyledTableCell>
                    From:{row.fromDate.toString()}
                    <br />
                    To:{row.toDate.toString()}
                  </StyledTableCell>
                  <StyledTableCell>{row.totalHours}</StyledTableCell>
                  <StyledTableCell align="center">Uploaded</StyledTableCell>
                  <StyledTableCell>{row.user?.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.isApproved ? (
                      <Chip size="small" color="success" label="Approved" />
                    ) : (
                      <Chip size="small" color="warning" label="Pending" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{ActionsButton(row)}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                {" "}
                <StyledTableCell colSpan={9} align="center">
                  No rows to show
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
