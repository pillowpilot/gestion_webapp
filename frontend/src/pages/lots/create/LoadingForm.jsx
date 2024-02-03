import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Skeleton, Typography } from "@mui/material";
import { withTranslation } from "react-i18next";

const LoadingForm = ({ t }) => {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={3}
      sx={{
        sm: { minWidth: "350px" },
      }}
    >
      <Skeleton variant="rounded" height={55} />
      <Skeleton variant="rounded" height={55} />
      <Stack direction="row" justifyContent="center" gap={1}>
        <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
          {t("lots.create.goBackBtn")}
        </Button>
        <Button disabled variant="contained" type="submit">
          {t("lots.create.saveBtn")}
        </Button>
      </Stack>
    </Stack>
  );
};

export { LoadingForm };
export default withTranslation()(LoadingForm);
