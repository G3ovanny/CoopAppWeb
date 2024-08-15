import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useSignatureStore } from '@/app/hooks/signature/useSignatureStore';


export const FirmaSocio: React.FC = () => {
    const {
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        clearCanvas,
        sendSignatureToBackend,
    } = useSignatureStore();

    return (
        <Box
            sx={{
                textAlign: 'center',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 600,
                mx: 'auto',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Firma aquí:
            </Typography>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={300}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: '1px solid #000',
                        cursor: 'crosshair',
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={sendSignatureToBackend}>
                    Guardar Firma
                </Button>
                <Button variant="contained" onClick={clearCanvas} sx={{ ml: 2 }}>
                    Limpiar
                </Button>
            </Box>
        </Box>
    );
};
