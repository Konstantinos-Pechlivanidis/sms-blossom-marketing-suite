import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  UserCheck,
  Users,
  Crown,
  X,
  Phone,
  Mail,
  Calendar,
  TrendingUp
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender: 'male' | 'female';
  isVip: boolean;
  tags: string[];
  lastInteraction: string;
  conversions: number;
  joinDate?: string;
  notes?: string;
}

interface CustomView {
  id: string;
  name: string;
  filters: {
    gender?: 'male' | 'female';
    isVip?: boolean;
    tags?: string[];
  };
}

const dummyContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    gender: 'female',
    isVip: true,
    tags: ['Regular Customer'],
    lastInteraction: 'Last Campaign: Dec 15',
    conversions: 8,
    joinDate: '2023-06-15',
    notes: 'Prefers evening campaigns'
  },
  {
    id: '2',
    name: 'Mike Chen',
    phone: '+1 (555) 234-5678',
    email: 'mike.chen@email.com',
    gender: 'male',
    isVip: false,
    tags: ['New Customer'],
    lastInteraction: 'Last Campaign: Dec 10',
    conversions: 2,
    joinDate: '2023-11-20',
    notes: 'Interested in tech products'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    phone: '+1 (555) 345-6789',
    email: 'emma.rodriguez@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Birthday Club'],
    lastInteraction: 'Last Campaign: Dec 18',
    conversions: 12,
    joinDate: '2023-01-10',
    notes: 'High-value customer, responds well to personalized offers'
  },
  {
    id: '4',
    name: 'James Wilson',
    phone: '+1 (555) 456-7890',
    email: 'james.wilson@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Gym Member'],
    lastInteraction: 'Last Campaign: Dec 5',
    conversions: 3,
    joinDate: '2023-08-22',
    notes: 'Fitness enthusiast'
  },
  {
    id: '5',
    name: 'Lisa Park',
    phone: '+1 (555) 567-8901',
    email: 'lisa.park@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Fashion Lover'],
    lastInteraction: 'Last Campaign: Dec 20',
    conversions: 15,
    joinDate: '2023-03-05',
    notes: 'Fashion trendsetter, loves exclusive deals'
  },
  {
    id: '6',
    name: 'David Brown',
    phone: '+1 (555) 678-9012',
    email: 'david.brown@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Coffee Regular'],
    lastInteraction: 'Last Campaign: Dec 12',
    conversions: 4,
    joinDate: '2023-09-18',
    notes: 'Coffee lover, morning person'
  },
  {
    id: '7',
    name: 'Anna Martinez',
    phone: '+1 (555) 789-0123',
    email: 'anna.martinez@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Beauty Services'],
    lastInteraction: 'Last Campaign: Dec 19',
    conversions: 9,
    joinDate: '2023-02-28',
    notes: 'Beauty and wellness focused'
  },
  {
    id: '8',
    name: 'Tom Anderson',
    phone: '+1 (555) 890-1234',
    email: 'tom.anderson@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Seasonal'],
    lastInteraction: 'Last Campaign: Nov 28',
    conversions: 1,
    joinDate: '2023-10-05',
    notes: 'Seasonal shopper'
  },
  {
    id: '9',
    name: 'Rachel Green',
    phone: '+1 (555) 901-2345',
    email: 'rachel.green@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'High Spender'],
    lastInteraction: 'Last Campaign: Dec 21',
    conversions: 18,
    joinDate: '2023-01-15',
    notes: 'Premium customer, high lifetime value'
  },
  {
    id: '10',
    name: 'Alex Kim',
    phone: '+1 (555) 012-3456',
    email: 'alex.kim@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Tech Enthusiast'],
    lastInteraction: 'Last Campaign: Dec 8',
    conversions: 2,
    joinDate: '2023-11-12',
    notes: 'Tech savvy, likes gadgets'
  },
  {
    id: '11',
    name: 'Sofia Gonzalez',
    phone: '+1 (555) 111-2222',
    email: 'sofia.gonzalez@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Loyal Customer'],
    lastInteraction: 'Last Campaign: Dec 22',
    conversions: 11,
    joinDate: '2023-04-10',
    notes: 'Loyal customer, great referrer'
  },
  {
    id: '12',
    name: 'Ryan O\'Connor',
    phone: '+1 (555) 222-3333',
    email: 'ryan.oconnor@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Sports Fan'],
    lastInteraction: 'Last Campaign: Dec 7',
    conversions: 3,
    joinDate: '2023-07-25',
    notes: 'Sports enthusiast'
  },
  {
    id: '13',
    name: 'Maya Patel',
    phone: '+1 (555) 333-4444',
    email: 'maya.patel@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Wellness'],
    lastInteraction: 'Last Campaign: Dec 23',
    conversions: 14,
    joinDate: '2023-05-08',
    notes: 'Health and wellness focused'
  },
  {
    id: '14',
    name: 'Chris Taylor',
    phone: '+1 (555) 444-5555',
    email: 'chris.taylor@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Foodie'],
    lastInteraction: 'Last Campaign: Dec 11',
    conversions: 4,
    joinDate: '2023-06-30',
    notes: 'Food lover, restaurant deals'
  },
  {
    id: '15',
    name: 'Nicole White',
    phone: '+1 (555) 555-6666',
    email: 'nicole.white@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Fashion'],
    lastInteraction: 'Last Campaign: Dec 24',
    conversions: 16,
    joinDate: '2023-02-14',
    notes: 'Fashion forward, trend setter'
  },
  {
    id: '16',
    name: 'Daniel Lee',
    phone: '+1 (555) 666-7777',
    email: 'daniel.lee@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Student'],
    lastInteraction: 'Last Campaign: Dec 3',
    conversions: 1,
    joinDate: '2023-09-01',
    notes: 'Student discounts work well'
  },
  {
    id: '17',
    name: 'Jessica Thompson',
    phone: '+1 (555) 777-8888',
    email: 'jessica.thompson@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Premium'],
    lastInteraction: 'Last Campaign: Dec 25',
    conversions: 13,
    joinDate: '2023-03-20',
    notes: 'Premium service customer'
  },
  {
    id: '18',
    name: 'Marcus Johnson',
    phone: '+1 (555) 888-9999',
    email: 'marcus.johnson@email.com',
    gender: 'male',
    isVip: false,
    tags: ['Casual Shopper'],
    lastInteraction: 'Last Campaign: Dec 6',
    conversions: 2,
    joinDate: '2023-10-15',
    notes: 'Casual buyer, price sensitive'
  },
  {
    id: '19',
    name: 'Amanda Davis',
    phone: '+1 (555) 999-0000',
    email: 'amanda.davis@email.com',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Exclusive'],
    lastInteraction: 'Last Campaign: Dec 26',
    conversions: 20,
    joinDate: '2023-01-05',
    notes: 'VIP customer, exclusive offers only'
  },
  {
    id: '20',
    name: 'Kevin Zhang',
    phone: '+1 (555) 000-1111',
    email: 'kevin.zhang@email.com',
    gender: 'male',
    isVip: false,
    tags: ['New Member'],
    lastInteraction: 'Last Campaign: Dec 1',
    conversions: 1,
    joinDate: '2023-11-30',
    notes: 'New member, onboarding phase'
  }
];

const defaultCustomViews: CustomView[] = [
  {
    id: 'high-conversions',
    name: 'High Conversions',
    filters: {}
  },
  {
    id: 'birthday-club',
    name: 'Birthday Club',
    filters: {}
  }
];

type FilterType = 'all' | 'male' | 'female' | 'vip' | string;

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts);
  const [customViews] = useState<CustomView[]>(defaultCustomViews);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['all']);
  
  // Modal states
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      );
    }

    // Apply active filters
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
  };

  const handleRemoveFilter = (filter: FilterType) => {
    const updated = activeFilters.filter(f => f !== filter);
    setActiveFilters(updated.length === 0 ? ['all'] : updated);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  };

  const handleBulkDelete = () => {
    setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact.id)));
    toast({
      title: "Contacts Deleted",
      description: `${selectedContacts.length} contacts have been deleted.`,
    });
    setSelectedContacts([]);
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Your contacts are being exported to CSV.",
    });
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
    setEditingContact(null);
    toast({
      title: "Contact Updated",
      description: "Contact information has been saved successfully.",
    });
  };

  const handleDeleteContact = (contact: Contact) => {
    setDeletingContact(contact);
  };

  const confirmDeleteContact = () => {
    if (deletingContact) {
      setContacts(prev => prev.filter(contact => contact.id !== deletingContact.id));
      toast({
        title: "Contact Deleted",
        description: "Contact has been removed from your list.",
      });
      setDeletingContact(null);
    }
  };

  const handleViewContact = (contact: Contact) => {
    setViewingContact(contact);
  };

  const getFilterIcon = (filter: FilterType) => {
    switch (filter) {
      case 'all':
        return <Users className="w-4 h-4" />;
      case 'male':
        return <UserCheck className="w-4 h-4" />;
      case 'female':
        return <UserCheck className="w-4 h-4" />;
      case 'vip':
        return <Crown className="w-4 h-4" />;
      default:
        return <Filter className="w-4 h-4" />;
    }
  };

  const getFilterLabel = (filter: FilterType) => {
    switch (filter) {
      case 'all':
        return 'All Contacts';
      case 'male':
        return 'Men';
      case 'female':
        return 'Women';
      case 'vip':
        return 'VIP';
      case 'high-conversions':
        return 'High Conversions';
      case 'birthday-club':
        return 'Birthday Club';
      default:
        return filter;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your customer contact list</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilters.includes('all') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('all')}
                className="flex items-center gap-2"
              >
                {getFilterIcon('all')}
                All Contacts ({contacts.length})
              </Button>
              <Button
                variant={activeFilters.includes('male') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('male')}
                className="flex items-center gap-2"
              >
                {getFilterIcon('male')}
                Men ({contacts.filter(c => c.gender === 'male').length})
              </Button>
              <Button
                variant={activeFilters.includes('female') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('female')}
                className="flex items-center gap-2"
              >
                {getFilterIcon('female')}
                Women ({contacts.filter(c => c.gender === 'female').length})
              </Button>
              <Button
                variant={activeFilters.includes('vip') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterToggle('vip')}
                className="flex items-center gap-2"
              >
                {getFilterIcon('vip')}
                VIP ({contacts.filter(c => c.isVip).length})
              </Button>
            </div>

            {/* Custom Views */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 font-medium">Custom Views:</span>
              {customViews.map(view => (
                <Button
                  key={view.id}
                  variant={activeFilters.includes(view.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterToggle(view.id)}
                  className="flex items-center gap-2"
                >
                  {getFilterIcon(view.id)}
                  {view.name}
                </Button>
              ))}
            </div>

            {/* Active Filters */}
            {!activeFilters.includes('all') && activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm text-gray-500 font-medium">Active filters:</span>
                {activeFilters.map(filter => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {getFilterLabel(filter)}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => handleRemoveFilter(filter)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Add to List</Button>
                <Button variant="outline" size="sm">Remove from List</Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contacts ({filteredContacts.length})</span>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-500">Select All</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleSelectContact(contact.id)}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                      {contact.isVip && (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          <Crown className="w-3 h-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.phone}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="capitalize">{contact.gender}</span>
                      <span>•</span>
                      <span>{contact.lastInteraction}</span>
                      <span>•</span>
                      <span>{contact.conversions} conversions</span>
                    </div>
                    {contact.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {contact.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewContact(contact)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteContact(contact)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Contact Modal */}
      <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update contact information and preferences.
            </DialogDescription>
          </DialogHeader>
          {editingContact && (
            <EditContactForm 
              contact={editingContact} 
              onSave={handleSaveContact}
              onCancel={() => setEditingContact(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Contact Modal */}
      <Dialog open={!!viewingContact} onOpenChange={() => setViewingContact(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {viewingContact && <ViewContactDetails contact={viewingContact} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingContact} onOpenChange={() => setDeletingContact(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingContact?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteContact}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Edit Contact Form Component
const EditContactForm = ({ contact, onSave, onCancel }: {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value: 'male' | 'female') => setFormData(prev => ({ ...prev, gender: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Checkbox
            id="vip"
            checked={formData.isVip}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVip: !!checked }))}
          />
          <Label htmlFor="vip">VIP Customer</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags.join(', ')}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="VIP, Regular Customer, etc."
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Additional notes about this contact..."
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
};

// View Contact Details Component
const ViewContactDetails = ({ contact }: { contact: Contact }) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-xl font-semibold text-primary">
            {contact.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold">{contact.name}</h3>
            {contact.isVip && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Crown className="w-3 h-3 mr-1" />
                VIP
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {contact.phone}
            </div>
            {contact.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {contact.email}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{contact.conversions}</span>
            </div>
            <p className="text-sm text-gray-600">Conversions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">
                {contact.joinDate ? new Date(contact.joinDate).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <p className="text-sm text-gray-600">Join Date</p>
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Gender</Label>
          <p className="capitalize text-gray-900">{contact.gender}</p>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700">Last Interaction</Label>
          <p className="text-gray-900">{contact.lastInteraction}</p>
        </div>

        {contact.tags.length > 0 && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Tags</Label>
            <div className="flex gap-1 mt-1">
              {contact.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {contact.notes && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Notes</Label>
            <p className="text-gray-900 text-sm">{contact.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
