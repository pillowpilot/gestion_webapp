import { Box, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { enqueueSnackbar } from "notistack";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { UploadProfilePicture } from "./UploadProfilePicture";
import { UserDataForm } from "./Form";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center">
      <Paper sx={{ px: { xs: 0, md: 5 }, py: 5 }}>
        <Stack gap={5}>
          <Typography variant="h4">{t("users.create.header")}</Typography>
          {children}
        </Stack>
      </Paper>
    </Stack>
  );
};

const UserNewPage = () => {
  const { t } = useTranslation();

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => Api.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      enqueueSnackbar(t("users.create.successMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
        if (data.name) setError("name", { type: "400", message: data.name });
        if (data.lastname)
          setError("lastname", { type: "400", message: data.lastname });
        if (data.email) setError("email", { type: "400", message: data.email });
        if (data.password)
          setError("password", { type: "400", message: data.password });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: "error" });
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
      }
    },
  });

  return (
    <PageLayout>
      <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="center">
        <Box sx={{ mx: 10 }}>
          <UploadProfilePicture formMethods={formMethods} />
        </Box>
        <UserDataForm formMethods={formMethods} mutation={mutation} />
      </Stack>
    </PageLayout>
  );
};

export default UserNewPage;
