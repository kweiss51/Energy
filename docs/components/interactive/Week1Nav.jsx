import React from 'react';

export default function Week1Nav({ currentLesson, onNavigate }) {
  const lessons = [
    { title: 'What is Energy?', id: 0 },
    { title: 'Types of Energy & Global Flows', id: 1 },
    { title: 'The Grid & Why It Matters', id: 2 }
  ];
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded shadow mb-6">
      <div className="flex space-x-4 mb-2 md:mb-0">
        {lessons.map((l, i) => (
          <button
            key={l.id}
            className={`px-3 py-1 rounded ${currentLesson === i ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
            onClick={() => onNavigate(i)}
            aria-current={currentLesson === i ? 'page' : undefined}
          >
            {l.title}
          </button>
        ))}
      </div>
      <div>
        {currentLesson > 0 && (
          <button className="mr-2 px-3 py-1 bg-gray-200 rounded" onClick={() => onNavigate(currentLesson - 1)}>
            Previous
          </button>
        )}
        {currentLesson < lessons.length - 1 && (
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => onNavigate(currentLesson + 1)}>
            Next
          </button>
        )}
      </div>
    </nav>
  );
}
