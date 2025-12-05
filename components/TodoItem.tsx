'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { FaCheck, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
  };
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, updates: Partial<{
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
  }>) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? format(new Date(todo.dueDate), "yyyy-MM-dd'T'HH:mm") : ''
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    setIsUpdating(true);
    try {
      await onUpdate(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
        dueDate: editDueDate || undefined,
      });
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${
      todo.priority === 'high' ? 'border-red-500' :
      todo.priority === 'medium' ? 'border-yellow-500' :
      'border-green-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Todo title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                rows={2}
              />
              <div className="flex gap-4">
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="datetime-local"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggle(todo._id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {todo.completed && <FaCheck className="text-white text-xs" />}
                </button>
                <h3
                  className={`text-lg font-medium ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {todo.title}
                </h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}
                >
                  {todo.priority}
                </span>
              </div>
              
              {todo.description && (
                <p className="mt-2 text-gray-600">{todo.description}</p>
              )}
              
              <div className="mt-2 text-sm text-gray-500">
                {todo.dueDate && (
                  <span>
                    Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy HH:mm')} • 
                  </span>
                )}
                <span> Created: {format(new Date(todo.createdAt), 'MMM dd, yyyy')}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating || !editTitle.trim()}
                className="p-2 text-green-600 hover:bg-green-50 rounded-md disabled:opacity-50"
                title="Save"
              >
                <FaSave />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(todo.title);
                  setEditDescription(todo.description || '');
                  setEditPriority(todo.priority);
                  setEditDueDate(todo.dueDate ? format(new Date(todo.dueDate), "yyyy-MM-dd'T'HH:mm") : '');
                }}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                title="Cancel"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                title="Delete"
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}