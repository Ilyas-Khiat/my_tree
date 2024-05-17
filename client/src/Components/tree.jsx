import React from 'react';

const LayoutOrientationPage = () => {
  const htmlContent = `
    <div>
      <script src="https://d3js.org/d3.v7.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/d3-dag.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/data/data_simple.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/familytree.js"></script>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const svg = d3.select("body").append("svg")
              .attr("width", document.body.offsetWidth)
              .attr("height", document.documentElement.clientHeight);

          let FT = new FamilyTree(data, svg)
              .orientation("vertical");

          FT.draw();
        });
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