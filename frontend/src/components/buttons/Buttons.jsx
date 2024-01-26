import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const DataGridDetailsButton = ({ id }) => (
  <IconButton variant="contained" color="primary" component={Link} to={`${id}`}>
    <EditIcon />
  </IconButton>
);

export const DataGridDeleteButton = ({ id, onClick }) => (
  <IconButton variant="contained" color="primary" onClick={onClick} component={Link} to={`${id}`}>
    <DeleteIcon />
  </IconButton>
);
