
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
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contact {
  id: string;
  name: string;
  phone: string;
  gender: 'male' | 'female';
  isVip: boolean;
  tags: string[];
  lastInteraction: string;
  conversions: number;
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
    gender: 'female',
    isVip: true,
    tags: ['Regular Customer'],
    lastInteraction: 'Last Campaign: Dec 15',
    conversions: 8
  },
  {
    id: '2',
    name: 'Mike Chen',
    phone: '+1 (555) 234-5678',
    gender: 'male',
    isVip: false,
    tags: ['New Customer'],
    lastInteraction: 'Last Campaign: Dec 10',
    conversions: 2
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    phone: '+1 (555) 345-6789',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Birthday Club'],
    lastInteraction: 'Last Campaign: Dec 18',
    conversions: 12
  },
  {
    id: '4',
    name: 'James Wilson',
    phone: '+1 (555) 456-7890',
    gender: 'male',
    isVip: false,
    tags: ['Gym Member'],
    lastInteraction: 'Last Campaign: Dec 5',
    conversions: 3
  },
  {
    id: '5',
    name: 'Lisa Park',
    phone: '+1 (555) 567-8901',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Fashion Lover'],
    lastInteraction: 'Last Campaign: Dec 20',
    conversions: 15
  },
  {
    id: '6',
    name: 'David Brown',
    phone: '+1 (555) 678-9012',
    gender: 'male',
    isVip: false,
    tags: ['Coffee Regular'],
    lastInteraction: 'Last Campaign: Dec 12',
    conversions: 4
  },
  {
    id: '7',
    name: 'Anna Martinez',
    phone: '+1 (555) 789-0123',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Beauty Services'],
    lastInteraction: 'Last Campaign: Dec 19',
    conversions: 9
  },
  {
    id: '8',
    name: 'Tom Anderson',
    phone: '+1 (555) 890-1234',
    gender: 'male',
    isVip: false,
    tags: ['Seasonal'],
    lastInteraction: 'Last Campaign: Nov 28',
    conversions: 1
  },
  {
    id: '9',
    name: 'Rachel Green',
    phone: '+1 (555) 901-2345',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'High Spender'],
    lastInteraction: 'Last Campaign: Dec 21',
    conversions: 18
  },
  {
    id: '10',
    name: 'Alex Kim',
    phone: '+1 (555) 012-3456',
    gender: 'male',
    isVip: false,
    tags: ['Tech Enthusiast'],
    lastInteraction: 'Last Campaign: Dec 8',
    conversions: 2
  },
  // Additional contacts to reach 20+
  {
    id: '11',
    name: 'Sofia Gonzalez',
    phone: '+1 (555) 111-2222',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Loyal Customer'],
    lastInteraction: 'Last Campaign: Dec 22',
    conversions: 11
  },
  {
    id: '12',
    name: 'Ryan O\'Connor',
    phone: '+1 (555) 222-3333',
    gender: 'male',
    isVip: false,
    tags: ['Sports Fan'],
    lastInteraction: 'Last Campaign: Dec 7',
    conversions: 3
  },
  {
    id: '13',
    name: 'Maya Patel',
    phone: '+1 (555) 333-4444',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Wellness'],
    lastInteraction: 'Last Campaign: Dec 23',
    conversions: 14
  },
  {
    id: '14',
    name: 'Chris Taylor',
    phone: '+1 (555) 444-5555',
    gender: 'male',
    isVip: false,
    tags: ['Foodie'],
    lastInteraction: 'Last Campaign: Dec 11',
    conversions: 4
  },
  {
    id: '15',
    name: 'Nicole White',
    phone: '+1 (555) 555-6666',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Fashion'],
    lastInteraction: 'Last Campaign: Dec 24',
    conversions: 16
  },
  {
    id: '16',
    name: 'Daniel Lee',
    phone: '+1 (555) 666-7777',
    gender: 'male',
    isVip: false,
    tags: ['Student'],
    lastInteraction: 'Last Campaign: Dec 3',
    conversions: 1
  },
  {
    id: '17',
    name: 'Jessica Thompson',
    phone: '+1 (555) 777-8888',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Premium'],
    lastInteraction: 'Last Campaign: Dec 25',
    conversions: 13
  },
  {
    id: '18',
    name: 'Marcus Johnson',
    phone: '+1 (555) 888-9999',
    gender: 'male',
    isVip: false,
    tags: ['Casual Shopper'],
    lastInteraction: 'Last Campaign: Dec 6',
    conversions: 2
  },
  {
    id: '19',
    name: 'Amanda Davis',
    phone: '+1 (555) 999-0000',
    gender: 'female',
    isVip: true,
    tags: ['VIP', 'Exclusive'],
    lastInteraction: 'Last Campaign: Dec 26',
    conversions: 20
  },
  {
    id: '20',
    name: 'Kevin Zhang',
    phone: '+1 (555) 000-1111',
    gender: 'male',
    isVip: false,
    tags: ['New Member'],
    lastInteraction: 'Last Campaign: Dec 1',
    conversions: 1
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
  const [contacts] = useState<Contact[]>(dummyContacts);
  const [customViews] = useState<CustomView[]>(defaultCustomViews);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['all']);

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

  const handleEditContact = (contactId: string) => {
    toast({
      title: "Edit Contact",
      description: "Contact edit functionality would open here.",
    });
  };

  const handleDeleteContact = (contactId: string) => {
    toast({
      title: "Contact Deleted",
      description: "Contact has been removed from your list.",
    });
  };

  const handleViewContact = (contactId: string) => {
    toast({
      title: "View Contact",
      description: "Contact details would open here.",
    });
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
                      <DropdownMenuItem onClick={() => handleViewContact(contact.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditContact(contact.id)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteContact(contact.id)}
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
    </div>
  );
};

export default Contacts;
