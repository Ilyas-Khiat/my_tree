import React, { useEffect, useState } from 'react';

const FamilyTreePage = () => {
    const [htmlContent, setHtmlContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the HTML document from the public directory
        fetch('/layout_orientation.html') // Assuming it's directly in the public directory
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setHtmlContent(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching HTML document:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading content</div>;

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default FamilyTreePage;