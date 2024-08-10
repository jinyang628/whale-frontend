import { LinearClient } from '@linear/sdk';
import axios from 'axios';

export default async function callLinear() {

  const apiKey = process.env.LINEAR_API_KEY;
  const client1 = new LinearClient({
    apiKey: "lin_api_gKU96ulZF06LsL2dh546ws9N0snPqiM1rszX5frx",
  });
  const me = await client1.viewer;
  const myIssues = await me.assignedIssues();

  if (myIssues.nodes.length) {
    myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}`));
  } else {
    console.log(`${me.displayName} has no issues`);
  }
}
