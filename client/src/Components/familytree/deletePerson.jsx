import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/formstyle.css";
import { toast } from 'react-toastify';

const PersonsList = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [unions, setUnions] = useState({});

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tree');
        setPersons(response.data.persons);
        setUnions(response.data.unions);
      } catch (error) {
        console.error('Failed to fetch persons:', error);
      }
    };

    fetchPersons();
  }, []);

  const handleDeletePerson = async () => {
    try {
      if(persons[selectedPersonId].parent_union != null && persons[selectedPersonId].own_unions.length > 0){
        toast.error('Person cannot be deleted as it is a part of a complex union, other node should be deleted first');
        return;
      }
      else if (persons[selectedPersonId].parent_union != null) {

        //check if parent union exists
        console.log("parent union exists");
        let union_id = persons[selectedPersonId].parent_union;
        console.log(union_id);
        let union_update = unions[union_id];

        //remove child from union
        union_update.children = union_update.children.filter(child => child !== selectedPersonId);

        //check if union has any children left
        if (union_update.children.length == 0){

          //remove union from parent
          for (const u of union_update.partner){
            console.log("partner of union exists")
            console.log(u);
            let partner_update = persons[u];
            partner_update.own_unions = partner_update.own_unions.filter(union => union !== union_id);
            await axios.put(`http://localhost:5000/tree/persons/${u}`, partner_update);
            console.log(`Deleted union with id: ${union_id} from person ${u}`)
          }

          //delete union
          console.log("no children left in union");
          await axios.delete(`http://localhost:5000/tree/unions/${union_id}`);
          console.log(`Deleted union with id: ${union_id}`);
        }
        else {
          //update union
          await axios.put(`http://localhost:5000/tree/unions/${persons[selectedPersonId].parent_union}`, union_update);
          console.log(`Deleted person with id: ${selectedPersonId} from union ${union_id}`);
        }
      }
      else{
        for (const u of persons[selectedPersonId].own_unions){
          console.log("own union exists")
          console.log(u);
          let union_update = unions[u];
          union_update.partner = union_update.partner.filter(partner => partner !== selectedPersonId);
          await axios.put(`http://localhost:5000/tree/unions/${u}`, union_update);
          console.log(`Deleted person with id: ${selectedPersonId} from union ${u}`);
        } 
      }
      await axios.delete(`http://localhost:5000/tree/persons/${selectedPersonId}`);
      console.log(`Deleted person with id: ${selectedPersonId}`);
      toast.success('Person deleted');
      window.location.reload();
      
    } catch (error) {
      console.error('Failed to delete person:', error);
      toast.error('Failed to delete person');
    }
  }

  return (
    <div className="form-container">
      <h2>Persons List</h2>
      <div>
        <label>Person's Name:</label>
        <select value={selectedPersonId} onChange={(e) => setSelectedPersonId(e.target.value)}>
          <option value="">Select a person</option>
          {Object.entries(persons).map(([id, { name }]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
      <button type="submit" onClick={handleDeletePerson}>Delete</button>
    </div>
  );
};

export default PersonsList;