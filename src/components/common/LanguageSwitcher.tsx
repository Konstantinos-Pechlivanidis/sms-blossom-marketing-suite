import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const isMobile = useIsMobile();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const languages = [
    { code: 'en', name: t('language.english') },
    { code: 'gr', name: t('language.greek') }
  ];

  const currentLanguageName = languages.find(
    (lang) => lang.code === i18n.language
  )?.name;

  return (
    <DropdownMenu>
      {isMobile ? (
        <DropdownMenuTrigger asChild>
          {/* On mobile, use an icon-only button to save space. */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t('language.selectLanguage')}</span>
          </Button>
        </DropdownMenuTrigger>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              {/* On desktop, show a button with the current language name. */}
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-2 px-3 text-sm"
              >
                <Languages className="h-4 w-4" />
                <span>{currentLanguageName}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {t('language.selectLanguage')}
          </TooltipContent>
        </Tooltip>
      )}

      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn({
              'font-bold bg-muted text-foreground': i18n.language === lang.code,
            })}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};