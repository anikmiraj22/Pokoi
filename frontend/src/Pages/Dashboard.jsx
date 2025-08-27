import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';
import authService from '../appwrite/auth';

export const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    tasks: 0
  });

  useEffect(() => {
    setStats({
      employees: 24,
      projects: 12,
      tasks: 48
    });
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(clearUser());
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logout Button */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-indigo-900 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Stat cards */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <i className="fas fa-users text-white text-xl"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Employees</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.employees}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <i className="fas fa-tasks text-white text-xl"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Projects</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.projects}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <i className="fas fa-clipboard-list text-white text-xl"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Tasks</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.tasks}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome message */}
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Welcome back, {user?.name}!</h2>
                <p className="mt-2 text-sm text-gray-500">
                  You have {stats.tasks} tasks to complete across {stats.projects} projects.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Email: {user?.email}
                </p>
                {user?.emailVerification && (
                  <p className="mt-2 text-sm text-green-500">
                    <i className="fas fa-check-circle mr-1"></i> Email verified
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left flex items-center text-blue-600 hover:text-blue-800">
                    <i className="fas fa-plus-circle mr-2"></i> Add New Employee
                  </button>
                  <button className="w-full text-left flex items-center text-blue-600 hover:text-blue-800">
                    <i className="fas fa-project-diagram mr-2"></i> Create Project
                  </button>
                  <button className="w-full text-left flex items-center text-blue-600 hover:text-blue-800">
                    <i className="fas fa-tasks mr-2"></i> Assign Task
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <i className="fas fa-user-plus text-blue-600"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">New employee added</p>
                      <p className="text-sm text-gray-500">John Doe joined the team</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      <i className="fas fa-check-circle text-green-600"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Project completed</p>
                      <p className="text-sm text-gray-500">Website redesign finished</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};