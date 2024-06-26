# PROJECT PAL
# Overview
This application is designed to give users with busy schedules a way to quickly create and keep track of projects of any type and purpose allowing each project to add or remove tasks updating their progress through completion.

# Process Flow
- [ERD](https://dbdiagram.io/d/BE-Capstone-Project-Pal-65cab919ac844320aeff164e)

- [Wireframes](https://www.figma.com/file/DdCdckqyu95M7JiTiPJ0NO/BE-Capstone-%22Project-Pal%22?type=whiteboard&node-id=0-1&t=eZL4pGmqNtpXSUJh-0)

- [Project Board](https://github.com/users/DavidBPoole/projects/4/views/1)

# Target User of this application is:
- someone who needs an organized way to keep track of personal projects
- someone who needs a clean and streamlined to-do list
- someone who wants a quick and simple project management interface
- someone who may want to collaborate with other users on their projects and tasks

# Features
- Authenticated registration/sign-in
- User home page with project listings
- Project details with task view page
- CRUD on projects and tasks
- Category assignment of tasks
- Ability to CRUD endless projects authenticated and unique to the user
- Ability to collaborate with other authenticated users on your projects
- Full control for project managers with ability to manage roles and access to projects
- More to come..

# Screens
<img width="500" height="auto" alt="Screenshot 2024-04-05 at 10 27 10 PM" src="https://github.com/DavidBPoole/projectpal-client/assets/127453405/f3b2e70c-b860-4153-8917-b812b7dd34f7">
<img width="500" height="auto" alt="Screenshot 2024-04-05 at 10 33 12 PM" src="https://github.com/DavidBPoole/projectpal-client/assets/127453405/512a15c5-1ec9-44a9-8270-0f5cbe93b71e">
<img width="500" height="auto" alt="Screenshot 2024-04-05 at 10 34 37 PM" src="https://github.com/DavidBPoole/projectpal-client/assets/127453405/7e6d71b4-ccdb-4cc3-a869-0027ced6f3c2">
<img width="500" height="auto" alt="Screenshot 2024-04-12 at 1 06 04 PM" src="https://github.com/DavidBPoole/projectpal-client/assets/127453405/341b54dc-1a48-4482-a997-424aa0fb2374">
<img width="500" height="auto" alt="Screenshot 2024-04-12 at 1 08 04 PM" src="https://github.com/DavidBPoole/projectpal-client/assets/127453405/c27cc65c-6759-4df0-8564-a8957f7b4c8b">
<img width="500" height="auto" alt="Screenshot 2024-04-12 at 1 08 36 PM" src="https://github.com/DavidBPoole/projectpal-client/assets/127453405/96fb33bc-f6d4-442e-9a37-d04c04a91180">


# Relevant Links
[Project Pal - Server](https://github.com/DavidBPoole/projectpal-server)

# Contributors
[David Poole](https://github.com/DavidBPoole)

# Tech Stack
ReactJS
NextJS
JS6
CSS3
HTML5
Firebase
Bootstrap
Figma

# Setup Instructions:

1. Set up a [Firebase](https://firebase.google.com/) project w/ authentication only.
    - [Firebase Setup w/ Authentication instructional video](https://www.loom.com/share/163ffe1539bb482196efa713ed6231e9)

2. Clone Project Pal (projectpal-client) to your local drive and change to that directory:
    - `git@github.com:DavidBPoole/projectpal-client.git`
    - `cd projectpal-client`
        
3. After opening the repository in your editor, create an .env file at the root directory for your project and paste the following keys inside:
```markdown
    NEXT_PUBLIC_FIREBASE_API_KEY=""
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
    NEXT_PUBLIC_DATABASE_URL=http://localhost:8000
```
4. The last portion of the Firebase walkthrough from step 1 highlights where to find the values to place within the empty strings in the code
    snippet in step 3. From Firebase, copy the values and paste then into the empty strings of their respective keys located within the .env file.

5. From the root directory of the project within your editor, run the following from your command line:
  `npm install` or `npm i`

6. From the command line input and press enter the following:
  `npm run prepare`

7. Start the app by inputting the following and pressing enter:
  `npm run dev`

8. Click (http://localhost:3000/) within your terminal to open the application within your browser.
    - note: the companion [Project Pal - Server](https://github.com/DavidBPoole/projectpal-server) must be running in order to use.

## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
