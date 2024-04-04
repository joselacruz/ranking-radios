# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- 
# Raking Radios
Ranking Radios is a website that uses the Radio Info API (https://api.radio-browser.info/) to display radio stations. It also uses Firebase to store user data, such as recently visited radio stations and those marked as favorites. It does not require authentication, since a unique ID is created using the UUID library and saved in the browser's LocalStorage.
# Demo App
https://ranking-radios.netlify.app

# Features
- Viewing radio stations using the Radio Info API.
- Saving of recently visited stations and marked as
favorites using Firebase.
- Search for stations by genre and country, using the ipinfo.io API to get the current country based on the user's IP address.
-Design using Material Design.

## Setup
1. Clone the repository to your local machine:

```sh
git clone https://github.com/joselacruz/ranking-radios.git
cd ranking-radios
```
2. Install the project dependencies:
```sh
npm install
```
3. Before you begin
   If you haven't already, you need to create a [Firebase project](https://firebase.google.com/docs/web/setup#create-project)

4. Then Enable a [Create a Cloud Firestore database]https://firebase.google.com/docs/firestore/quickstart#create
5. Then Enable Email Link sign-in for your Firebase project
   To sign in users by email link, you must first enable the Email provider and Email link sign-in method for your Firebase project:

- In the [Firebase console](https://console.firebase.google.com/), open the Auth section.
- On the Sign in method tab, enable the Email/Password provider and Click Save.

6. Create a .env file in the root directory of the project and set your Firebase configuration:

- VITE_FIREBASE_API_KEY=your-api-key
- VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
- VITE_FIREBASE_PROJECT_ID=your-project-id
- VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
- VITE_FIREBASE_APP_ID=your-app-id
- VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id # optional

7. Additionally, obtain an API token from ipinfo.io:

- Visit ipinfo.io and sign up for an account.
- Once logged in, navigate to the "Tokens" or "API Tokens" section.
- Generate a new token, providing a name and optional description.
- Copy the generated token and store it securely.
- Create a new environment variable in your .env file to store the token:

- VITE_IPINFO_API_TOKEN=your-ipinfo-api-token
Replace your-ipinfo-api-token with the token you generated.

# Usage
1. Start the development server:
```sh
npm run dev
```
2. Access the app in your browser at http://localhost:5173.

# Contributing
Feel free to contribute to this project by opening pull requests or issues on the repository.

# Credits
This project was created by Jose Lacruz.

#License
This project is licensed under the MIT License - see the LICENSE file for details.


