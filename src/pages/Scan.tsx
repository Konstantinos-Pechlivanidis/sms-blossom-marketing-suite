import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const Scan = () => {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleSimulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockScannedCode = `OFFER_${Date.now()}`;
      setScannedData(mockScannedCode);
      setIsScanning(false);
      toast.success('QR Code scanned successfully!');
    }, 2000);
  };

  const handleReset = () => {
    setScannedData(null);
  };

  return (
    <div className="flex-1 space-y-6 bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 rounded-3xl">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="w-6 h-6" />
              Scan Offer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!scannedData ? (
              <>
                <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center space-y-4">
                    <QrCode className="w-16 h-16 mx-auto text-gray-400" />
                    <p className="text-gray-600">Position QR code within the frame</p>
                  </div>
                </div>
                <Button 
                  onClick={handleSimulateScan} 
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? 'Scanning...' : 'Simulate Scan'}
                </Button>
              </>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Scan Successful!</h3>
                  <p className="text-gray-600">Code: {scannedData}</p>
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">
                  Scan Another
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scan;