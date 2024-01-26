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

const FeedbackAlert = ({ mutation }) => {
  const { t } = useTranslation();

  if (mutation.isSuccess)
    return (
      <Alert severity="success">
        {t("properties.details.updateSuccessMsg")}
      </Alert>
    );

  if (mutation.isError) {
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
};

const LoadingPropertyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 5 }}>
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
    </Paper>
  );
};

const PropertyForm = ({ data, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data.data?.name,
    },
  });

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
    <Paper sx={{ p: 5 }}>
      <Stack>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          <Stack spacing={5}>
            <TextField
              {...register("name")}
              required
              label="Name"
              InputLabelProps={{ shrink: true }}
            />
            <FeedbackAlert mutation={mutation} />
            <Stack direction="row" justifyContent="center" gap={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => navigate(-1)}
              >
                {t("properties.details.goBackBtn")}
              </Button>
              <Button type="submit" variant="contained">
                {t("properties.details.saveBtn")}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};

const PropertyDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const queryClient = useQueryClient();
  const retrieveProperty = useQuery(["properties", id], () =>
    Api.retrieveProperty(id)
  );
  const mutation = useMutation({
    mutationFn: (data) => Api.updateProperty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    }
  });

  if (retrieveProperty.isLoading)
    return (
      <Stack spacing={10}>
        <Typography variant="h4">{t("properties.details.header")}</Typography>
        <Stack direction="row" justifyContent="center">
          <Box sx={{ width: 500 }}>
            <LoadingPropertyForm />
          </Box>
        </Stack>
      </Stack>
    );

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("properties.details.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: 500 }}>
          <PropertyForm data={retrieveProperty.data} mutation={mutation} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default PropertyDetailsPage;
