import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Alert,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Api } from "../../api/client";
import AuthContext from "../../contexts/AuthProvider";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

const FeedbackAlert = ({ mutation, errors }) => {
  const { t } = useTranslation();

  if (mutation.isSuccess)
    return (
      <Alert severity="success">
        {t("properties.details.updateSuccessMsg")}
      </Alert>
    );

  if (mutation.isError) {
    console.log("feedback mutation", mutation);
    const errorCode = mutation?.error?.code;
    if (errorCode === "ERR_NETWORK")
      return <Alert severity="error">{t("errors.network.default")}</Alert>;

    const errorMsg = mutation?.error?.response?.data?.detail;
    return (
      <Alert severity="error">
        {errorMsg ? errorMsg : t("properties.details.updateErrorMsg")}
      </Alert>
    );
  }

  return <></>;
};

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

const PropertyForm = ({ formMethods, data, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = formMethods;

  const onSubmit = (data) => {
    mutation.mutate({
      name: data.name,
      company: auth.company?.id,
    });
  };

  /*
To justify InputLabelProps={{ shrink: true }}
See: https://stackoverflow.com/a/76688881
*/

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <Stack spacing={5}>
        <TextField
          {...register("name", {
            required: t("properties.details.errors.requiredName"),
          })}
          label={t("properties.details.labels.name")}
          InputLabelProps={{ shrink: true }}
          error={errors.name}
          helperText={errors.name?.message}
        />
        <FeedbackAlert mutation={mutation} errors={errors} />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.details.goBackBtn")}
          </Button>
          <Button type="submit" variant="contained">
            {t("properties.details.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

const PropertyDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const formMethods = useForm();
  const { setError, setValue } = formMethods;

  const queryClient = useQueryClient();
  const retrieveProperty = useQuery({
    queryKey: ["properties", id],
    queryFn: () => Api.retrieveProperty(id),
    onSuccess: (data) => {
      setValue("name", data.data.name);
    },
  });
  const mutation = useMutation({
    mutationFn: (data) => Api.updateProperty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    },
    onError: (error) => {
      console.log("errormut", error);
      const errorsData = error?.response?.data;
      if (errorsData?.detail)
        setError("root.serverError", {
          type: "400",
          message: errorsData.detail,
        });
      if (errorsData?.name)
        setError("name", { type: "400", message: errorsData.name });
    },
  });

  if (retrieveProperty.isLoading)
    return (
      <Stack spacing={10}>
        <Stack direction="row" justifyContent="center">
          <Box sx={{ width: 500 }}>
            <Paper sx={{ p: 5 }}>
              <Stack gap={5}>
                <Typography variant="h4">
                  {t("properties.details.header")}
                </Typography>
                <LoadingPropertyForm />
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Stack>
    );

  return (
    <Stack spacing={10}>
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: 500 }}>
          <Paper sx={{ p: 5 }}>
            <Stack gap={5}>
              <Typography variant="h4">
                {t("properties.details.header")}
              </Typography>
              <PropertyForm
                formMethods={formMethods}
                data={retrieveProperty.data}
                mutation={mutation}
              />
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PropertyDetailsPage;
