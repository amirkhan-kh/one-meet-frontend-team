import { useUser } from "@/lib/hook/useUser";

export default function PersonalInfo({ formData, handleInputChange, userPut, isChanged, resetForm }) {
  const userData = useUser();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your first name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your last name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={userData?.user?.email}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          // value={formData.bio}
          // onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your bio"
        />
      </div>

      <div className="flex justify-start gap-4">
        <button
          onClick={userPut}
          disabled={!isChanged}
          className={`px-4 py-2 rounded-md ${isChanged ? 'bg-[#2a43d4] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Save Changes
        </button>
        <button onClick={resetForm} className="px-4 py-2 text-gray-700 hover:bg-gray-100 border rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
