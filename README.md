# Junior's notes app

This is version 1. right now you can create, read, update and delete notes. I am working on implementing other features like tags, sorting by tags, sorting by created/updated timestamps, archiving notes and searching through all notes.

Also, the auth system is super basic, its kind of like Roblox's one where you just sign up w/ a username and password. I am going to change this down the line to email and handle password resets thru email. Maybe add sessions instead of JWT etc.

Right now there is registering, logging in and the notes page on the frontend.
On the backend there is password hashing, JWT auth, rate limiting, and all the other typical things you'd find in a .NET Web API.
