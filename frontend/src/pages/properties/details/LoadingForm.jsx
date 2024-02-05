import {
  Button,
  Stack,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoadingPropertyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack spacing={5}>
      <Skeleton variant="rounded" width={420} height={60} />
      <Stack direction="row" justifyContent="center" gap={1}>
        <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
          {t("properties.details.goBackBtn")}
        </Button>
        <Button disabled type="submit" variant="contained">
          {t("properties.details.saveBtn")}
        </Button>
      </Stack>
    </Stack>
  );
};

export { LoadingPropertyForm };
