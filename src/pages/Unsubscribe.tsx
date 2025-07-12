
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const trackingCode = searchParams.get('code');

  useEffect(() => {
    // Simulate API call to unsubscribe
    setTimeout(() => {
      if (trackingCode) {
        // Would make actual API call here
        console.log('Unsubscribing user with code:', trackingCode);
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1000);
  }, [trackingCode]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {status === 'loading' && (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                Processing...
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                Unsubscribed Successfully
              </>
            )}
            {status === 'error' && (
              <>
                <AlertCircle className="h-6 w-6 text-destructive" />
                Unable to Unsubscribe
              </>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <p className="text-muted-foreground">
              Please wait while we process your request...
            </p>
          )}
          
          {status === 'success' && (
            <>
              <p className="text-muted-foreground">
                You have been successfully unsubscribed from SMS marketing messages.
              </p>
              <p className="text-sm text-muted-foreground">
                You will no longer receive promotional texts from this store.
              </p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <p className="text-muted-foreground">
                We couldn't process your unsubscribe request at this time.
              </p>
              <p className="text-sm text-muted-foreground">
                Please try again later or contact support.
              </p>
            </>
          )}
          
          <Button 
            onClick={handleGoBack}
            variant="outline" 
            className="w-full mt-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unsubscribe;
