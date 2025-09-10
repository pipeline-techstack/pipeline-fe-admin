
"use client";
import { Pencil, Check, X } from 'lucide-react'
import { useState } from 'react'

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 321-0987'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 (555) 654-3210'
    }
  ])

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const startEdit = (customer) => {
    setEditingId(customer.id)
    setEditForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({
      name: '',
      email: '',
      phone: ''
    })
  }

  const saveEdit = () => {
    setCustomers(customers.map(customer => 
      customer.id === editingId 
        ? { ...customer, ...editForm }
        : customer
    ))
    setEditingId(null)
    setEditForm({
      name: '',
      email: '',
      phone: ''
    })
  }

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="mx-auto p-6 max-w-6xl container">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-gray-900 text-3xl">Customers</h1>
        <p className="text-gray-600">Manage your customer information</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-gray-200 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">Email</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">Phone Number</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {editingId === customer.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    ) : (
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === customer.id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    ) : (
                      <div className="text-gray-600">{customer.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === customer.id ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    ) : (
                      <div className="text-gray-600">{customer.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId === customer.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={saveEdit}
                          className="inline-flex items-center bg-green-600 hover:bg-green-700 px-3 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-white text-sm leading-4 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="inline-flex items-center bg-white hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 text-sm leading-4 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(customer)}
                        className="inline-flex items-center bg-white hover:bg-gray-50 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 text-sm leading-4 transition-colors"
                      >
                        <Pencil className="mr-2 w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 text-gray-500 text-sm">
        Total customers: {customers.length}
      </div>
    </div>
  )
}

export default CustomersPage