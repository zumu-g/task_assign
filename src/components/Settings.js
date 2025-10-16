import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Download, 
  Upload,
  Trash2,
  Save,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  Globe,
  Mail,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const { teamMembers, setViewMode, viewMode } = useTask();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Alice Johnson',
      email: 'alice@company.com',
      role: 'Project Manager',
      timezone: 'America/New_York',
      language: 'en'
    },
    preferences: {
      theme: 'light',
      defaultView: 'kanban',
      emailNotifications: true,
      pushNotifications: true,
      soundEnabled: true,
      compactMode: false
    },
    notifications: {
      taskAssigned: true,
      taskCompleted: true,
      deadlineReminders: true,
      chatMessages: true,
      ticketUpdates: true,
      dailyDigest: true,
      weeklyReport: false
    },
    privacy: {
      profileVisibility: 'team',
      activityTracking: true,
      dataSharing: false,
      analyticsOptIn: true
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'data', name: 'Data', icon: Download }
  ];

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {settings.profile.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{settings.profile.name}</h3>
          <p className="text-gray-600">{settings.profile.role}</p>
          <button className="btn-secondary mt-2 text-sm">Change Avatar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => updateSetting('profile', 'name', e.target.value)}
            className="apple-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => updateSetting('profile', 'email', e.target.value)}
            className="apple-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={settings.profile.role}
            onChange={(e) => updateSetting('profile', 'role', e.target.value)}
            className="apple-input"
          >
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.profile.timezone}
            onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
            className="apple-input"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.profile.language}
            onChange={(e) => updateSetting('profile', 'language', e.target.value)}
            className="apple-input"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
      </div>
    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', name: 'Light', icon: Sun },
                { id: 'dark', name: 'Dark', icon: Moon },
                { id: 'system', name: 'System', icon: Monitor }
              ].map(theme => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => updateSetting('preferences', 'theme', theme.id)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      settings.preferences.theme === theme.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
            <select
              value={settings.preferences.defaultView}
              onChange={(e) => updateSetting('preferences', 'defaultView', e.target.value)}
              className="apple-input"
            >
              <option value="kanban">Kanban Board</option>
              <option value="list">List View</option>
              <option value="calendar">Calendar</option>
            </select>
          </div>

          <ToggleSwitch
            enabled={settings.preferences.compactMode}
            onChange={(value) => updateSetting('preferences', 'compactMode', value)}
            label="Compact Mode"
            description="Show more items on screen with reduced spacing"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.preferences.soundEnabled}
            onChange={(value) => updateSetting('preferences', 'soundEnabled', value)}
            label="Sound Effects"
            description="Play sounds for notifications and interactions"
          />
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.preferences.emailNotifications}
            onChange={(value) => updateSetting('preferences', 'emailNotifications', value)}
            label="Email Notifications"
            description="Receive notifications via email"
          />
          <ToggleSwitch
            enabled={settings.preferences.pushNotifications}
            onChange={(value) => updateSetting('preferences', 'pushNotifications', value)}
            label="Push Notifications"
            description="Receive browser or mobile push notifications"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.notifications.taskAssigned}
            onChange={(value) => updateSetting('notifications', 'taskAssigned', value)}
            label="Task Assignments"
            description="When a task is assigned to you"
          />
          <ToggleSwitch
            enabled={settings.notifications.taskCompleted}
            onChange={(value) => updateSetting('notifications', 'taskCompleted', value)}
            label="Task Completions"
            description="When tasks you're following are completed"
          />
          <ToggleSwitch
            enabled={settings.notifications.deadlineReminders}
            onChange={(value) => updateSetting('notifications', 'deadlineReminders', value)}
            label="Deadline Reminders"
            description="Reminders before task deadlines"
          />
          <ToggleSwitch
            enabled={settings.notifications.chatMessages}
            onChange={(value) => updateSetting('notifications', 'chatMessages', value)}
            label="Chat Messages"
            description="New messages in team chat"
          />
          <ToggleSwitch
            enabled={settings.notifications.ticketUpdates}
            onChange={(value) => updateSetting('notifications', 'ticketUpdates', value)}
            label="Ticket Updates"
            description="Updates on support tickets you're involved with"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Digest Reports</h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.notifications.dailyDigest}
            onChange={(value) => updateSetting('notifications', 'dailyDigest', value)}
            label="Daily Digest"
            description="Daily summary of your tasks and updates"
          />
          <ToggleSwitch
            enabled={settings.notifications.weeklyReport}
            onChange={(value) => updateSetting('notifications', 'weeklyReport', value)}
            label="Weekly Report"
            description="Weekly productivity and team insights"
          />
        </div>
      </div>
    </div>
  );

  const PrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile</label>
          <select
            value={settings.privacy.profileVisibility}
            onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
            className="apple-input"
          >
            <option value="public">Everyone</option>
            <option value="team">Team Members Only</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Analytics</h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.privacy.activityTracking}
            onChange={(value) => updateSetting('privacy', 'activityTracking', value)}
            label="Activity Tracking"
            description="Allow tracking of your activity for productivity insights"
          />
          <ToggleSwitch
            enabled={settings.privacy.analyticsOptIn}
            onChange={(value) => updateSetting('privacy', 'analyticsOptIn', value)}
            label="Analytics Participation"
            description="Help improve the product by sharing anonymous usage data"
          />
          <ToggleSwitch
            enabled={settings.privacy.dataSharing}
            onChange={(value) => updateSetting('privacy', 'dataSharing', value)}
            label="Data Sharing with Integrations"
            description="Allow third-party integrations to access your data"
          />
        </div>
      </div>
    </div>
  );

  const DataTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
        <p className="text-gray-600 mb-4">Download your data in various formats</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Export Tasks (CSV)</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Export Chat History</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Export Tickets</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Full Data Export</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Data</h3>
        <p className="text-gray-600 mb-4">Import data from other project management tools</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Import from Trello</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Import from Asana</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Import CSV File</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Import from Jira</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">Danger Zone</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
          <p className="text-red-700 text-sm mb-4">
            This will permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'preferences': return <PreferencesTab />;
      case 'notifications': return <NotificationsTab />;
      case 'privacy': return <PrivacyTab />;
      case 'data': return <DataTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-title">Settings</h1>
        <p className="text-body">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="apple-card">
            {renderTabContent()}
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="btn-primary flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;