import React, { useEffect } from 'react';
import axios from 'axios';


const FamilyTreeComponent = () => {
  useEffect(() => {
    // Dynamically load external JS and CSS
    const loadExternalResources = () => {
      const cssLink = document.createElement('link');
      cssLink.href = 'https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/css/main.css';
      cssLink.rel = 'stylesheet';
      document.head.appendChild(cssLink);

      const d3Script = document.createElement('script');
      d3Script.src = 'https://d3js.org/d3.v7.min.js';
      d3Script.onload = () => {
        const dagScript = document.createElement('script');
        dagScript.src = 'https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/d3-dag.js';
        document.body.appendChild(dagScript);

        const dataScript = document.createElement('script');
        dataScript.src = 'https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/data/data_simple.js';
        document.body.appendChild(dataScript);

        const familyTreeScript = document.createElement('script');
        familyTreeScript.src = 'https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/familytree.js';
        familyTreeScript.onload = () => {
          // Family tree script is loaded, initialize the family tree
          initFamilyTree();
        };
        document.body.appendChild(familyTreeScript);
      };
      document.body.appendChild(d3Script);
    };

    // Initialize the family tree after all scripts are loaded
    const initFamilyTree = () => {
      const svg = d3.select("#family-tree-svg")
        .attr("width", document.body.offsetWidth)
        .attr("height", document.documentElement.clientHeight);

        axios.get('http://localhost:5000/tree')
        .then(response => {
            data = response.data;
            data.start = "id4";
            // make family tree object
            let FT = new FamilyTree(data, svg);
            // draw family tree
            FT.draw();
        })
        .catch(error => console.error("Axios fetch error:", error));
    };

    loadExternalResources();
  }, []);

  return (
    <div>
      <svg id="family-tree-svg"></svg>
    </div>
  );
};

export default FamilyTreeComponent;