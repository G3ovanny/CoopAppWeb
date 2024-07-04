import { Grid, Typography } from '@mui/material'

interface LayoutProps{
    children: React.ReactNode;
    title: string;
}
export const AuthLayouth = ({ children, title  }: LayoutProps) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: 4
            }}
        >
            <Grid
                className='animate__animated animate__zoomIn box-shadow'
                item
                xs={3}
                sx={{
                    width: { sm: 450 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant='h5' sx={{ mb: '1' }} >{title}</Typography>
                {children}
            </Grid>
        </Grid>
    )
}
