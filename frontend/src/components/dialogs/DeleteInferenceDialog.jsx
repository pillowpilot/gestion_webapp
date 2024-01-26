import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useTranslation } from "react-i18next";

export const DeleteInferenceDialog = ({open, onAccept, onReject}) => {
    const { t } = useTranslation();
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText>
                    {t("inferences.delete.confirmationMsg")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onReject}>{t("inferences.delete.goBackBtn")}</Button>
                <Button onClick={onAccept}>{t("inferences.delete.deleteBtn")}</Button>
            </DialogActions>
        </Dialog>
    );
}
