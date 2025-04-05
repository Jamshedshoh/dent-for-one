import { User, UserPlus, UserCog, UserX, Search, Filter, ChevronDown, MoreVertical, Edit, Trash2, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '../Layout';

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@smilebright.com',
      role: 'Dentist',
      status: 'active',
      lastActive: 'Today, 9:42 AM',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@smilebright.com',
      role: 'Hygienist',
      status: 'active',
      lastActive: 'Today, 8:15 AM',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@smilebright.com',
      role: 'Receptionist',
      status: 'active',
      lastActive: 'Yesterday, 5:30 PM',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@smilebright.com',
      role: 'Dental Assistant',
      status: 'inactive',
      lastActive: '2 days ago',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 5,
      name: 'Jessica Kim',
      email: 'jessica.kim@smilebright.com',
      role: 'Office Manager',
      status: 'active',
      lastActive: 'Today, 10:20 AM',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  ];

  // Filter users based on search and active filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'active' && user.status === 'active') ||
                         (activeFilter === 'inactive' && user.status === 'inactive') ||
                         (activeFilter === 'dentist' && user.role === 'Dentist') ||
                         (activeFilter === 'staff' && user.role !== 'Dentist');
    
    return matchesSearch && matchesFilter;
  });

  // Roles for dropdown
  const roles = ['Dentist', 'Hygienist', 'Dental Assistant', 'Receptionist', 'Office Manager', 'Billing Specialist'];

  // Handle user actions
  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-600">Administer staff accounts and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddUserModal(true)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <UserPlus className="mr-2 h-5 w-5" /> Add New User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-2 rounded-md text-sm flex items-center ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
              >
                <Filter className="mr-1 h-4 w-4" /> All
              </button>
            </div>
            <div className="relative">
              <button 
                onClick={() => setActiveFilter('active')}
                className={`px-3 py-2 rounded-md text-sm flex items-center ${activeFilter === 'active' ? 'bg-green-600 text-white' : 'bg-white border border-gray-300'}`}
              >
                Active
              </button>
            </div>
            <div className="relative">
              <button 
                onClick={() => setActiveFilter('inactive')}
                className={`px-3 py-2 rounded-md text-sm flex items-center ${activeFilter === 'inactive' ? 'bg-gray-600 text-white' : 'bg-white border border-gray-300'}`}
              >
                Inactive
              </button>
            </div>
            <div className="relative">
              <div className="relative">
                <select 
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="appearance-none px-3 py-2 pr-8 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="dentist">Dentists</option>
                  <option value="staff">Staff Members</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900 p-1" title="Reset Password">
                          <Lock className="h-5 w-5" />
                        </button>
                        <div className="relative">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New User</h3>
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter full name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="user@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Set temporary password"
                />
              </div>
              <div className="flex items-center">
                <input 
                  id="send-invite" 
                  type="checkbox" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="send-invite" className="ml-2 block text-sm text-gray-700">
                  Send invitation email
                </label>
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 p-4">
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-600 hover:text-gray-800 mr-4"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle add user logic
                  setShowAddUserModal(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Edit User</h3>
              <button 
                onClick={() => setShowEditUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select 
                    defaultValue={selectedUser.role}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="active" 
                      defaultChecked={selectedUser.status === 'active'}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="inactive" 
                      defaultChecked={selectedUser.status === 'inactive'}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Send password reset email
                </button>
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 p-4">
              <button 
                onClick={() => setShowEditUserModal(false)}
                className="text-gray-600 hover:text-gray-800 mr-4"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle edit user logic
                  setShowEditUserModal(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <UserX className="h-6 w-6 text-red-500 mr-2" />
                <p className="text-gray-700">
                  Are you sure you want to delete <span className="font-semibold">{selectedUser.name}</span>?
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone. The user will lose all access to the Dent Manage system.
              </p>
              <div className="flex items-center">
                <input 
                  id="confirm-delete" 
                  type="checkbox" 
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="confirm-delete" className="ml-2 block text-sm text-gray-700">
                  I understand this action is permanent
                </label>
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 p-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-600 hover:text-gray-800 mr-4"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle delete user logic
                  setShowDeleteModal(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
};