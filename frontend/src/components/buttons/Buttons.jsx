import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MapIcon from "@mui/icons-material/Map";

export const DataGridDetailsButton = ({ id, icon=<EditIcon /> }) => (
  <IconButton variant="contained" color="primary" component={Link} to={`${id}`}>
    {icon}
  </IconButton>
);

export const DataGridDeleteButton = ({ id, onClick }) => (
  <IconButton
    variant="contained"
    color="primary"
    onClick={onClick}
    component={Link}
    to={`${id}`}
  >
    <DeleteIcon />
  </IconButton>
);

export const DataGridMapButton = ({ id }) => (
  <IconButton variant="contained" color="primary" component={Link} to={`${id}/map`}>
    <MapIcon />
  </IconButton>
);
