# Gift-recomendation-System
# 🎁 ChatGPT-Powered Gift Recommendation System

Welcome to the **Gift Recommendation System** – an intelligent, personalized gift suggestion platform powered by **OpenAI's ChatGPT**, built using **React**, **Node.js**, and integrated with a product catalog to make gifting easier, smarter, and more delightful! ✨

---

## 💡 Project Description

This project suggests gift ideas tailored to the recipient's **personality**, **preferences**, and **occasion**. Through an engaging questionnaire and the power of **AI**, it provides thoughtful recommendations along with reasons behind each choice. 🧠🎈

---

## 🚀 Core Features

- 📝 **Interactive Questionnaire** – Built in **React**, captures detailed information about the recipient.
- 🤖 **ChatGPT Integration** – Uses OpenAI’s GPT model to generate personalized gift ideas with thoughtful explanations.
- 🛒 **Node.js Backend** – Connects to a retail product catalog for relevant and dynamic gift suggestions.
- 🎨 **User-friendly Interface** – Smooth UI for seamless user experience.

---

## 🧰 Tech Stack

- **Frontend:** React.js, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **AI Integration:** OpenAI GPT-3.5 (via API)
- **Product Catalog Integration:** Custom or placeholder JSON
- **Deployment:** Vercel (Frontend), Render / Railway / Heroku (Backend)

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/gift-recommendation-system.git
cd gift-recommendation-system

# Install dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

# Set up environment variables
# Create a .env file in the server folder with the following:
OPENAI_API_KEY=your_openai_api_key_here

# Run the project

# Start backend server
npm run dev

# Start frontend app (in a new terminal)
cd ../client
npm start

# Visit in browser
http://localhost:3000
