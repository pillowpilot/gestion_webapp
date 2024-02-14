import { useState, useContext, useEffect } from "react";
import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthContext from "../../../contexts/AuthProvider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserDataForm = ({ data, formMethods, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      first_name: d.name,
      last_name: d.lastname,
      email: d.email,
      password: d.password,
      company: auth.company.id,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          minWidth: { xs: 0, sm: "290px" },
        }}
      >
        <TextField
          label={t("users.details.labels.name")}
          {...register("name", {
            required: t("users.details.errors.requiredName"),
          })}
          defaultValue={data?.first_name}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label={t("users.details.labels.lastname")}
          {...register("lastname", {
            required: t("users.details.errors.requiredLastname"),
          })}
          defaultValue={data?.last_name}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label={t("users.details.labels.email")}
          {...register("email", {
            required: t("users.details.errors.requiredEmail"),
          })}
          defaultValue={data?.email}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type={showPassword ? "input" : "password"}
          label={t("users.details.labels.password")}
          {...register("password", {
            required: t("users.details.errors.requiredPassword"),
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.details.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit">
            {t("users.details.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { UserDataForm };
