import { useEffect, useCallback } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * Custom hook to detect and warn about unsaved changes.
 * @param hasUnsavedChanges A boolean indicating if there are unsaved changes.
 * @param message The message to display in the confirmation dialog.
 */
export const useUnsavedChanges = (hasUnsavedChanges: boolean, message: string = "You have unsaved changes. Are you sure you want to leave?") => {
  const blocker = useBlocker(hasUnsavedChanges);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = message; // Standard for most browsers
        return message; // Standard for Firefox
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, message]);

  // Handle blocker state from react-router-dom
  useEffect(() => {
    if (blocker?.state === 'blocked' && hasUnsavedChanges) {
      if (window.confirm(message)) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, hasUnsavedChanges, message]);
};