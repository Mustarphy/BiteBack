import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon } from '@heroicons/react/24/outline';
import { compressImage } from '../utils/imageCompression';
import { useOrders } from '../context/OrderContext';

function OrderHistory() {
  const { orders, loading } = useOrders();

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders yet</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Order #{order.id.slice(-6)}</span>
            <span className={`status-badge ${order.status}`}>
              {order.status}
            </span>
          </div>
          <div className="space-y-2">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Profile() {
  const { currentUser, updateProfile, changePassword, sendVerificationEmail } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();

  const [profileForm, setProfileForm] = useState({
    name: currentUser.displayName || '',
    photoFile: null,
    photoPreview: null
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        
        // Create preview immediately
        const preview = URL.createObjectURL(file);
        setProfileForm(prev => ({
          ...prev,
          photoPreview: preview
        }));

        // Pre-compress image before storing in state
        const compressedFile = await compressImage(file, 0.6); // More aggressive compression
        
        setProfileForm(prev => ({
          ...prev,
          photoFile: compressedFile,
          photoPreview: preview
        }));
      } catch (error) {
        setError('Error processing image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    setIsUploading(profileForm.photoFile !== null);
    setUploadProgress(0);

    try {
      const result = await updateProfile({
        name: profileForm.name,
        photoFile: profileForm.photoFile,
        onProgress: (progress) => {
          setUploadProgress(progress);
        }
      });

      if (result.success) {
        setSuccess('Profile updated successfully');
        setIsEditingProfile(false);
        // Clear the file input and preview
        setProfileForm(prev => ({
          ...prev,
          photoFile: null,
          photoPreview: null
        }));
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update profile');
    }

    setLoading(false);
    setIsUploading(false);
  };

  const handleVerificationEmail = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await sendVerificationEmail();
      if (result.success) {
        setVerificationSent(true);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to send verification email');
    }

    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const result = await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      if (result.success) {
        setSuccess('Password updated successfully');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
        setIsChangingPassword(false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update password');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="mt-10 text-3xl font-bold mb-8">My Profile</h1>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        
        {!isEditingProfile ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="h-20 w-20 text-gray-400" />
              )}
              <div>
                <p className="text-xl font-medium">{currentUser.displayName}</p>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            
            {/* Email Verification Status */}
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                currentUser.emailVerified 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentUser.emailVerified ? 'Verified' : 'Not Verified'}
              </span>
              {!currentUser.emailVerified && !verificationSent && (
                <button
                  onClick={handleVerificationEmail}
                  disabled={loading}
                  className="text-green-400 hover:text-green-500 text-sm"
                >
                  Send verification email
                </button>
              )}
              {verificationSent && (
                <span className="text-green-600 text-sm">
                  Verification email sent!
                </span>
              )}
            </div>

            <button
              onClick={() => setIsEditingProfile(true)}
              className="btnbg-green-400 hover:bg-green-500"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {success}
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                {(profileForm.photoPreview || currentUser.photoURL) ? (
                  <img
                    src={profileForm.photoPreview || currentUser.photoURL}
                    alt={currentUser.displayName}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-20 w-20 text-gray-400" />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Change Photo
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-400 focus:border-green-400"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn bg-green-400 hover:bg-green-500"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Upload Progress Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Uploading Photo</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center text-gray-600">
              {uploadProgress}% Complete
            </p>
          </div>
        </div>
      )}

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        
        {!isChangingPassword ? (
          <button
            onClick={() => setIsChangingPassword(true)}
            className="btn bg-green-400 hover:bg-green-500"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {success}
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmNewPassword}
                onChange={(e) => setPasswordForm(prev => ({
                  ...prev,
                  confirmNewPassword: e.target.value
                }))}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-400 focus:border-green-400"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn bg-green-400 hover:bg-green-500"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <OrderHistory />
      </div>
    </div>
  );
}

export default Profile; 