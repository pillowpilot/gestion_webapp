import { useTranslation } from "react-i18next";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { enqueueSnackbar } from "notistack";
import { Api } from "../../../api/client";
import { UploadProfilePicture } from "./UploadProfilePicture";
import { UserDataForm } from "./Form";
import { LoadingProfileData } from "./Loading";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" justifyContent="center">
      <Paper sx={{ px: { xs: 0, md: 5 }, py: 5 }}>
        <Stack gap={5}>
          <Typography variant="h4">{t("users.details.header")}</Typography>
          {children}
        </Stack>
      </Paper>
    </Stack>
  );
};

const manageErrorsFromQuery = (t, error, enqueueSnackbar) => {
  if (error.response) {
    enqueueSnackbar(error.response.data.detail, { variant: "error" });
  } else if (error.request) {
    enqueueSnackbar(t("errors.network.default"), { variant: "error" });
  } else {
    enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
  }
};

const UserDetailsPage = ({ id }) => {
  const params = useParams();
  if (params.id) id = params.id;

  const { t } = useTranslation();

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();
  const retrieveUser = useQuery({
    queryKey: ["users", id],
    queryFn: () => Api.retrieveUser(id),
    onError: (error) => {
      manageErrorsFromQuery(t, error, enqueueSnackbar);
    },
  });
  const updateUser = useMutation({
    mutationFn: (data) => Api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      enqueueSnackbar(t("users.details.successMsg"), {
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

  if (retrieveUser.isLoading)
    return (
      <PageLayout>
        <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="center">
          <Box sx={{ mx: 10 }}>
            <UploadProfilePicture formMethods={formMethods} />
          </Box>
          <LoadingProfileData />
        </Stack>
      </PageLayout>
    );

  return (
    <PageLayout>
      <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="center">
        <Box sx={{ mx: 10 }}>
          <UploadProfilePicture formMethods={formMethods} />
        </Box>
        <UserDataForm
          userId={id}
          data={retrieveUser?.data?.data}
          mutation={updateUser}
          formMethods={formMethods}
        />
      </Stack>
    </PageLayout>
  );
};

export default UserDetailsPage;
