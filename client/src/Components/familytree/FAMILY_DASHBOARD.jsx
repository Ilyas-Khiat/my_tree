import React, { useState } from 'react';
import FamilyTreeComponent from './TreePage';
import AddChildrenForm from './addChildren';
import DeletePerson from './deletePerson';
import ModifyPersonForm from './modifyPerson';
import AddParentForm from './addParent';
import "./css/dashboard.css";

const FamilyDashboard = () => {
  const [showAddChildrenForm, setShowAddChildrenForm] = useState(false);
  const [showDeletePerson, setShowDeletePerson] = useState(false); 
  const [showModifyPerson, setShowModifyPerson] = useState(false);
  const [showAddParentForm, setShowAddParentForm] = useState(false);


  const handleAddChildren = (e) => {
    e.preventDefault();
    console.log('Adding Children...');
  };

  const handleModifyNode = () => {
    console.log('Modifying node...');
    setShowModifyPerson(!showModifyPerson);
  };

  const handleDeleteNode = () => {
    console.log('Deleting node...');
    setShowDeletePerson(!showDeletePerson);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-container flex-col items-start gap-50 mb-50">
        <h1 className="text-3xl font-bold text-black">Family Tree</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={() => setShowAddChildrenForm(!showAddChildrenForm)}
        >
          Add Children
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={() => setShowAddParentForm(!showAddParentForm)}
        >
          Add Parent
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={handleModifyNode}
        >
          Modify Node
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={handleDeleteNode}
        >
          Delete Node
        </button>
      </div>
      {showAddChildrenForm && <AddChildrenForm />}
      {showDeletePerson && <DeletePerson />} 
      {showModifyPerson && <ModifyPersonForm />}
      {showAddParentForm && <AddParentForm />}
      <div className='family-tree-container'>
      <FamilyTreeComponent />
      </div>
      
    </div>
  );
};

export default FamilyDashboard;