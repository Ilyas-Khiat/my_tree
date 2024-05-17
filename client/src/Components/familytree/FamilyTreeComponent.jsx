import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
//import { FamilyTree } from './familytree';

const FamilyTreeComponent = () => {
    const svgRef = useRef();
    const [data, setData] = useState(null);
    const [isD3DagLoaded, setD3DagLoaded] = useState(false);

    useEffect(() => {
        // Dynamically load the d3-dag script
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/d3-dag.js";
        script.onload = () => setD3DagLoaded(true);
        document.body.appendChild(script);

        script.src = "https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/js/familytree.js";
        script.async = true;
        script.onload = () => setScriptLoaded(true); // Set flag when script is loaded

        // Append script to the body
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (data && isD3DagLoaded) { // Make sure data and d3-dag are loaded
            const svg = d3.select(svgRef.current)
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

            const FT = new FamilyTree(data, svg).orientation("vertical");
            FT.draw();
        }
    }, [data, isD3DagLoaded]); // Depend on data and the d3-dag load state

    // Fetch data
    useEffect(() => {
        fetch('http://localhost:5000/tree')
            .then(response => response.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data || !isD3DagLoaded) return <div>Loading...</div>;

    return <div><svg ref={svgRef}></svg></div>;
};

export default FamilyTreeComponent;
