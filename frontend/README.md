## Inspiration

We got the idea from our experiences with online learning this past year. With the variety of services that some instructors are using for office hours, we want to provide the teacher and student an opportunity for one-on-one instruction that could help with the confusion of office hour zoom calls that have too many people. We also want it to help teachers who miss the classroom and the feedback they usually receive by creating analytics on their class material, TA performance, and student knowledge that they can view in an easy and readable format.

## What it does

Our application will allow instructors to create a space that contains waiting rooms that TA's will have control over. These waiting rooms will allow students to cue up for specific questions on things like homework, exam prep, and generic course questions. The students will get to fill out a questionnaire and this will place them the waiting room. The waiting room will offer the student with a waiting time based on previous people's times and the questions that the people in front of you are asking about. After getting to the front, the instructor will send you the link to the meeting and you will be admitted. When your session is over it will allow you to fill out a survey on your session with will be turned into analytics for the instructor. These analytics will be available to the instructor on a separate page and give information on things like how many people want to ask about a particular topic, how the TA’s were rated on average for their performance, and how long on average an interaction for a specific topic took.

## How we built it

In order to begin our project, we divided our team into two initial sections, frontend and backend. Each team, with two members each, would be responsible for making the functionality for either the background processing or the frontend website development.

### Frontend

When making the frontend, we decided to format the webpage using Reactjs, a format/language where jsx files work as puzzle pieces that you can place around your website for more compact coding. The jsx files convert into html views when you run them and post them to the website but we still needed to learn the syntax and logic behind the different functionalities. Our major goals were the main page where you could create a space with specific questions for your office hours session, a student queue view where you would select the question that you specifically had from a drop-down and enter your name to appear in a queue list, and an admin page that shows data for the session and the information gathered. After getting the look and some of the basic navigation functionality down, it was time to wire in the backend so you could interact with the website as described

### Backend

When making the backend of the app, we decided to go with MongoDB for the databases that were going to store our data, FastAPI to make our website API, and Python for the actual code. We had to make all of the data collection and tracking on the TA sessions with the data for each TA and student stored correctly so we could get it to frontend at some point. We also worked on getting the connection

### Connecting Them

When we got both done to start off, we started to combine the features so the website had functionality to it. We started by making the homepage work by allowing the user to make a room that would generate a unique link for the queue for both a student and TA. The next step were the student and TA views which were done to allow for the website remembering TAs via cookies that we assigned so we could track the session data for that TA and not have duplicate rooms if the TA left. After the rooms were set up, we worked to get the TA view to allow for choosing a student to admit to their room. It was coded to allow the TA to select a student and then the student would receive the meeting link designated by the TA when creating the room.

## Challenges we ran into

### What Languages and Services

We ran into some issues when trying to decide on a way to implement this project. It requires a lot of backend and frontend work that communicates in order to get the information presented in the best way for the student in their queue and the instructor in their analytics view. This requires more than one language and a lot of APIs that assist in the functionality of the website. We ended up deciding that it would be a good idea to us React for our web development since it would vastly increase the organization and speed of our web development.

### Docker

Our Docker build sometimes wouldn’t configure properly so in the first hour or two after we were done planning we had to troubleshoot how Docker configurations settings could get the builds of our code to fail, seemingly at random. After a few hours of setting adjustments, we got our posts to go through most of the time

### Reactjs

Figuring out Reactjs was its own challenge. It was a new thing to all of us and it is a combination of a few languages. It is also a lot of complicated jsx files which are all relatively confusing to understand and debug. Not knowing Reactjs very well made debugging our wide array of files difficult and made connecting our frontend and backend difficult. We ended up getting them to work after hours of debugging and reading the documentation.

### MongoDB and FastAPI

One of the problems in our backend was learning MongoDB. It was very important to our project since it was what we were going to collect and organize our data with. Along with MongoDB, FastAPI was another thing we had trouble with since we needed to make our own API for this project. These problems go hand in hand since we had to learn the database tools as well as figure out how our API would interface and communicate with our containers. We got it down and finished the backend early enough to get the interfacing between the frontend working.

We chose FastAPI because it has some familiarity to technologies our team knew (like Flask). It also had auto-documentation features that made communication between our backend and frontend teams easier. We ended up really enjoying FastAPI and definitely think we're gonna use it in the future!

## Accomplishments that we're proud of

We have gotten very organized with our GitHub Repository by splitting our project into non-conflicting sections and having everyone practice good version control on their own branches to avoid errors. We commit often and were sure to make it so at least one person had to approve a development edit and everyone had to approve a main edit.

The team members working on the Frontend work for hours and hours straight to understand how best to implement this new format. It had the ability to use html, css, javascript, and some hybrid lines that combine bits of each. Conquering jsx is something that we are happy to say was not only difficult, but a blast to learn and be able to freely control when making our different webpages. We got to the point where instead of taking an hour to format a tab that would be built into a page, we could make all of the elements for a page and make them look good in a few short hours.

## What we learned

We learned a lot about web development and how cumbersome the files can get. We got to see how Reactjs could make out lives easier and how designing a webpage through css benefited the clarity of our information. 

We got to learn about the uses for MongoDB and how we could use FastAPI to make our own API that could talk with the containers in mongo. These containers were essential in our data collection for the office hour meetings so getting these learned was essential to get the backend code working.

## What's next for Tutrolink

In the future, we want Tutrolink to have a lot of features that work with polishing up the look, to adding in extra functionality for convenience. One thing we wanted to implement is an alternative to Zoom and other meeting software by making a built-in video call and chat feature. Another thing we would like to add is more varied options for data collection so the teacher can learn more and analyze their students knowledge on certain topics and TAs on their ability to provide assistance to students