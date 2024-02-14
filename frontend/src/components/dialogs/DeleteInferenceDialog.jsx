import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export const DeleteDialog = ({
  open,
  text,
  onAccept,
  onAcceptLabel,
  onReject,
  onRejectLabel,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject}>{onRejectLabel}</Button>
        <Button onClick={onAccept}>{onAcceptLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteInferenceDialog = ({ open, onAccept, onReject }) => {
  const { t } = useTranslation();

  return (
    <DeleteDialog
      open={open}
      text={t("inferences.delete.confirmationMsg")}
      onAccept={onAccept}
      onAcceptLabel={t("inferences.delete.deleteBtn")}
      onReject={onReject}
      onRejectLabel={t("inferences.delete.goBackBtn")}
    />
  );
};

export const DeleteLotDialog = ({ open, onAccept, onReject }) => {
  const { t } = useTranslation();

  return (
    <DeleteDialog
      open={open}
      text={t("lots.delete.confirmationMsg")}
      onAccept={onAccept}
      onAcceptLabel={t("lots.delete.deleteBtn")}
      onReject={onReject}
      onRejectLabel={t("lots.delete.goBackBtn")}
    />
  );
};
