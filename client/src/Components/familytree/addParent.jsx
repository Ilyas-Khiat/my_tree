import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/formstyle.css";
import { toast } from 'react-toastify';

const AddParentForm = () => {
  const [persons, setPersons] = useState({});
  const [selectedChildrenId, setSelectedChildrenId] = useState('');
  const [unions, setUnions] = useState({});
  const [ParentName, setParentName] = useState('');
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
      selectedChildrenId,
      ParentName,
      birthDate,
      deathDate,
      birthPlace,
    });

    let new_union_number = `u${Object.keys(unions).length + 1}`;
    let new_person_number = `id${Object.keys(persons).length + 1}`;
    console.log(persons[selectedChildrenId]);   
    console.log(new_person_number,new_union_number); 

    let Children_update = persons[selectedChildrenId];
    delete Children_update._id;
    delete Children_update.__v;

    let Parent = {
        id: new_person_number,
        name: ParentName,
        birthyear: parseInt(birthDate.slice(0,4)),
        deathyear: deathDate ? parseInt(deathDate.slice(0,4)) : null,
        own_unions: [],
        Children_union: new_union_number,
    }

    //chech if Children has any unions
    if (Children_update.parent_union == null){
        console.log("no union exists");
        Children_update.parent_union = new_union_number;
        let new_union = {
            id: new_union_number,
            partner: [new_person_number],
            children: [selectedChildrenId],
        }
        console.log(new_union);
        let response_union = await axios.post('http://localhost:5000/tree/unions',new_union);
        let response_Children = await axios.put(`http://localhost:5000/tree/persons/${selectedChildrenId}`,Children_update);

        Parent.own_unions.push(new_union_number);
        console.log(Parent);
        let response_parent = await axios.post('http://localhost:5000/tree/persons',Parent);

    }
    else{
        console.log("union already exists: ",Children_update.parent_union)
        let union_id = Children_update.parent_union;
        let union_update = unions[union_id];
        console.log(union_update);

        delete union_update._id;
        delete union_update.__v;
        union_update.partner.push(new_person_number);

        let response_union = await axios.put(`http://localhost:5000/tree/unions/${union_id}`,union_update);
        console.log("response union",response_union);
        
        Parent.own_unions.push(union_id);
        let response_parent = await axios.post('http://localhost:5000/tree/persons',Parent);
    }

    console.log("updated Children",Children_update);
    console.log("added child",Parent);
    toast.success('Parent added successfully');
    window.location.reload();
  }
  catch (error) {
    console.error('Failed to add child:', error);
    toast.error('Failed to add Parent');
  }
}

  return (
    <div className="form-container form">
    <form onSubmit={handleSubmit}>
      <h2>Add Parent</h2>
      <div>
        <label>Children's Name:</label>
        <select value={selectedChildrenId} onChange={(e) => setSelectedChildrenId(e.target.value)}>
          <option value="">Select a Children</option>
          {Object.entries(persons).map(([id, { name }]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Parent's Name:</label>
        <input type="text" value={ParentName} onChange={(e) => setParentName(e.target.value)} />
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

export default AddParentForm;