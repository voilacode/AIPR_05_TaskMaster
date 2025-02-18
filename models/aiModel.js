const axios = require('axios');

// Function to generate AI content using RapidAPI
async function generateAIContent(task, time) {
  const url = 'https://chat-gpt26.p.rapidapi.com/';

  let prompt =
    `Consider that user gave these tasks ` +
    task +
    ` and overall time to complete is ` +
    time +
    `.` +
    `You are an AI assistant that helps break down tasks into subtasks with priorities and times. For each task which can be one or more, you will generate HTML content using Tailwind CSS that displays the task details, including its name, priority, total time, and subtasks. The structure should look like this:

        <div class="p-4 border rounded-lg bg-gray-100">
          <h2 class="text-xl font-semibold">Task: <span class="text-blue-600">Cook Chicken Curry</span></h2>
          <p class="text-sm text-gray-500">Priority: <span class="text-red-600">High</span></p>
          <p class="text-sm text-gray-500">Total Time: <span class="text-green-600">60 minutes</span></p>
          <h3 class="mt-2 text-lg font-semibold">Subtasks:</h3>
          <ul class="list-disc pl-5">
            <li><span class="font-bold">Subtask 1:</span> Prepare ingredients for curry (Priority: High, Time: 10 minutes)</li>
            <li><span class="font-bold">Subtask 2:</span> Marinate chicken (Priority: Medium, Time: 15 minutes)</li>
            <li><span class="font-bold">Subtask 3:</span> Cook curry on stove (Priority: High, Time: 35 minutes)</li>
          </ul>
        </div>

        The HTML should use Tailwind CSS for styling. You will follow this  format for the response. 
        Make sure to return only HTML code that can be displayed on a webpage.`;
  const options = {
    method: 'POST',
    headers: {
      // Replace with your actual RapidAPI key
      'x-rapidapi-key': 'ea86ec0756msh17e532df1e1c9c9p170c20jsnebad0933d91c',
      'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    },
  };

  try {
    // Send request to AI API
    const response = await axios(url, options);
    console.log('ai response', response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error Message:', error.response.data.message); // Specific message

    return (
      "<div class='bg-gray-100 p-3 rounded shadow'>" +
      error.response.data.message +
      '<div>'
    );
  }
}

module.exports = { generateAIContent };
