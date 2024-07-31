import { useAlertDialogStore } from '@/app/hooks/ui/useAlertDialogStore';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from '@mui/material'
import { Warning as WarningIcon } from '@mui/icons-material';

interface BDialogProps {
    title?: string;
    content: string
    onConfirm: () => void
}


export const AlertDialog = ({ title, content, onConfirm }: BDialogProps) => {
    const { isAlertDialogOpen, closeAlertDialog } = useAlertDialogStore()

    const handleClose = () => {
        closeAlertDialog()
    }
    const handleAcept = () => {
        if (onConfirm) {
            onConfirm()
        }
        closeAlertDialog()
    }
    return (
        <Dialog
            sx={{
                '& .MuiDialogContent-root': {
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& .MuiDialogActions-root': {
                    padding: 2,
                },
            }}
            open={isAlertDialogOpen}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    alignItems: 'center',
                    gap: 1,
                    padding: 1,
                }}
            >
                <WarningIcon
                    color='warning'
                />
                <Typography
                    fontSize={12}
                >{title || 'Alerta'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"
                    sx={{
                        paddingTop: 3,
                    }}
                >
                    {content}
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2 }}>

                    <Button
                        variant='contained'
                        onClick={handleClose}
                        sx={{ minWidth: '120px' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleAcept}
                        autoFocus
                        color='error'
                        sx={{ minWidth: '120px' }}
                    >
                        Aceptar
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
