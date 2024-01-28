import React, { useContext } from "react";
import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Api } from "../../../api/client";
import { withTranslation } from "react-i18next";
import AuthContext from "../../../contexts/AuthProvider";
import Form from "./Form";


const NewPropertyPage = ({t}) => {
  const { auth } = useContext(AuthContext);
  const formMethods = useForm();

  const { setError } = formMethods;
  const onSubmitHandler = async (data) => {
    const name = data.name;
    try {
      await Api.createProperty({
        name: name,
        company: auth.company.id,
        geodata: data.geodata,
      });
    } catch (err) {
      const errorsData = err.response.data;
      if (errorsData.detail)
        setError("root.serverError", {
          type: "400",
          message: errorsData.detail,
        });
    }
  };

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("properties.create.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ p: 5 }}>
          <Form
            formMethods={formMethods}
            onSubmitHandler={onSubmitHandler}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export { NewPropertyPage };
export default withTranslation()(NewPropertyPage);
