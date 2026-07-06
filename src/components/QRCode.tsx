import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  colorDark?: string;
  colorLight?: string;
}

export const QRCodeComponent: React.FC<QRCodeProps> = ({
  value,
  size = 180,
  colorDark = '#1F4D34',
  colorLight = '#ffffff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      QRCode.toCanvas(canvas, value, {
        width: size,
        margin: 0,
        color: {
          dark: colorDark,
          light: colorLight,
        },
        errorCorrectionLevel: 'H',
      });
    }
  }, [value, size, colorDark, colorLight]);

  return (
    <div className="inline-flex p-3.5 bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]">
      <canvas ref={canvasRef} />
    </div>
  );
};
