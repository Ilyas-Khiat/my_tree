import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./css/formstyle.css";

const ModifyPersonForm = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    bornDate: '',
    deathDate: '',
    bornPlace: '',
  });

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tree');
        setPersons(response.data.persons);
      } catch (error) {
        console.error('Failed to fetch tree:', error);
        toast.error('Failed to fetch tree data.');
      }
    };

    fetchTree();
  }, []);

  const handleSelectChange = (e) => {
    const personId = e.target.value;
    setSelectedPersonId(personId);
    const selectedPerson = persons.find(person => person.id === personId);
    if (selectedPerson) {
      setFormData({
        name: selectedPerson.name || '',
        birthyear: selectedPerson.bornDate || '',
        deathyear: selectedPerson.deathDate || '',
        birthPlace: selectedPerson.bornPlace || '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tree/persons/${selectedPersonId}`, formData);
      toast.success('Person information updated successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Failed to update person:', error);
      toast.error('Failed to update person information.');
    }
  };

  return (
    <div className='form-container'>
        <h2>Modify Person</h2>
      <select value={selectedPersonId} onChange={(e) => setSelectedPersonId(e.target.value)}>
          <option value="">Select a person</option>
          {Object.entries(persons).map(([id, { name }]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

      {selectedPersonId && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="date"
            name="bornDate"
            value={formData.bornDate}
            onChange={handleInputChange}
            placeholder="Born Date"
          />
          <input
            type="date"
            name="deathDate"
            value={formData.deathDate}
            onChange={handleInputChange}
            placeholder="Death Date"
          />
          <input
            type="text"
            name="bornPlace"
            value={formData.bornPlace}
            onChange={handleInputChange}
            placeholder="Born Place"
          />
          <button type="submit">Update Person</button>
        </form>
      )}
    </div>
  );
};

export default ModifyPersonForm;