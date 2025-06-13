import React from 'react'

export default function AccountSettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your current password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="email"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your new password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="email"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your confirm new password"
        />
      </div>
      <div className="flex justify-start gap-4">
        <button className="px-4 py-2 bg-[#2a43d4] text-white rounded-md">
          Save Changes
        </button>
        <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 border rounded-md">
          Cancel
        </button>
      </div>
    </div>
  )
}
