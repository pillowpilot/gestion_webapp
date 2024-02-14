import { Grid, Stack, Paper, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} md={12} sx={{ height: "100%" }}>
      <Grid item md={3} />
      <Grid item md={6}>
        <Stack justifyContent="center" sx={{ height: "100%" }}>
          <Paper sx={{ p: 2, mx: 1 }}>
            <Stack gap={2}>
              <Typography variant="h2" color="text.primary" align="center">
                {t("notfound.labels.header")}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {t("notfound.labels.caption")}
              </Typography>
              <Stack direction="row" justifyContent="center">
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => navigate(-1)}
                >
                  {t("notfound.goBackBtn")}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
