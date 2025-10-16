import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useTask } from '../contexts/TaskContext';
import { 
  Send, 
  Plus, 
  Search, 
  Hash, 
  Users, 
  Smile,
  Paperclip,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';

const Chat = () => {
  const { 
    channels, 
    messages, 
    activeChannel, 
    onlineUsers, 
    typingUsers,
    sendMessage, 
    setActiveChannel, 
    addChannel 
  } = useChat();
  
  const { teamMembers } = useTask();
  const [newMessage, setNewMessage] = useState('');
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages[activeChannel]]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      addChannel(newChannelName.trim());
      setNewChannelName('');
      setShowChannelModal(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
    return today.toDateString() === messageDate.toDateString();
  };

  const getAuthorName = (userId) => {
    const member = teamMembers.find(m => m.id === userId);
    return member ? member.name : 'Unknown User';
  };

  const getAuthorAvatar = (userId) => {
    const member = teamMembers.find(m => m.id === userId);
    return member ? member.name.charAt(0) : 'U';
  };

  const currentChannel = channels.find(c => c.id === activeChannel);
  const channelMessages = messages[activeChannel] || [];

  const Message = ({ message, isOwn, showAvatar }) => (
    <div className={`flex items-start space-x-3 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {showAvatar && !isOwn && (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-white">
            {getAuthorAvatar(message.sender)}
          </span>
        </div>
      )}
      {showAvatar && isOwn && <div className="w-8" />}
      
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-auto' : ''}`}>
        {showAvatar && !isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900">
              {getAuthorName(message.sender)}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>
          </div>
        )}
        
        <div className={`px-4 py-2 rounded-2xl ${
          isOwn 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        
        {showAvatar && isOwn && (
          <div className="text-xs text-gray-500 text-right mt-1">
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>
      
      {!showAvatar && (
        <div className={`text-xs text-gray-500 self-end pb-1 ${isOwn ? 'text-right' : ''}`}>
          {formatTime(message.timestamp)}
        </div>
      )}
    </div>
  );

  const ChannelModal = () => {
    if (!showChannelModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Channel</h2>
          <input
            type="text"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateChannel()}
            placeholder="Channel name..."
            className="apple-input mb-4"
            autoFocus
          />
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setShowChannelModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateChannel}
              className="btn-primary"
              disabled={!newChannelName.trim()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
            <button 
              onClick={() => setShowChannelModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full pl-9 pr-3 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeChannel === channel.id 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Hash className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-sm truncate">{channel.name}</span>
                {/* {getUnreadCount(channel.id) > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {getUnreadCount(channel.id)}
                  </span>
                )} */}
              </button>
            ))}
          </div>
        </div>

        {/* Online Users */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Online ({onlineUsers.length})</h3>
          <div className="space-y-2">
            {teamMembers.filter(member => onlineUsers.includes(member.id)).map(member => (
              <div key={member.id} className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <span className="text-sm text-gray-700 truncate">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <Hash className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentChannel?.name}</h3>
                <p className="text-sm text-gray-500">
                  {currentChannel?.members.length} members
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {channelMessages.length > 0 ? (
            channelMessages.map((message, index) => {
              const isOwn = message.sender === '1'; // Current user
              const prevMessage = channelMessages[index - 1];
              const showAvatar = !prevMessage || 
                                prevMessage.sender !== message.sender ||
                                (new Date(message.timestamp) - new Date(prevMessage.timestamp)) > 300000; // 5 minutes
              
              return (
                <Message 
                  key={message.id} 
                  message={message} 
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                />
              );
            })
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Hash className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to #{currentChannel?.name}</h3>
              <p className="text-gray-500">Start the conversation by sending a message!</p>
            </div>
          )}
          
          {/* Typing Indicator */}
          {typingUsers[activeChannel] && typingUsers[activeChannel].length > 0 && (
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
              <span>Someone is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Message #${currentChannel?.name}`}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Smile className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-xl transition-colors ${
                newMessage.trim() 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Channel Creation Modal */}
      <ChannelModal />
    </div>
  );
};

export default Chat;