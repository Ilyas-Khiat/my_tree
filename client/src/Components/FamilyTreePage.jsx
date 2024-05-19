import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TreeGraph from './FamilyTreeComponent';

function FamilyTree() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tree');
        setTreeData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="treepage">
      {treeData ? <TreeGraph data={treeData} /> : <p>Loading...</p>}
    </div>
  );
}

export default FamilyTree;
