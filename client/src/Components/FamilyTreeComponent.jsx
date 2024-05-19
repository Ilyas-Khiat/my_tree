import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TreeGraph = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const { persons, unions, links } = data;

      // Create nodes array
      const nodes = Object.values(persons).map(person => ({
        ...person,
        isPerson: true,
      })).concat(Object.values(unions).map(union => ({
        ...union,
        isUnion: true,
      })));

      // Create links array
      const edges = links.map(link => ({
        source: link[0],
        target: link[1],
      }));

      // Set dimensions and margins of the diagram
      const margin = { top: 20, right: 90, bottom: 30, left: 90 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      // Declares a tree layout and assigns the size
      const treemap = d3.tree().size([height, width]);

      const svg = d3.select(d3Container.current)
        .html("")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

      // Map node IDs to node objects
      const nodesMap = {};
      nodes.forEach(node => nodesMap[node.id] = node);

      // Build the tree structure
      const root = {
        children: []
      };

      nodes.forEach(node => {
        if (node.parent_union) {
          const parentUnion = nodesMap[node.parent_union];
          if (parentUnion) {
            parentUnion.children = parentUnion.children || [];
            parentUnion.children.push(node);
          }
        }
      });

    Object.values(unions).forEach(union => {
        if (union.children.length > 0) {
            const parentPerson = nodesMap[union.partner[0]];
            if (parentPerson) {
                parentPerson.children = parentPerson.children || [];
                parentPerson.children.push(nodesMap[union.id]);
            } else {
                root.children.push(nodesMap[union.id]);
            }
        }
    });

      const treeData = treemap(d3.hierarchy(root));

      // Nodes and links positions
      const nodesSel = svg.selectAll('.node')
        .data(treeData.descendants())
        .enter()
        .append('g')
        .attr('class', d => d.data.isPerson ? 'node person' : 'node union')
        .attr("transform", d => `translate(${d.y},${d.x})`);

      nodesSel.append('circle')
        .attr('r', 5);

      nodesSel.append('text')
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -13 : 13)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name || d.data.id);

      // Draw the links
      const linksSel = svg.selectAll('.link')
        .data(treeData.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));
    }
  }, [data]);

  return <div ref={d3Container} />;
}

export default TreeGraph;
