import { Stack, IconButton, Badge, Avatar, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const UploadProfilePicture = ({ formMethods }) => {
  const { t } = useTranslation();

  return (
    <Stack alignItems="center">
      <IconButton sx={{ aspectRatio: 1, width: 150 }}>
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
            <Typography variant="body1">
              {t("users.create.labels.uploadPhoto")}
            </Typography>
          </Avatar>
        </Badge>
      </IconButton>
      <Typography variant="caption">
        {t("users.create.labels.allowedFormats")}
      </Typography>
      <Typography variant="caption">
        {t("users.create.labels.maxSize")}
      </Typography>
    </Stack>
  );
};

export { UploadProfilePicture };
