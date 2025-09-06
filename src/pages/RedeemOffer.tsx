
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { QrCode, Store, Smartphone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QRScan = () => {
  const { trackingId } = useParams();
  const [searchParams] = useSearchParams();
  const [scanData, setScanData] = useState({
    storeName: 'Your Store',
    offerText: 'Exclusive Offer',
    trackingCode: trackingId || 'DEMO123',
    isLoading: true
  });

  // Get store name from URL params or simulate API call
  useEffect(() => {
    const storeName = searchParams.get('store') || 'Your Store';
    const offer = searchParams.get('offer') || 'Exclusive Offer';
    
    // Simulate API call to track the scan and get store data
    setTimeout(() => {
      setScanData({
        storeName,
        offerText: offer,
        trackingCode: trackingId || 'DEMO123',
        isLoading: false
      });
      
      // Track the scan conversion (would be actual API call)
      console.log('Tracking scan conversion for:', trackingId);
    }, 500);
  }, [trackingId, searchParams]);

  const handleUnsubscribe = () => {
    // Would redirect to unsubscribe confirmation page or API call
    window.location.href = `/unsubscribe?code=${scanData.trackingCode}`;
  };

  if (scanData.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
        <div className="animate-pulse text-center">
          <QrCode className="mx-auto h-16 w-16 text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Loading your offer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col">
      {/* Header */}
      <header className="text-center pt-8 pb-6 px-4 safe-area-top">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Store className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {scanData.storeName}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Welcome to your exclusive offer from <span className="font-semibold text-primary">{scanData.storeName}</span>
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Offer Title */}
            <div className="mb-8">
              <Smartphone className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {scanData.offerText}
              </h2>
              <p className="text-sm text-muted-foreground">
                Show this code at checkout
              </p>
            </div>

            {/* QR Code Section */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-inner border">
              <div className="bg-primary/10 rounded-lg p-8 mb-4">
                <QrCode className="mx-auto h-32 w-32 text-primary" />
              </div>
              
              {/* Tracking Code */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Your code:</p>
                <p className="text-2xl font-mono font-bold text-primary tracking-wider">
                  {scanData.trackingCode}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-sm text-muted-foreground mb-6 space-y-2">
              <p className="flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Present this screen or share your code
              </p>
              <p>Valid for this visit only</p>
            </div>

            {/* Call to Action */}
            <Button 
              className="w-full mb-4 h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              Ready to Use Offer
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer with Unsubscribe */}
      <footer className="text-center pb-6 px-4 safe-area-bottom">
        <button
          onClick={handleUnsubscribe}
          className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
        >
          Unsubscribe from SMS messages
        </button>
        <p className="text-xs text-muted-foreground mt-2">
          Powered by SMSify Marketing
        </p>
      </footer>
    </div>
  );
};

export default QRScan;
