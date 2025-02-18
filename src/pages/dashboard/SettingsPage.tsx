import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { toast } from 'react-hot-toast';

interface ProfileForm {
  name: string;
  email: string;
  bio: string;
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setForm({
            name: userData.name || '',
            email: user.email || '',
            bio: userData.bio || ''
          });
        }
      } catch (error) {
        toast.error('Failed to load profile');
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: form.name,
        bio: form.bio,
        updatedAt: new Date().toISOString()
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700">
            <div className="p-8">
              <h1 className="text-3xl font-black mb-8 transform -rotate-1">
                My Profile
              </h1>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* User Initials Section */}
                <div className="w-full md:w-auto">
                  <div className="w-32 h-32 rounded-lg border-4 border-black dark:border-gray-700 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                      {getInitials(form.name)}
                    </span>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <label className="block font-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-700 
                        rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 
                        transform hover:-rotate-1 transition-transform"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-gray-700 
                        rounded-md text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold">
                      Bio
                    </label>
                    <textarea
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-700 
                        rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 
                        transform hover:-rotate-1 transition-transform"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full md:w-auto px-6 py-3 bg-black dark:bg-white text-white dark:text-black 
                      font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 
                      transform hover:-rotate-1 transition-all flex items-center justify-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>

            {/* Password Section */}
            <div className="p-8 border-t-4 border-black dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Password</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Want to change your password?
              </p>
              <button
                onClick={() => navigate('/auth/reset-password')}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-900 text-black dark:text-white 
                  font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 
                  transform hover:-rotate-1 transition-transform"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}