//import { Sidebar } from "@/components";

import { Box, Toolbar } from "@mui/material";
import { Navbar } from "../components/navbar/Navbar";
import { menuItems } from "./menu-items";


export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (

        <Box sx={{ display: 'flex', width: '100%' }}>
            {/*<Menus />*/}
            {<Navbar menuItems={menuItems} />}
            <Box
                className='animate__animated animate__zoomIn'
                component="main"
                sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>

    );
}