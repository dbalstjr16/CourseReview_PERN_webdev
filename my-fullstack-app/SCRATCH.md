# Project Name
A space avaible for students to view and post comments about their course from their college.


## Table of Contents
- [Overview](#overview)

---

## Main Features
- Home page (index)
    - briefly introduce pages that can be used
- Register page
- Login/Logout page
- Main page
    - add, delete comments of its own
    - select a spcific college want to see
        - select course inside that college
    - view comments of its own and others
- Profile page (attended/attending college, age)
    - add verified user mark to indiciate he has attended that college and as is posting a comment on a class that the person actually took

## Additional Features
- 

![Screenshot](./assets/screenshot.png)

---

### Prerequisites
Ensure you have Node.js installed before ..

```sh
# Install dependencies
npm install

https://pern-webdev.onrender.com

# March 22th
## Setup
- root directory: installed concurrency (npm run dev)
- client side: installed react + typescript, bootstrap, react-router-dom,
- server side: installed express
## Code
- client: implemented Routes, Layout (navigation bar)
## Need to Do!
- database with user comments stored (based on their university name, and course name)
    - to load data and view all the comments posted by all users!
- user authentication --> also able to delete comments that the user wrote
    - login, logout, register
- fetch api of university names and course names!!!
    - for course search

# March 24th
so... there is no API for courses offered by a university, but
there is API for getting all names of universities in U.S.

Plan 1: Let user create courses inside university..
    -Problem: 
        - may generate random/bad courses that does not even exist
        - multiple duplicates of same courses with different names may exist
Plan 2: manually insert courses for course I already know..
    -Problem:
        - manullay inserting all is hard...i don't even know if how many classes exsit
        - may need to update or delete courses later in the future
    -Suggestions:
        - should i just insert CS courses only... lol? not purpose of my project