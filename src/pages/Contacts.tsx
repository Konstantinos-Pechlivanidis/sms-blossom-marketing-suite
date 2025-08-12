import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Search,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  MoreHorizontal,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Crown,
  Filter,
  TrendingUp,
  UserCheck,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { PageHeader } from '@/components/common/PageHeader';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { EmptyState } from '@/components/common/EmptyState';
import { dummyContacts, customViews } from '@/data/mock-data';
import type { Contact, CustomView } from '@/types';
import AddContactForm from '@/components/contacts/AddContactForm';
import EditContactForm from '@/components/contacts/EditContactForm';
import ViewContactDetails from '@/components/contacts/ViewContactDetails';
import { useIsMobile } from '@/hooks/use-mobile';

type FilterType = 'all' | 'male' | 'female' | 'vip' | 'high-conversions' | 'birthday-club' | string;

const Contacts = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['all']);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    if (searchQuery) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.phone && contact.phone.includes(searchQuery)) ||
        (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (!activeFilters.includes('all')) {
      filtered = filtered.filter(contact => {
        return activeFilters.every(filter => {
          switch (filter) {
            case 'male':
              return contact.gender === 'male';
            case 'female':
              return contact.gender === 'female';
            case 'vip':
              return contact.isVip;
            case 'high-conversions':
              return contact.conversions >= 10;
            case 'birthday-club':
              return contact.tags.includes('Birthday Club');
            default:
              return true;
          }
        });
      });
    }

    return filtered;
  }, [contacts, searchQuery, activeFilters]);
  
  const totalItems = filteredContacts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContacts, currentPage, itemsPerPage]);

  const handleFilterToggle = (filter: FilterType) => {
    if (filter === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.filter(f => f !== 'all');
      if (newFilters.includes(filter)) {
        const updated = newFilters.filter(f => f !== filter);
        setActiveFilters(updated.length === 0 ? ['all'] : updated);
      } else {
        setActiveFilters([...newFilters, filter]);
      }
    }
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filter: FilterType) => {
    const updated = activeFilters.filter(f => f !== filter);
    setActiveFilters(updated.length === 0 ? ['all'] : updated);
  };

  const handleExportCSV = () => {
    toast.success(t('contacts.actions.export'));
  };

  const handleAddContact = (newContact: Contact) => {
    setContacts(prev => [...prev, { ...newContact, id: String(prev.length + 1) }]);
    setIsAddContactModalOpen(false);
    toast.success(t('contacts.actions.add') + ' ' + t('common.success'));
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    ));
    setEditingContact(null);
    toast.success(t('contacts.modals.editTitle') + ' ' + t('common.success'));
  };

  const handleDeleteContact = (contact: Contact) => {
    setDeletingContact(contact);
  };

  const confirmDeleteContact = () => {
    if (deletingContact) {
      setContacts(prev => prev.filter(contact => contact.id !== deletingContact.id));
      toast.success(t('contacts.modals.deleteTitle') + ' ' + t('common.success'));
      setDeletingContact(null);
    }
  };

  const handleViewContact = (contact: Contact) => {
    setViewingContact(contact);
  };

  const getFilterLabel = (filter: FilterType) => {
    switch (filter) {
      case 'all':
        return t('contacts.filters.all');
      case 'male':
        return t('contacts.filters.men');
      case 'female':
        return t('contacts.filters.women');
      case 'vip':
        return t('contacts.filters.vip');
      case 'high-conversions':
        return t('contacts.filters.highConversions');
      case 'birthday-club':
        return t('contacts.filters.birthdayClub');
      default:
        return filter;
    }
  };

  const handleItemsPerPageChange = useCallback((value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  const renderModal = (modalType: 'add' | 'edit' | 'view', isOpen: boolean, onOpenChange: (open: boolean) => void, content: React.ReactNode, title: string, description?: string) => {
    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent className="rounded-t-3xl fixed bottom-0 left-0 right-0 max-h-[90vh] flex flex-col">
            <div className="overflow-y-auto px-6">
              <DrawerHeader className="text-center pt-6 pb-4">
                <DrawerTitle className="text-2xl font-bold">{title}</DrawerTitle>
                {description && <DrawerDescription>{description}</DrawerDescription>}
              </DrawerHeader>
              {content}
            </div>
            <DrawerFooter className="pt-2">
              {/* <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full rounded-2xl">
                {t('common.cancel')}
              </Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    } else {
      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-md rounded-2xl shadow-xl p-6">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            {content}
          </DialogContent>
        </Dialog>
      );
    }
  };

  return (
    <div className="space-y-6 bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 rounded-3xl">
      <PageHeader
        title={t('contacts.title')}
        description={t('contacts.description')}
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleExportCSV} className="rounded-full shadow-soft-sm">
            <Download className="w-4 h-4 mr-2" />
            {t('contacts.actions.export')}
          </Button>
          <Button className="bg-primary hover:bg-primary-hover rounded-full shadow-soft-sm" onClick={() => setIsAddContactModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t('contacts.actions.add')}
          </Button>
        </div>
      </PageHeader>

      {/* Search and Filters */}
      <Card className="rounded-3xl shadow-soft-lg border border-gray-200 dark:border-gray-800">
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t('contacts.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-2xl border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilters.includes('all') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('all')}
                className="flex items-center gap-2 rounded-full shadow-soft-sm"
              >
                {t('contacts.filters.all')} ({contacts.length})
              </Button>
              <Button
                variant={activeFilters.includes('male') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('male')}
                className="flex items-center gap-2 rounded-full shadow-soft-sm"
              >
                {t('contacts.filters.men')} ({contacts.filter(c => c.gender === 'male').length})
              </Button>
              <Button
                variant={activeFilters.includes('female') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('female')}
                className="flex items-center gap-2 rounded-full shadow-soft-sm"
              >
                {t('contacts.filters.women')} ({contacts.filter(c => c.gender === 'female').length})
              </Button>
              <Button
                variant={activeFilters.includes('vip') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('vip')}
                className="flex items-center gap-2 rounded-full shadow-soft-sm"
              >
                {t('contacts.filters.vip')} ({contacts.filter(c => c.isVip).length})
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">{t('contacts.filters.customViews')}:</span>
              {customViews.map(view => (
                <Button
                  key={view.id}
                  variant={activeFilters.includes(view.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterToggle(view.id)}
                  className="flex items-center gap-2 rounded-full shadow-soft-sm"
                >
                  {getFilterLabel(view.id)}
                </Button>
              ))}
            </div>

            {!activeFilters.includes('all') && activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm text-muted-foreground font-medium">{t('contacts.filters.active')}:</span>
                {activeFilters.map(filter => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1 rounded-full shadow-soft-sm">
                    {getFilterLabel(filter)}
                    <X
                      className="w-3 h-3 cursor-pointer text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveFilter(filter)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <Card className="rounded-3xl shadow-soft-lg border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-lg">
            <span className="text-2xl font-bold">{t('contacts.title')} ({totalItems})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div key={index} className="h-28 w-full p-4 border rounded-3xl animate-pulse bg-muted/50 shadow-soft-sm"></div>
              ))}
            </div>
          ) : filteredContacts.length === 0 ? (
            <EmptyState
              icon={Users}
              title={t('contacts.empty.title')}
              description={t('contacts.empty.description')}
              ctaText={t('contacts.empty.ctaText')}
            />
          ) : (
            <div className="space-y-3">
              {paginatedContacts.map(contact => (
                <div
                  key={contact.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-3xl transition-colors duration-200 ease-in-out cursor-pointer",
                    "bg-white dark:bg-gray-900 shadow-soft-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 min-w-0">
                    {/* Primary Info */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-semibold text-primary">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm md:text-lg text-foreground truncate">{contact.name}</h3>
                          {contact.isVip && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 rounded-full text-xs hover:bg-yellow-100">
                              {t('contacts.filters.vip')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{contact.phone}</p>
                      </div>
                    </div>
                    
                    {/* Tags and Secondary Info */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-2 sm:gap-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="rounded-full text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground text-xs">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span className='text-sm'>{t('campaigns.conversions')}: {contact.conversions}</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className='text-sm'>{t('contacts.form.joinDate')}: {new Date(contact.joinDate || '').toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="shrink-0 p-1 md:p-2 rounded-full hover:bg-gray-200">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-2 shadow-xl">
                      <DropdownMenuItem onClick={() => handleViewContact(contact)} className="rounded-lg p-2 flex items-center gap-2 hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-gray-700" />
                        {t('contacts.actions.view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditContact(contact)} className="rounded-lg p-2 flex items-center gap-2 hover:bg-gray-100">
                        <Edit2 className="w-4 h-4 text-gray-700" />
                        {t('common.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-lg p-2 flex items-center gap-2 text-destructive hover:bg-red-50"
                        onClick={() => handleDeleteContact(contact)}
                      >
                        <Trash2 className="w-4 h-4" />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Pagination & Items Per Page Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">{t('contacts.show')}</p>
            <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-[100px] rounded-full">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent className="rounded-2xl shadow-xl">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={cn('rounded-full', { 'opacity-50 cursor-not-allowed': currentPage === 1 })}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                    className="rounded-full"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                aria-disabled={currentPage === totalPages}
                className={cn('rounded-full', { 'opacity-50 cursor-not-allowed': currentPage === totalPages })}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Add Contact Modal */}
      {renderModal(
        'add',
        isAddContactModalOpen,
        setIsAddContactModalOpen,
        <AddContactForm
          onSave={handleAddContact}
          onCancel={() => setIsAddContactModalOpen(false)}
        />,
        t('contacts.actions.add'),
        t('contacts.form.addDescription')
      )}

      {/* Edit Contact Modal */}
      {renderModal(
        'edit',
        !!editingContact,
        (open) => setEditingContact(open ? editingContact : null),
        editingContact ? (
          <EditContactForm
            contact={editingContact}
            onSave={handleSaveContact}
            onCancel={() => setEditingContact(null)}
          />
        ) : null,
        t('contacts.modals.editTitle'),
        t('contacts.modals.editDescription')
      )}

      {/* View Contact Modal */}
      {renderModal(
        'view',
        !!viewingContact,
        (open) => setViewingContact(open ? viewingContact : null),
        viewingContact ? <ViewContactDetails contact={viewingContact} /> : null,
        t('contacts.modals.viewTitle')
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingContact} onOpenChange={() => setDeletingContact(null)}>
        <AlertDialogContent className="rounded-2xl shadow-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('contacts.modals.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('contacts.modals.deleteDescription', { name: deletingContact?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogCancel className="w-full sm:w-auto rounded-xl">
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteContact}
              className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 rounded-xl"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contacts;