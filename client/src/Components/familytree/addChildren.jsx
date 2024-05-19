import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/formstyle.css";
import { toast } from 'react-toastify';

const AddChildrenForm = () => {
  const [persons, setPersons] = useState({});
  const [selectedParentId, setSelectedParentId] = useState('');
  const [unions, setUnions] = useState({});
  const [childName, setChildName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tree');
        setPersons(response.data.persons);
        setUnions(response.data.unions);
      } catch (error) {
        console.error('Failed to fetch tree:', error);
      }
    };

    fetchTree();
  }, []);

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    // Here, you would handle the form submission to your backend
    console.log({
      selectedParentId,
      childName,
      birthDate,
      deathDate,
      birthPlace,
    });
    let new_union_number = `u${Object.keys(unions).length + 1}`;
    let new_person_number = `id${Object.keys(persons).length + 1}`;
    console.log(persons[selectedParentId]);   
    console.log(new_person_number,new_union_number); 

    let parent_update = persons[selectedParentId];
    delete parent_update._id;
    delete parent_update.__v;

    let child = {
        id: new_person_number,
        name: childName,
        birthyear: parseInt(birthDate.slice(0,4)),
        deathyear: deathDate ? parseInt(deathDate.slice(0,4)) : null,
        own_unions: [],
        parent_union: new_union_number,
    }

    //chech if parent has any unions
    if (parent_update.own_unions.length == 0){
        console.log("no union exists");
        parent_update.own_unions.push(new_union_number);
        let new_union = {
            id: new_union_number,
            partner: [selectedParentId],
            children: [new_person_number],
        }
        console.log(new_union);
        let response_union = await axios.post('http://localhost:5000/tree/unions',new_union);
        let response_parent = await axios.put(`http://localhost:5000/tree/persons/${selectedParentId}`,parent_update);

        child.parent_union = new_union_number;
        console.log(child);
        let response_child = await axios.post('http://localhost:5000/tree/persons',child);

    }
    else{
        console.log("union already exists: ",parent_update.own_unions[0])
        let union_id = parent_update.own_unions[0];
        let union_update = unions[union_id];
        console.log(union_update);

        delete union_update._id;
        delete union_update.__v;
        union_update.children.push(new_person_number);

        let response_union = await axios.put(`http://localhost:5000/tree/unions/${union_id}`,union_update);
        console.log("response union",response_union);
        
        child.parent_union = union_id;
        let response_child = await axios.post('http://localhost:5000/tree/persons',child);
    }

    console.log("updated parent",parent_update);
    console.log("added child",child);
    toast.success('Child added successfully');
    window.location.reload();
  }
  catch (error) {
    console.error('Failed to add child:', error);
    toast.error('Failed to add child');
  }
}

  return (
    <div className="form-container form">
    <form onSubmit={handleSubmit}>
      <h2>Add Children</h2>
      <div>
        <label>Parent's Name:</label>
        <select value={selectedParentId} onChange={(e) => setSelectedParentId(e.target.value)}>
          <option value="">Select a parent</option>
          {Object.entries(persons).map(([id, { name }]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Child's Name:</label>
        <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} />
      </div>
      <div>
        <label>Birth Date:</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      </div>
      <div>
        <label>Death Date (optional):</label>
        <input type="date" value={deathDate} onChange={(e) => setDeathDate(e.target.value)} />
      </div>
      <div>
        <label>Birth Place:</label>
        <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AddChildrenForm;