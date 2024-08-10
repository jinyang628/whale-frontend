import callLinear from '@/actions/linear';
import { useEffect, useState } from 'react';

function LinearIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchIssues() {

      
      try {
        const response = await callLinear();
        console.log(response);
      } catch (error) {
        console.error('Error fetching data from Linear:', error);
      }
      
    }

    fetchIssues();
  }, []);

  return (
    <div>
      <h1>Linear Issues</h1>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default LinearIssues;
