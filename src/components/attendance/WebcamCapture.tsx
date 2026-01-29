import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void;
  onFaceDetected?: (detected: boolean) => void;
  mode?: 'register' | 'verify';
}

export function WebcamCapture({ onCapture, onFaceDetected, mode = 'register' }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(imageData);
      }
    }
  }, [onCapture]);

  // Simulate face detection for demo
  useEffect(() => {
    if (isStreaming && mode === 'verify') {
      setIsScanning(true);
      const interval = setInterval(() => {
        // Simulate random face detection
        const detected = Math.random() > 0.3;
        setFaceDetected(detected);
        onFaceDetected?.(detected);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStreaming, mode, onFaceDetected]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={cn(
        'relative overflow-hidden rounded-2xl border-4 transition-colors duration-300',
        isScanning && faceDetected 
          ? 'border-success' 
          : isScanning 
            ? 'border-warning animate-pulse' 
            : 'border-border'
      )}>
        {!isStreaming && !error && (
          <div className="flex h-[360px] w-[480px] flex-col items-center justify-center bg-muted">
            <Camera className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Camera not started</p>
          </div>
        )}
        {error && (
          <div className="flex h-[360px] w-[480px] flex-col items-center justify-center bg-destructive/5 p-8">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <p className="text-destructive text-center">{error}</p>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            'h-[360px] w-[480px] object-cover',
            !isStreaming && 'hidden'
          )}
        />
        {isScanning && isStreaming && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-8 border-2 border-dashed border-primary/50 rounded-xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 shadow-lg">
              {faceDetected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">Face Detected</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 text-warning animate-spin" />
                  <span className="text-sm font-medium text-warning">Scanning...</span>
                </>
              )}
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex gap-3">
        {!isStreaming ? (
          <Button onClick={startCamera} size="lg" className="gap-2">
            <Camera className="h-5 w-5" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button onClick={stopCamera} variant="outline" size="lg">
              Stop Camera
            </Button>
            <Button onClick={captureImage} size="lg" className="gap-2">
              <Camera className="h-5 w-5" />
              {mode === 'register' ? 'Capture Face' : 'Verify & Mark'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
