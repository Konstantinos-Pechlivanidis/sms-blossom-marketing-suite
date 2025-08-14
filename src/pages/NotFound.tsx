import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SignalZero, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Background Gradient using the App's Primary Color */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      
      <div className="z-10 text-center p-8 max-w-lg mx-auto">
        
        {/* Themed Icon */}
        <SignalZero
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-primary opacity-50 mb-6"
          strokeWidth={1.5}
        />

        {/* Creative Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          Oops! Lost Signal.
        </h1>

        {/* Friendly and Themed Description */}
        <p className="mt-4 max-w-md mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400">
          It seems the page you’re trying to reach didn't get the message. Let's get you back on a clear channel.
        </p>

        {/* Consistent Action Button */}
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="h-12 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-in-out hover:scale-105 shadow-soft-sm"
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;