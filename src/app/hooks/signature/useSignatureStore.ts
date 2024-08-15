import React, { useRef, useState } from 'react'

export const useSignatureStore = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    const getTouchEventCoordinates = (e: React.TouchEvent<HTMLCanvasElement>) => {
        const touch = e.touches[0];
        return {
            x: touch.clientX - canvasRef.current!.getBoundingClientRect().left,
            y: touch.clientY - canvasRef.current!.getBoundingClientRect().top,
        };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                setIsDrawing(true);
                const { x, y } = (e as React.TouchEvent<HTMLCanvasElement>).touches
                    ? getTouchEventCoordinates(e as React.TouchEvent<HTMLCanvasElement>)
                    : {
                        x: (e as React.MouseEvent<HTMLCanvasElement, MouseEvent>).nativeEvent.offsetX,
                        y: (e as React.MouseEvent<HTMLCanvasElement, MouseEvent>).nativeEvent.offsetY,
                    };
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const { x, y } = (e as React.TouchEvent<HTMLCanvasElement>).touches
                        ? getTouchEventCoordinates(e as React.TouchEvent<HTMLCanvasElement>)
                        : {
                            x: (e as React.MouseEvent<HTMLCanvasElement, MouseEvent>).nativeEvent.offsetX,
                            y: (e as React.MouseEvent<HTMLCanvasElement, MouseEvent>).nativeEvent.offsetY,
                        };
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const sendSignatureToBackend = async () => {
        const signatureDataURL = getSignatureDataURL();
        if (signatureDataURL) {
            try {
                const response = await fetch('/api/save_signature/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken(), // Asegúrate de incluir el token CSRF para proteger contra ataques CSRF
                    },
                    body: JSON.stringify({
                        signature: signatureDataURL,
                    }),
                });

                if (response.ok) {
                    alert('Firma guardada con éxito.');
                } else {
                    alert('Hubo un problema al guardar la firma.');
                }
            } catch (error) {
                console.error('Error al enviar la firma:', error);
            }
        }
    };

    const getCSRFToken = () => {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]') as HTMLInputElement;
        return csrfToken ? csrfToken.value : '';
    };


    const getSignatureDataURL = (): string | null => {
        const canvas = canvasRef.current;
        return canvas ? canvas.toDataURL('image/png') : null;
    };
    return {
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        clearCanvas,
        sendSignatureToBackend,
    };
}
