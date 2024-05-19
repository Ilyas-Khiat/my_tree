import React from 'react';

const LayoutOrientationPage = () => {
  const htmlContent = `
    <div>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/d3-dag.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/familytree.js"></script>
        <script>
            // insert svg object to hold the family tree
            const svg = d3.select("body").append("svg")
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
        </script>
    </div>
   `;

  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/css/main.css" />
      </head>
      <body dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default LayoutOrientationPage;