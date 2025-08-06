import { useState, useEffect } from "react";

export const useSMSCredits = () => {
  const [smsCredits, setSmsCredits] = useState("2,847");

  useEffect(() => {
    // Get SMS credits from localStorage and update display
    const credits = localStorage.getItem('smsCredits') || '2847';
    setSmsCredits(parseInt(credits).toLocaleString());
    
    // Listen for storage changes to update credits in real-time
    const handleStorageChange = () => {
      const credits = localStorage.getItem('smsCredits') || '2847';
      setSmsCredits(parseInt(credits).toLocaleString());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateCredits = (newCredits: number) => {
    localStorage.setItem('smsCredits', newCredits.toString());
    setSmsCredits(newCredits.toLocaleString());
  };

  return { smsCredits, updateCredits };
};