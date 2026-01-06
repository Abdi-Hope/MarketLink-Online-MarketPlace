import React, { useState } from 'react';

const ShippingAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Smith',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '(555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      name: 'John Smith',
      street: '456 Oak Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      phone: '(555) 987-6543',
      isDefault: false
    },
    {
      id: 3,
      name: 'Jane Smith',
      street: '789 Pine Road',
      city: 'Queens',
      state: 'NY',
      zipCode: '11354',
      phone: '(555) 456-7890',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false
  });

  const handleAddAddress = () => {
    if (newAddress.isDefault) {
      // Update all addresses to not default
      setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
    }
    
    const newAddr = {
      ...newAddress,
      id: addresses.length + 1
    };
    
    setAddresses(prev => [...prev, newAddr]);
    setNewAddress({
      name: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      isDefault: false
    });
    setShowAddForm(false);
    setSelectedAddress(newAddr.id);
  };

  const handleDeleteAddress = (id) => {
    if (addresses.length <= 1) {
      alert('You must have at least one address');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      if (selectedAddress === id) {
        setSelectedAddress(addresses[0].id);
      }
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleChangeNewAddress = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectedAddressData = addresses.find(addr => addr.id === selectedAddress);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Shipping Address</h3>
        <p className="text-gray-600 text-sm mt-1">Choose where to ship your order</p>
      </div>

      {/* Address Selection */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectedAddress(address.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAddress === address.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900">{address.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zipCode}<br />
                    {address.phone}
                  </div>
                </div>
                {address.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefault(address.id);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Set as Default
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add New Address Card */}
          <div
            onClick={() => setShowAddForm(true)}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium text-gray-700">Add New Address</span>
          </div>
        </div>

        {/* Add New Address Form */}
        {showAddForm && (
          <div className="mt-6 p-6 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">Add New Address</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleChangeNewAddress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleChangeNewAddress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apartment, Suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={newAddress.apartment}
                  onChange={handleChangeNewAddress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Apt 4B"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleChangeNewAddress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleChangeNewAddress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleChangeNewAddress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="10001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleChangeNewAddress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={handleChangeNewAddress}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                  Set as default shipping address
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Address Details */}
        {selectedAddressData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">Shipping to:</h4>
                <div className="mt-2 text-gray-600">
                  <div className="font-medium">{selectedAddressData.name}</div>
                  <div>{selectedAddressData.street}</div>
                  <div>{selectedAddressData.city}, {selectedAddressData.state} {selectedAddressData.zipCode}</div>
                  <div>{selectedAddressData.phone}</div>
                </div>
              </div>
              {selectedAddressData.isDefault && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Default Address
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;