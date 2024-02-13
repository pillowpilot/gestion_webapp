import {
  Avatar,
  Badge,
  IconButton,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ProfilePictureWithEditBadge = ({ profilePictureURL }) => {
  return (
    <IconButton>
      <Badge
        badgeContent={<Edit />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          sx={{
            width: 128,
            height: 128,
          }}
        >
          {profilePictureURL ? "TODO" : <CameraAltIcon />}
        </Avatar>
      </Badge>
    </IconButton>
  );
};

const LoadingProfilePictureAndName = () => {
  return (
    <Paper sx={{ p: 5 }}>
      <Stack direction="row" spacing={2}>
        <ProfilePictureWithEditBadge />
        <Stack direction="column" spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "250px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "150px" }} />
        </Stack>
      </Stack>
    </Paper>
  );
};

const ProfilePictureAndName = ({ data }) => {
  return (
    <Paper
      sx={{
        padding: 5,
      }}
    >
      <Stack direction="row" spacing={2}>
        <ProfilePictureWithEditBadge profilePictureURL="" />
        <Stack direction="column" spacing={1}>
          <Typography variant="h4">{`${data.last_name}, ${data.first_name}`}</Typography>
          <Typography variant="subtitle1">{`COMPANY NAME! · ${data?.is_company_manager ? "Manager" : "User"}`}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export {
  LoadingProfilePictureAndName,
  ProfilePictureAndName,
};
