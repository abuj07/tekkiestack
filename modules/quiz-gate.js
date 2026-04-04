/**
 * TekkieStack — Quiz Gate Module
 * Provides a lightweight quiz that must be passed before a lesson can be marked complete.
 * Students must score 2/3 or better to proceed.
 *
 * Author: Aperintel Ltd
 */

const TSAQuizGate = (() => {

  // ── Quiz question banks ────────────────────────────────────────────────────
  const QUIZ_BANKS = {

    // ── Junior Phase 1 — Computational Thinking ───────────────────────────
    'j1-l1': [
      { q: 'What is an algorithm?', options: ['A type of computer','A step-by-step set of instructions to solve a problem','A programming language','A website design tool'], answer: 1 },
      { q: 'Which of these is the best example of an algorithm in everyday life?', options: ['Watching TV','A recipe for baking a cake','Listening to music','Drawing a picture'], answer: 1 },
      { q: 'Why must an algorithm have clear, unambiguous steps?', options: ['To make it longer','So computers and people can follow it reliably','To make it look impressive','Because algorithms must be in alphabetical order'], answer: 1 },
    ],
    'j1-l2': [
      { q: 'Why does the order of steps matter in a sequence?', options: ['It does not matter at all','Different orders produce different results','Only the first step matters','Sequences must always have exactly 5 steps'], answer: 1 },
      { q: 'If you put on your shoes BEFORE your socks, what happens?', options: ['Nothing changes','The algorithm is faster','The result is wrong — socks go on first','Both orders work fine'], answer: 2 },
      { q: 'What is sequencing in computing?', options: ['Running steps at the same time','Randomly picking instructions','Executing instructions in a specific order','Skipping steps you do not need'], answer: 2 },
    ],
    'j1-l3': [
      { q: 'What is a loop in programming?', options: ['A mistake in your code','A way to repeat a set of instructions','A type of variable','A special kind of button'], answer: 1 },
      { q: 'Which loop would you use to print "Hello" exactly 10 times?', options: ['A loop that runs while a condition is true','A loop that runs for a fixed number of times','A loop that only runs once','You cannot repeat code — you must type it 10 times'], answer: 1 },
      { q: 'What is an infinite loop?', options: ['A loop that runs for exactly 100 times','A loop with no condition that never stops','A loop that runs backwards','A loop inside another loop'], answer: 1 },
    ],
    'j1-l4': [
      { q: 'What does an IF statement do in programming?', options: ['Repeats code multiple times','Runs code only when a condition is true','Stores a value for later','Ends the program'], answer: 1 },
      { q: 'What is the ELSE part of an IF/ELSE statement?', options: ['Code that runs when the IF condition is true','Code that always runs before the IF','Code that runs when the IF condition is false','A way to create a loop'], answer: 2 },
      { q: 'Which of these is a valid condition for an IF statement?', options: ['Print "hello"','If the player score is greater than 100','Repeat 5 times','Save the file'], answer: 1 },
    ],

    // ── Junior Phase 3 — JavaScript ───────────────────────────────────────
    'j3-l1': [
      { q: 'What is a variable in JavaScript?', options: ['A type of loop','A named container that stores a value','A built-in function','A CSS style rule'], answer: 1 },
      { q: 'Which keyword should you use to declare a variable that will NOT change?', options: ['let','var','const','set'], answer: 2 },
      { q: 'What will this code output? let x = 5; console.log(x + 3);', options: ['x + 3','53','8','Error'], answer: 2 },
    ],
    'j3-l2': [
      { q: 'What is a function in JavaScript?', options: ['A type of variable','A reusable block of code you can call by name','A way to style HTML','A loop that runs forever'], answer: 1 },
      { q: 'What keyword do you use to send a value back from a function?', options: ['send','output','return','give'], answer: 2 },
      { q: 'What will greet("Sam") return if greet is: function greet(name) { return "Hi " + name; }', options: ['Hi name','greet("Sam")','Hi Sam','undefined'], answer: 2 },
    ],
    'j3-l3': [
      { q: 'What does the DOM stand for?', options: ['Document Object Model','Design Output Method','Display Order Manager','Dynamic Object Markup'], answer: 0 },
      { q: 'Which JavaScript method finds a single HTML element by its id?', options: ['document.find()','document.querySelector()','document.getElementById()','document.getElement()'], answer: 2 },
      { q: 'How do you change the text inside an element with id="title" using JavaScript?', options: ['document.getElementById("title").style = "New text"','document.getElementById("title").textContent = "New text"','document.getElementById("title") = "New text"','title.setText("New text")'], answer: 1 },
    ],
    'j3-l4': [
      { q: 'What is an event in JavaScript?', options: ['A variable that changes','Something that happens in the browser that JavaScript can respond to','A CSS animation','A type of loop'], answer: 1 },
      { q: 'Which method adds an event listener to an element?', options: ['element.onEvent()','element.listen()','element.addEventListener()','element.addListener()'], answer: 2 },
      { q: 'What event fires when a user clicks an element?', options: ['"press"','"tap"','"click"','"select"'], answer: 2 },
    ],
    'j3-l5': [
      { q: 'When building a quiz game, where is the best place to store all the questions?', options: ['Directly in the HTML','In a JavaScript array of objects','In the CSS file','In a separate browser window'], answer: 1 },
      { q: 'What does Math.floor(Math.random() * 4) produce?', options: ['A decimal between 0 and 4','A random whole number between 0 and 3','Always the number 2','A random number between 1 and 4'], answer: 1 },
      { q: 'How do you check if a user\'s answer matches the correct answer stored in a variable called correct?', options: ['answer = correct','answer == correct or answer === correct','answer.equals(correct)','check(answer, correct)'], answer: 1 },
    ],

    // ── Junior Phase 4 — AI ───────────────────────────────────────────────
    'j4-l1': [
      { q: 'What is Artificial Intelligence (AI)?', options: ['A robot that looks like a human','Computer systems that perform tasks that normally require human intelligence','A new programming language','A type of database'], answer: 1 },
      { q: 'What is the key difference between a rule-based program and machine learning?', options: ['Machine learning is faster','Rule-based programs are written in Python','Machine learning learns patterns from data; rule-based programs follow fixed rules','There is no difference'], answer: 2 },
      { q: 'Which of these is an example of AI you might use every day?', options: ['A light switch','A basic calculator','Netflix recommending videos based on your watching history','A paper book'], answer: 2 },
    ],
    'j4-l2': [
      { q: 'What is a "prompt" in the context of AI models?', options: ['A pop-up alert in JavaScript','An instruction or question you give to an AI model','A type of CSS animation','A shortcut key on the keyboard'], answer: 1 },
      { q: 'Which prompt is likely to get a better response from an AI?', options: ['"Write something"','"Write a short funny poem about a cat who hates Mondays, for a 10-year-old"','"Poem"','"Write stuff about cats"'], answer: 1 },
      { q: 'Which technique involves giving the AI an example of the output you want?', options: ['Zero-shot prompting','Chain-of-thought prompting','Few-shot prompting','Role prompting'], answer: 2 },
    ],
    'j4-l3': [
      { q: 'In which industry is AI being used to help detect diseases from medical scans?', options: ['Sports','Healthcare','Fashion','Gaming'], answer: 1 },
      { q: 'What is one concern about AI-generated images and videos?', options: ['They are too expensive to create','They can be used to create convincing fake content (deepfakes)','They always look obviously fake','They use too much paper'], answer: 1 },
      { q: 'What is "bias" in AI training data?', options: ['When an AI is very accurate','When the training data over-represents some groups and under-represents others, causing unfair results','When an AI responds too slowly','When the model is too large to run on a phone'], answer: 1 },
    ],
    'j4-l4': [
      { q: 'Why should you never put an API key directly in your frontend JavaScript code?', options: ['It makes the code run slower','Anyone who views the page source can steal and misuse your API key','API keys only work in Python','JavaScript cannot read strings'], answer: 1 },
      { q: 'What is a "loading state" in a web app?', options: ['When the page is fully loaded','Visual feedback shown to the user while the app is waiting for a response','A CSS transition effect','A type of error message'], answer: 1 },
      { q: 'What does an error handler in a fetch() call protect against?', options: ['Slow internet only','Situations where the API is unavailable or returns an error, preventing the app from crashing','CSS layout bugs','JavaScript syntax errors'], answer: 1 },
    ],

    // ── Senior Phase 1 — Accelerated Foundations ──────────────────────────
    's1-l1': [
      { q: 'Why is semantic HTML important?', options: ['It makes pages load faster automatically','It helps search engines and screen readers understand your content structure','It allows you to skip writing CSS','It is required by all browsers'], answer: 1 },
      { q: 'Which semantic element should wrap your site\'s primary navigation links?', options: ['<div class="nav">','<menu>','<nav>','<header>'], answer: 2 },
      { q: 'What is the correct semantic element for a self-contained piece of content like a blog post?', options: ['<section>','<article>','<div>','<aside>'], answer: 1 },
    ],
    's1-l2': [
      { q: 'When should you use CSS Grid instead of Flexbox?', options: ['When aligning items in a single row or column','When building a two-dimensional layout (rows AND columns)','Grid and Flexbox do exactly the same thing','When you need to animate elements'], answer: 1 },
      { q: 'What does grid-template-columns: repeat(3, 1fr) create?', options: ['3 rows of equal height','3 columns of equal width','A 3x3 grid','3 items with fixed pixel widths'], answer: 1 },
      { q: 'Which Flexbox property aligns items along the cross axis?', options: ['justify-content','flex-direction','align-items','flex-wrap'], answer: 2 },
    ],
    's1-l3': [
      { q: 'What is the main difference between let and const in JavaScript?', options: ['let is faster than const','const cannot be reassigned after declaration; let can','const only works for numbers','let and const are identical'], answer: 1 },
      { q: 'What does the array method .filter() return?', options: ['The first matching element','A new array with all elements that pass the test','The index of matching elements','It modifies the original array in place'], answer: 1 },
      { q: 'What does optional chaining (?.) do?', options: ['It makes a property required','It short-circuits and returns undefined instead of throwing if a property does not exist','It clones an object','It converts a value to a string'], answer: 1 },
    ],
    's1-l4': [
      { q: 'What is event delegation?', options: ['Assigning events to every element individually','Adding one event listener to a parent element to handle events from its children','A CSS event system','Delegating animations to the GPU'], answer: 1 },
      { q: 'What does element.classList.toggle("active") do?', options: ['Always adds the class active','Always removes the class active','Adds the class if absent, removes it if present','Renames the class'], answer: 2 },
      { q: 'What is a data-* attribute used for?', options: ['Storing CSS variables','Embedding custom data in HTML elements accessible via JavaScript','Defining a CSS animation','Setting ARIA roles'], answer: 1 },
    ],
    's1-l5': [
      { q: 'What does "mobile-first" responsive design mean?', options: ['You only design for mobile, not desktop','You write CSS for mobile screens first, then add styles for larger screens using min-width media queries','Mobile users get a different website','You use a mobile app instead of a website'], answer: 1 },
      { q: 'What does the CSS function clamp(min, preferred, max) do?', options: ['Clamps the page to a fixed width','Returns a value that scales fluidly between a minimum and maximum','Limits font loading to one web font','Prevents CSS variables from changing'], answer: 1 },
      { q: 'Which viewport unit equals 1% of the browser window\'s height?', options: ['vw','vh','vmin','rem'], answer: 1 },
    ],
    's1-l6': [
      { q: 'What is the main purpose of using CSS custom properties (variables)?', options: ['To make CSS files smaller','To store reusable values that can be updated in one place and applied across the stylesheet','To replace HTML attributes','To speed up animations'], answer: 1 },
      { q: 'In a mobile-first build, which media query adds styles for tablets?', options: ['@media (max-width: 768px)','@media (min-width: 768px)','@media screen','@media tablet'], answer: 1 },
      { q: 'What is the Intersection Observer API used for?', options: ['Observing CSS grid intersections','Detecting when elements scroll into or out of the viewport','Monitoring network requests','Checking if two divs overlap visually'], answer: 1 },
    ],

    // ── Senior Phase 2 — Software Engineering ─────────────────────────────
    's2-l1': [
      { q: 'What problem does Git solve?', options: ['It makes JavaScript run faster','It tracks changes to code over time and enables collaboration without overwriting each other\'s work','It hosts websites automatically','It minifies CSS'], answer: 1 },
      { q: 'What does git commit do?', options: ['Uploads your code to GitHub','Saves a snapshot of your staged changes to the local repository history','Merges two branches','Deletes old files'], answer: 1 },
      { q: 'What is a feature branch?', options: ['A branch that is always in production','A separate branch where you develop a new feature without affecting the main codebase','A branch that runs automated tests','A backup of the main branch'], answer: 1 },
    ],
    's2-l2': [
      { q: 'What does an API (Application Programming Interface) do?', options: ['Designs the user interface','Allows two applications to communicate by defining a set of request/response rules','Stores data in a browser','Compiles JavaScript code'], answer: 1 },
      { q: 'What HTTP status code means "Not Found"?', options: ['200','301','404','500'], answer: 2 },
      { q: 'When using fetch() with async/await, what does await response.json() do?', options: ['Sends JSON data to the server','Parses the response body as JSON and returns a JavaScript object','Converts a JS object to a JSON string','Checks if the response is valid JSON'], answer: 1 },
    ],
    's2-l3': [
      { q: 'Which data structure gives you O(1) lookup time by key?', options: ['Array (by index search)','Linked list','Object/Map (hash map)','Binary tree'], answer: 2 },
      { q: 'What does O(n²) time complexity mean?', options: ['The operation runs in constant time','The operation time doubles when input doubles','The operation time grows as the square of the input size','The operation time is logarithmic'], answer: 2 },
      { q: 'When would you use a Set instead of an Array?', options: ['When you need ordered items with duplicates','When you need to store only unique values and fast existence checks','When you need key-value pairs','When you need to store objects'], answer: 1 },
    ],
    's2-l4': [
      { q: 'What is the purpose of a try/catch block in JavaScript?', options: ['To speed up asynchronous code','To catch runtime errors and handle them gracefully instead of crashing the program','To define a function','To create a loop that tries multiple times'], answer: 1 },
      { q: 'What is a "logic error"?', options: ['A spelling mistake in your code','Code that crashes with an error message','Code that runs without errors but produces incorrect results','A missing semicolon'], answer: 2 },
      { q: 'What does "failing loudly" mean in defensive programming?', options: ['Throwing clear, descriptive errors when something goes wrong rather than silently continuing','Making your app produce loud sounds','Writing lots of console.log statements','Never catching errors'], answer: 0 },
    ],
    's2-l5': [
      { q: 'What is the Red-Green-Refactor cycle in TDD?', options: ['Design, build, deploy','Write a failing test first, make it pass, then improve the code','Test, debug, release','Plan, code, review'], answer: 1 },
      { q: 'In Jest, what does expect(result).toBe(5) check?', options: ['That result is approximately 5','That result strictly equals 5','That result is greater than 5','That result is a number'], answer: 1 },
      { q: 'What is a unit test?', options: ['A test of the whole application','A test that checks one small, isolated piece of functionality','A test run by a human manually','A test that checks network requests'], answer: 1 },
    ],
    's2-l6': [
      { q: 'What is a major advantage of the Open-Meteo weather API for student projects?', options: ['It provides real-time stock prices','It requires no API key and is free to use','It includes a built-in map','It automatically deploys your project'], answer: 1 },
      { q: 'When a user searches for a city name, which API call converts the name to coordinates?', options: ['The forecast API','The reverse geocoding API','The geocoding API','The timezone API'], answer: 2 },
      { q: 'Why should you save the last searched city to localStorage?', options: ['To speed up the API call','So the app feels personalised and loads the user\'s last search on next visit','localStorage is required for fetch() to work','To cache the weather data forever'], answer: 1 },
    ],
    's2-l7': [
      { q: 'What is CRUD?', options: ['A JavaScript framework','Create, Read, Update, Delete — the four basic operations on data','A CSS methodology','A Git workflow'], answer: 1 },
      { q: 'What happens to localStorage data when the browser tab is closed?', options: ['It is deleted','It persists until manually cleared or the app removes it','It is encrypted','It expires after 24 hours'], answer: 1 },
      { q: 'Which JavaScript method converts a JavaScript object to a JSON string for storage?', options: ['JSON.parse()','JSON.stringify()','JSON.encode()','JSON.serialize()'], answer: 1 },
    ],

    // ── Senior Phase 3 — Real Development ─────────────────────────────────
    's3-l1': [
      { q: 'What problem does React solve that vanilla JavaScript struggles with at scale?', options: ['CSS styling','Managing and synchronising UI state across a complex component tree efficiently','Database queries','HTTP requests'], answer: 1 },
      { q: 'What is a React component?', options: ['A CSS class','A reusable, self-contained piece of UI that returns JSX','A JavaScript variable','An HTML file'], answer: 1 },
      { q: 'What does the useState hook return?', options: ['A single state value','A state value and a function to update it','A reference to a DOM element','A promise'], answer: 1 },
    ],
    's3-l2': [
      { q: 'What is Node.js?', options: ['A frontend JavaScript framework','A JavaScript runtime that lets you run JavaScript outside the browser, on a server','A CSS preprocessor','A database management system'], answer: 1 },
      { q: 'What does package.json track?', options: ['Your CSS variables','Your project\'s dependencies, scripts, and metadata','Your Git commit history','Your HTML template'], answer: 1 },
      { q: 'What does require("fs") give you in Node.js?', options: ['Access to the file system module','A frontend framework','A fetch() polyfill','An HTTP server'], answer: 0 },
    ],
    's3-l3': [
      { q: 'What is a PRIMARY KEY in a relational database?', options: ['The most important column','A unique identifier for each row in a table','A column that links to another table','A required field'], answer: 1 },
      { q: 'What does a JOIN do in SQL?', options: ['Combines rows from two tables based on a related column','Deletes duplicate rows','Sorts the results alphabetically','Creates a new table'], answer: 0 },
      { q: 'What does SELECT * FROM users WHERE age > 18 do?', options: ['Deletes all users under 18','Returns all columns for all users older than 18','Updates users over 18','Returns only the age column for all users'], answer: 1 },
    ],
    's3-l4': [
      { q: 'What does REST stand for in API design?', options: ['Reusable Endpoint State Transfer','Representational State Transfer','Remote Execution Service Technology','Responsive Element Structure Test'], answer: 1 },
      { q: 'Which HTTP method should you use to create a new resource on a server?', options: ['GET','PUT','POST','DELETE'], answer: 2 },
      { q: 'What does Express middleware do?', options: ['It replaces Node.js','It processes requests between receiving them and sending a response','It stores data in memory','It deploys your app'], answer: 1 },
    ],
    's3-l5': [
      { q: 'Why must you never store plaintext passwords in a database?', options: ['It takes up too much space','If the database is breached, all passwords are immediately exposed','Databases cannot store strings','It violates SQL syntax rules'], answer: 1 },
      { q: 'What does bcrypt do to a password?', options: ['Encrypts it so it can be decrypted later','Hashes it using a one-way function so the original cannot be recovered','Stores it as base64','Compresses it'], answer: 1 },
      { q: 'What is a JWT (JSON Web Token)?', options: ['A type of database','A self-contained token that encodes user identity claims, signed so it cannot be tampered with','A CSS variable','An HTTP status code'], answer: 1 },
    ],
    's3-l6': [
      { q: 'Why should you never commit a .env file to Git?', options: ['It makes the repository too large','It contains sensitive secrets like API keys that would be exposed publicly','.env files are not valid text files','Git cannot process .env files'], answer: 1 },
      { q: 'What is CI/CD?', options: ['A JavaScript testing framework','Continuous Integration / Continuous Deployment — automatically building and deploying code on push','A CSS methodology','A database backup strategy'], answer: 1 },
      { q: 'Which platform is best suited for deploying a full Node.js backend for free?', options: ['GitHub Pages (static only)','Railway or Render','CodePen','Figma'], answer: 1 },
    ],
    's3-l7': [
      { q: 'In a full-stack app, what is the role of the frontend?', options: ['Storing data permanently','Running business logic on the server','Presenting the UI and sending requests to the backend','Handling database queries directly'], answer: 2 },
      { q: 'What is CORS and why does it matter?', options: ['A JavaScript error type','A browser security policy that blocks requests between different origins unless the server explicitly allows them','A CSS framework','A Git branching strategy'], answer: 1 },
      { q: 'What is the purpose of a REST API in a full-stack project?', options: ['To serve HTML pages directly','To provide a defined interface for the frontend to read and write data from the backend','To compile React components','To minify CSS'], answer: 1 },
    ],

    // ── Senior Phase 4 — AI Engineering ───────────────────────────────────
    's4-l1': [
      { q: 'What is a "token" in the context of large language models?', options: ['A unit of currency for API calls only','A piece of text (roughly a word or part of a word) that the model processes as a unit','A security credential','A CSS class name'], answer: 1 },
      { q: 'Why do LLMs "hallucinate"?', options: ['They are programmed to make things up','They predict the most statistically likely next token, which can produce plausible-sounding but incorrect information','Their training data is too small','It is a deliberate safety feature'], answer: 1 },
      { q: 'What does a higher temperature setting do to an LLM\'s output?', options: ['Makes it faster','Makes responses more deterministic and predictable','Makes responses more varied and creative (and less reliable)','Increases the context window'], answer: 2 },
    ],
    's4-l2': [
      { q: 'What is a system prompt?', options: ['A JavaScript console command','Instructions given to an AI model that set its context, persona, and constraints before any user message','The first message a user sends','A type of CSS animation'], answer: 1 },
      { q: 'What is "chain-of-thought" prompting?', options: ['Asking the AI to generate images','Instructing the AI to reason step-by-step before giving a final answer, improving accuracy on complex tasks','A way to chain multiple API calls','A JavaScript promise chain'], answer: 1 },
      { q: 'What is prompt injection?', options: ['Inserting extra code into a webpage','A technique where malicious user input overrides or manipulates the AI system\'s intended instructions','Injecting CSS into an API response','A way to speed up prompt processing'], answer: 1 },
    ],
    's4-l3': [
      { q: 'Why must you never place your AI API key directly in client-side JavaScript?', options: ['JavaScript cannot handle strings that long','Anyone who inspects your page source or network requests can steal and misuse your key','API keys only work server-side by design','It violates the Claude terms of service'], answer: 1 },
      { q: 'In the Claude API messages array, what is the role of the "system" message?', options: ['It is the user\'s first message','It sets the model\'s overall instructions and persona for the entire conversation','It is the model\'s previous response','It contains the API key'], answer: 1 },
      { q: 'What does streaming responses mean in the context of AI APIs?', options: ['Sending the request over a video stream','Receiving the model\'s output incrementally as it generates, rather than waiting for the full response','Caching responses in a stream buffer','Parallel requests to multiple models'], answer: 1 },
    ],
    's4-l4': [
      { q: 'What problem does RAG (Retrieval-Augmented Generation) solve?', options: ['It makes LLMs generate images','It allows LLMs to reference specific documents or databases that were not in their training data','It reduces API costs by caching responses','It improves the model\'s grammar'], answer: 1 },
      { q: 'What is a vector embedding?', options: ['A CSS transform','A numerical representation of text that captures its semantic meaning so similar texts have similar vectors','A type of database index','A neural network layer'], answer: 1 },
      { q: 'What does "chunking" mean in a RAG pipeline?', options: ['Deleting large files','Breaking documents into smaller, manageable pieces before generating embeddings','Compressing the vector database','Splitting API calls into smaller batches'], answer: 1 },
    ],
    's4-l5': [
      { q: 'What is RLHF (Reinforcement Learning from Human Feedback)?', options: ['A supervised learning technique for image recognition','A method of aligning AI models to be more helpful and less harmful by training on human preference ratings','A type of prompt engineering','A database optimisation technique'], answer: 1 },
      { q: 'What is a "deepfake"?', options: ['A deep database copy','AI-generated synthetic media that depicts real people doing or saying things they never did','A deep learning debugging technique','A very detailed wireframe'], answer: 1 },
      { q: 'What principle of responsible AI ensures that AI decisions can be understood and explained?', options: ['Privacy','Fairness','Transparency / Explainability','Accountability'], answer: 2 },
    ],
    's4-l6': [
      { q: 'When building an AI study assistant, why use subject-specific system prompts?', options: ['They make the API calls faster','They constrain the AI to stay on topic and respond in a way appropriate to that subject','They are required by the API specification','They reduce the token count'], answer: 1 },
      { q: 'What is the purpose of a "study notebook" feature in an AI learning app?', options: ['It replaces the AI model','It lets learners save and review their Q&A sessions for later study','It stores the API key securely','It tracks the user\'s XP'], answer: 1 },
      { q: 'What is "quiz me" mode in an AI study assistant?', options: ['A feature where the AI rates your quiz scores','A mode where the AI generates practice questions based on the content in your study notebook','A feature that connects to external quiz databases','A multiplayer quiz game'], answer: 1 },
    ],

    // ── Senior Phase 5 — Portfolio Projects ───────────────────────────────
    's5-l1': [
      { q: 'What is the most important test of whether a project idea is suitable for a solo portfolio project?', options: ['It must use the most advanced technology available','One person can build a working version in 4-6 weeks with their current skills','It must have at least 10 features','It must use a database'], answer: 1 },
      { q: 'What is the biggest risk of scoping a project that is too broad?', options: ['It will be too easy to build','You will never finish it, and an unfinished project has no portfolio value','It will use too many files','Broad projects are always less original'], answer: 1 },
      { q: 'What goes in a 100-word project summary?', options: ['Your CV and education history','What you are building, who it is for, and what problem it solves','A list of all the technologies you plan to use','A detailed technical architecture'], answer: 1 },
    ],
    's5-l2': [
      { q: 'What is a user story?', options: ['A blog post about the project','A description of a feature from the end user\'s perspective: "As a [user], I want [action] so that [benefit]"','A technical specification document','A Git commit message'], answer: 1 },
      { q: 'What are story points used for in sprint planning?', options: ['Measuring lines of code','Estimating the relative effort and complexity of tasks','Counting the number of team members','Tracking bugs'], answer: 1 },
      { q: 'What is the difference between a backlog and a sprint?', options: ['They are the same thing','The backlog is all planned work; a sprint is the subset of work committed to for the next 2 weeks','A backlog is for bugs; a sprint is for features','A sprint is longer than a backlog'], answer: 1 },
    ],
    's5-l3': [
      { q: 'What is the first step when starting a new coding project?', options: ['Write all the CSS','Set up a Git repository so all your work is tracked from the start','Deploy to production immediately','Write the README first'], answer: 1 },
      { q: 'What does a CORS error typically mean when building a full-stack app?', options: ['Your CSS has an error','Your frontend is making requests to a different origin that the server has not permitted','Your JavaScript has a syntax error','Your database is offline'], answer: 1 },
      { q: 'What is the purpose of building the "core feature end-to-end" in Sprint 1?', options: ['To make the app look polished from day one','To prove the most critical functionality works before adding secondary features','To write all unit tests first','To deploy immediately'], answer: 1 },
    ],
    's5-l4': [
      { q: 'What should every async operation in your app have before Sprint 2 ends?', options: ['A loading animation only','An error state that handles failures gracefully so the app does not crash silently','Three different fallback options','A database backup'], answer: 1 },
      { q: 'What is a code review checklist used for?', options: ['Generating documentation automatically','A systematic check of your own code for quality, security, and completeness before submitting','Tracking Git commits','Reviewing design mockups'], answer: 1 },
      { q: 'Why is making your app responsive important for a portfolio project?', options: ['Responsive design is optional for portfolio projects','Most real users browse on mobile, and employers check for responsive design as a baseline skill','It is only required if you use CSS Grid','It automatically improves performance'], answer: 1 },
    ],
    's5-l5': [
      { q: 'What should the "Architecture Decisions" section of a README explain?', options: ['How to install Node.js','Why you made specific technical choices and the trade-offs considered','A list of all your files','Your project\'s colour palette'], answer: 1 },
      { q: 'What is the purpose of a portfolio case study?', options: ['To replace your CV','To tell the story of a project: the problem, your approach, what you built, and what you learned','To list your GitHub repositories','To document every line of code'], answer: 1 },
      { q: 'What should you include in the "What I\'d do differently" section?', options: ['Nothing — it makes you look bad','Honest reflection on mistakes and what you learned, demonstrating self-awareness and growth','Only positive things','A list of bugs you never fixed'], answer: 1 },
    ],
    's5-l6': [
      { q: 'What format should your LinkedIn headline use as a student developer?', options: ['Just your school year','Something like "Year 10 | Aspiring Developer | Built X and Y" that shows activity and initiative','Your full academic transcript','A list of every programming language you know'], answer: 1 },
      { q: 'What is the most important thing to include in a GitHub profile README?', options: ['A list of every tutorial you completed','A brief introduction, your key projects with links, and what you are currently learning','Your school schedule','A photo of your desk'], answer: 1 },
      { q: 'When cold-emailing a company for work experience, what should your message include?', options: ['A demand for payment','A brief intro, a specific reason you chose them, one project that shows relevant skill, and a clear ask','A copy of your school report','A list of every technology you want to learn'], answer: 1 },
    ],

    // ── Junior Phase 2 — Code Editor ──────────────────────────────────────
    'p2-l1': [
      { q: 'What does the <!DOCTYPE html> declaration do?', options: ['Loads the CSS stylesheet','Tells the browser this document is HTML5','Creates the page title','Defines the page charset'], answer: 1 },
      { q: 'What is the correct nesting order of a basic HTML document?', options: ['body → html → head','html → body → head','html → head → body','head → html → body'], answer: 2 },
      { q: 'What is the purpose of the <head> element?', options: ['To display the page header to users','To contain metadata, links to stylesheets, and the page title — not visible content','To hold the main body content','To create the navigation bar'], answer: 1 },
    ],
    'p2-l2': [
      { q: 'What is the correct HTML tag for the most important heading on a page?', options: ['<heading>','<h6>','<h1>','<title>'], answer: 2 },
      { q: 'How many heading levels does HTML provide?', options: ['3 (h1–h3)','6 (h1–h6)','10 (h1–h10)','Unlimited'], answer: 1 },
      { q: 'What is the <p> tag used for?', options: ['Creating a popup','Defining a paragraph of text','Adding padding with CSS','Creating a page break'], answer: 1 },
    ],
    'p2-l3': [
      { q: 'How do you add CSS directly inside an HTML file?', options: ['Inside a <css> tag','Using a <style> tag in the <head>','Using a <script> tag','With a style attribute on the <html> tag'], answer: 1 },
      { q: 'What does the CSS property background-color do?', options: ['Changes the text colour','Sets the colour of the element\'s background','Adds a border','Controls font size'], answer: 1 },
      { q: 'Which CSS selector targets ALL <p> elements on a page?', options: ['#p','*p','p','[p]'], answer: 2 },
    ],
    'p2-l4': [
      { q: 'What CSS property enables Flexbox on a container?', options: ['position: flex','layout: flexbox','display: flex','float: flex'], answer: 2 },
      { q: 'What does justify-content: center do in a Flexbox container?', options: ['Centres items along the cross axis','Centres items along the main axis','Centres the container itself on the page','Adds equal spacing around each item'], answer: 1 },
      { q: 'What does flex: 1 mean on a Flexbox child?', options: ['The child has a fixed width of 1px','The child will grow to fill all available space proportionally','The child is hidden','The child overflows the container'], answer: 1 },
    ],
    'p2-l5': [
      { q: 'What should a portfolio page include to showcase your skills?', options: ['Only a photo','A bio, skills section, and links to projects you have built','Just a contact form','Only your name and email'], answer: 1 },
      { q: 'Why is it important for your portfolio page to look good on a phone?', options: ['It is not important — only employers use desktops','Over 60% of web browsing happens on mobile devices','Phones display CSS differently and will break your layout','Mobile users cannot see images'], answer: 1 },
      { q: 'What makes a portfolio project card useful to someone viewing your portfolio?', options: ['A very long description of every line of code','A title, brief description, screenshot or preview, and a link to the live project or code','Just the project name','Only a link to your GitHub profile'], answer: 1 },
    ],
  };

  // ── Show quiz modal ────────────────────────────────────────────────────────
  function showQuiz(lessonId, onPass, onFail) {
    const bank = QUIZ_BANKS[lessonId];
    if (!bank) { onPass(); return; }

    // Shuffle questions slightly by reversing every other set
    const questions = [...bank].sort(() => Math.random() - 0.5);

    // Remove existing quiz if any
    const existing = document.getElementById('tsaQuizOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'tsaQuizOverlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:500;
      display:flex;align-items:center;justify-content:center;padding:20px;
      animation:tsaFadeIn .2s ease;
    `;

    overlay.innerHTML = `
      <style>
        @keyframes tsaFadeIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
        #tsaQuizBox { background:#0F1F3D;border-radius:18px;border:1.5px solid rgba(0,201,177,.3);padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.5); }
        #tsaQuizBox h2 { font-family:'Fredoka One',cursive;color:#00C9B1;margin:0 0 6px;font-size:22px; }
        #tsaQuizBox .tsa-sub { font-size:13px;color:rgba(255,255,255,.5);margin-bottom:22px; }
        .tsa-q { margin-bottom:24px; }
        .tsa-q-text { font-size:15px;color:#fff;font-weight:600;margin-bottom:12px;line-height:1.5; }
        .tsa-opt { display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:9px;cursor:pointer;margin-bottom:8px;border:1.5px solid rgba(255,255,255,.12);transition:border-color .15s,background .15s;color:rgba(255,255,255,.85);font-size:14px; }
        .tsa-opt:hover { border-color:#00C9B1;background:rgba(0,201,177,.08); }
        .tsa-opt.correct { border-color:#00C9B1;background:rgba(0,201,177,.15);color:#00C9B1;font-weight:700; }
        .tsa-opt.wrong   { border-color:#FF6B6B;background:rgba(255,107,107,.12);color:#FF6B6B; }
        .tsa-opt input[type=radio] { accent-color:#00C9B1;width:16px;height:16px;flex-shrink:0; }
        #tsaSubmitBtn { background:#00C9B1;color:#0F1F3D;border:none;padding:13px 28px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;width:100%;margin-top:8px;opacity:.5;pointer-events:none;transition:opacity .2s; }
        #tsaSubmitBtn.ready { opacity:1;pointer-events:auto; }
        #tsaResult { text-align:center;padding:12px 0 4px;font-size:16px;font-weight:700; }
        #tsaRetryBtn { display:none;background:rgba(255,255,255,.1);color:#fff;border:none;padding:11px 24px;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer;margin-top:10px; }
      </style>
      <div id="tsaQuizBox">
        <h2>📝 Lesson Quiz</h2>
        <div class="tsa-sub">Answer 2 out of 3 correctly to mark this lesson complete.</div>
        ${questions.map((q, qi) => `
          <div class="tsa-q" id="tsaQ${qi}">
            <div class="tsa-q-text">Q${qi + 1}. ${q.q}</div>
            ${q.options.map((opt, oi) => `
              <label class="tsa-opt" id="tsaOpt${qi}_${oi}">
                <input type="radio" name="tsaQ${qi}" value="${oi}" onchange="window._tsaQuizCheckReady()">
                ${opt}
              </label>
            `).join('')}
          </div>
        `).join('')}
        <button id="tsaSubmitBtn" onclick="window._tsaQuizSubmit()">Submit Answers</button>
        <div id="tsaResult"></div>
        <button id="tsaRetryBtn" onclick="window._tsaQuizRetry('${lessonId}', window._tsaOnPass, window._tsaOnFail)">Try Again</button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Store callbacks
    window._tsaOnPass  = onPass;
    window._tsaOnFail  = onFail;
    window._tsaQBanks  = questions;

    window._tsaQuizCheckReady = () => {
      const allAnswered = questions.every((_, qi) =>
        document.querySelector(`input[name="tsaQ${qi}"]:checked`)
      );
      const btn = document.getElementById('tsaSubmitBtn');
      if (btn) btn.classList.toggle('ready', allAnswered);
    };

    window._tsaQuizSubmit = () => {
      let correct = 0;
      questions.forEach((q, qi) => {
        const selected = document.querySelector(`input[name="tsaQ${qi}"]:checked`);
        const chosenIdx = selected ? parseInt(selected.value) : -1;
        // Mark correct/wrong options
        q.options.forEach((_, oi) => {
          const optEl = document.getElementById(`tsaOpt${qi}_${oi}`);
          if (!optEl) return;
          if (oi === q.answer) optEl.classList.add('correct');
          else if (oi === chosenIdx) optEl.classList.add('wrong');
          const radio = optEl.querySelector('input');
          if (radio) radio.disabled = true;
        });
        if (chosenIdx === q.answer) correct++;
      });

      const passed = correct >= 2;
      const resultEl = document.getElementById('tsaResult');
      const submitBtn = document.getElementById('tsaSubmitBtn');
      const retryBtn  = document.getElementById('tsaRetryBtn');

      if (submitBtn) submitBtn.style.display = 'none';

      if (resultEl) {
        resultEl.style.color = passed ? '#00C9B1' : '#FF6B6B';
        resultEl.textContent = passed
          ? `${correct}/3 correct — passed! ✅`
          : `${correct}/3 correct — try again ❌`;
      }

      // Store score
      try { sessionStorage.setItem('tsaQuizScore_' + lessonId, correct); } catch(e) {}

      // XP events + badge awards
      if (window.TSA && window.TSA.services && window.TSA.services.xp) {
        if (passed) {
          window.TSA.services.xp.addXP('QUIZ_PASS').catch(() => {});
          if (correct === 3) {
            window.TSA.services.xp.addXP('QUIZ_PERFECT').catch(() => {});
            window.TSA.services.xp.awardBadge('quiz_ace').catch(() => {});
          }
        }
      }

      if (passed) {
        setTimeout(() => {
          const ov = document.getElementById('tsaQuizOverlay');
          if (ov) ov.remove();
          if (typeof onPass === 'function') onPass();
        }, 1500);
      } else {
        if (retryBtn) retryBtn.style.display = 'block';
        if (typeof onFail === 'function') onFail();
      }
    };

    window._tsaQuizRetry = (lid, pass, fail) => {
      const ov = document.getElementById('tsaQuizOverlay');
      if (ov) ov.remove();
      showQuiz(lid, pass, fail);
    };
  }

  function hasQuizFor(lessonId) {
    return Object.prototype.hasOwnProperty.call(QUIZ_BANKS, lessonId);
  }

  function getScore(lessonId) {
    try { return parseInt(sessionStorage.getItem('tsaQuizScore_' + lessonId) || '-1'); }
    catch(e) { return -1; }
  }

  return { showQuiz, hasQuizFor, getScore, QUIZ_BANKS };
})();

window.TSAQuizGate = TSAQuizGate;
