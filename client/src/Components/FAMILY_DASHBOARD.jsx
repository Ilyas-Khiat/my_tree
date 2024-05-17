import React, { useState } from 'react';

const FamilyDashboard = () => {
  const [showAddParentForm, setShowAddParentForm] = useState(false);

  const handleAddParent = (e) => {
    e.preventDefault();
    console.log('Adding parent...');
  };

  const handleModifyNode = () => {
    console.log('Modifying node...');
  };

  const handleDeleteNode = () => {
    console.log('Deleting node...');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-start gap-4 mb-4">
        <h1 className="text-3xl font-bold text-black">Family Tree</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowAddParentForm(!showAddParentForm)}
        >
          Add Parent
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleModifyNode}
        >
          Modify Node
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteNode}
        >
          Delete Node
        </button>
      </div>
      {showAddParentForm && (
        <form className="max-w-sm" onSubmit={handleAddParent}>
          <input
            type="text"
            placeholder="Parent Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mt-4"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FamilyDashboard;