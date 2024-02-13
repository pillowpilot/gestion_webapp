import { Button, Stack, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

const LoadingProfileData = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing={1} sx={{ p: 5 }}>
      <Skeleton variant="rounded" width={420} height={60} />
      <Skeleton variant="rounded" width={420} height={60} />
      <Skeleton variant="rounded" width={420} height={60} />
      <Skeleton variant="rounded" width={420} height={60} />

      <Stack direction="row" gap={1} justifyContent="center">
        <Button variant="outlined" size="medium">
          {t("users.details.goBackBtn")}
        </Button>
        <Button disabled type="submit" variant="contained">
          {t("users.details.saveBtn")}
        </Button>
      </Stack>
    </Stack>
  );
};

export { LoadingProfileData };
