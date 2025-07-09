# 🏋️‍♂️ TrainiAI – Personalized Plan Generator

**TrainiAI** is a smart, voice-based platform that helps users generate fully personalized fitness and diet plans — just by having a short conversation. No forms, no typing. Just talk to your AI coach and receive a custom plan tailored to your lifestyle, fitness level, and goals.

---

## 🌟 What It Does

- 🎙️ Natural voice-based onboarding using **VAPI**
- 🧠 Structured call summary analyzed with **Gemini AI**
- 📋 Automatically generates weekly workout + diet plans
- 🔐 Secure user accounts and data using **Clerk**
- 📨 Webhook support for **real-time user creation** via Clerk
- 📦 Plans are saved and linked to the user using **Prisma + PostgreSQL**
- 🖼️ Responsive, clean UI built with **Tailwind CSS + shadcn/ui**

---

## 🧠 How It Works

1. User starts a voice session with the AI assistant
2. The assistant asks fitness-related questions (goals, routine, injuries, diet)
3. After the call ends, structured data is retrieved
4. The data is analyzed using Gemini to create a personalized fitness + diet plan
5. The plan is saved in the database and linked to the logged-in user
6. User is redirected to their profile to view their plan

Additionally, when a new user signs up via Clerk, a **webhook is triggered** to create a corresponding user entry in your database.

---

## 🧩 Tech Stack

| Category        | Technology                |
| --------------- | ------------------------- |
| Frontend        | Next.js (App Router)      |
| Styling         | Tailwind CSS, shadcn/ui   |
| Authentication  | Clerk.dev                 |
| ORM             | Prisma                    |
| Database        | PostgreSQL                |
| Voice Assistant | VAPI                      |
| AI Integration  | Gemini (Google AI)        |
| Dev Tools       | Ngrok (for local testing) |
| Hosting         | Localhost / Vercel-ready  |

---

## 📡 Webhook Integration (Clerk)

This project uses Clerk’s **webhook support** to automatically add new users to the database when they sign up.

When a `user.created` event is received:

- The webhook verifies the event using a signing secret
- Extracts `id`, `email`, `name`, etc.
- Creates a new user record in your Prisma database

This ensures every Clerk user has a matching DB entry.

---

## 📁 Environment Variables Setup

Create a `.env.local` file and define the following variables:

### 🔐 Authentication

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`

### 💾 Database

- `NEXT_PUBLIC_DATABASE_URL`

### 🌍 Application Settings

- `NEXT_PUBLIC_WEBSITE_URL`
- `SIGNING_SECRET`

### 🧠 Gemini AI

- `NEXT_PUBLIC_GEMINI_API_KEY`

### 🗣️ VAPI (Voice Assistant)

- `NEXT_PUBLIC_VAPI_PRIVATE_KEY`
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
- `NEXT_PUBLIC_VAPI_WORKFLOW_ID`
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID`

> ⚠️ Make sure not to expose these keys publicly. Keep `.env.local` secure and excluded from version control.

---

## 🎨 User Experience

- Users sign in with Clerk
- They talk to a friendly AI assistant about their fitness goals
- After the call ends, within seconds, a fully structured plan is ready
- The plan includes a workout schedule and diet suggestions
- It’s personalized, saved securely, and easy to view in the dashboard

---

## 🔒 Security

- All routes are protected with Clerk's `currentUser()`
- Webhooks are verified using a shared secret
- All user data is isolated and securely stored

---

## 👨‍💻 Author

**Garvit Khulbe**  
AI & Web Developer | Voice Tech Enthusiast  
[LinkedIn](https://linkedin.com/in/garvitkhulbe) · [GitHub](https://github.com/garvitkhulbe)

---

## 📄 License

This project is open source and available under the **MIT License**.
