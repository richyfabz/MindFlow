# 🧠 MindFlowAI

> A sleek, ChatGPT-style AI chatbot built with React + Vite, powered by the OpenAI API.

##  Features

-  **Real-time AI conversations** powered by OpenAI GPT
-  **Conversation memory** — the AI remembers the full context of your chat
-  **Chat history sidebar** — create, switch between, and delete chats
-  **Regenerate responses** — not happy with an answer? Try again
-  **Dark / Light mode** — toggle between themes, preference is saved
-  **Code block rendering** — syntax-highlighted code responses
-  **Suggestion chips** — quick-start prompts on the home screen
-  **Responsive design** — works on desktop and mobile

---

## Preview

```
┌─────────────────────────────────────────────────────┐
│   MindFlowAI          [+]                         │
│  ─────────────────  ┊  ──────────────────────────── │
│  RECENT             ┊                               │
│  > What is React?   ┊     How can I help you?       │
│  > Fix my bug       ┊                               │
│                     ┊  [ Message MindFlowAI... ] ➤  │
└─────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/richyfabz/MindFlow.git
cd MindFlow
```

**2. Install root dependencies (for the backend server)**
```bash
npm install
```

**3. Install frontend dependencies**
```bash
cd MindFlowAI
npm install
```

**4. Set up your environment variables**

Create a `.env` file in the root of the project:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

> Never commit your `.env` file. It's already in `.gitignore`.

---

## Running Locally

You need **two terminals** running simultaneously:

**Terminal 1 — Start the backend server:**
```bash
# From the project root
node server.js
```
You should see: `MindFlowAI server running on http://localhost:3001`

**Terminal 2 — Start the frontend:**
```bash
cd MindFlowAI
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

##  Project Structure

```
MindFlow/
├── server.js                  # Express backend — proxies OpenAI API calls
├── package.json               # Root dependencies (express, cors, dotenv)
├── .env                       # API keys (never commit this!)
├── .gitignore
└── MindFlowAI/                # React frontend (Vite)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx            # Root component — manages chat state
        ├── main.jsx           # React entry point
        ├── index.css          # Global styles + dark/light theme
        ├── components/
        │   ├── chatinterface.jsx   # Main chat UI + API calls
        │   ├── sidebar.jsx         # Chat history sidebar
        │   └── chatGBTLogo.jsx     # SVG logo component
        └── context/
            └── themeContext.jsx    # Dark/light mode context
```

---

##  Deployment

This project is split into two deployments:

### Frontend → [Vercel](https://vercel.com)
- Set **Root Directory** to `MindFlowAI` in Vercel project settings
- Vercel auto-deploys on every push to `main`

### Backend → [Render](https://render.com)
- **Root Directory:** *(leave empty)*
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- Add `OPENAI_API_KEY` as an environment variable in Render settings

> After deploying the backend, update the API URL in `chatinterface.jsx` to point to your Render URL.

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS v4, Custom CSS |
| Backend | Node.js, Express |
| AI | OpenAI GPT-3.5 Turbo |
| Deployment | Vercel (frontend), Render (backend) |

---

##  Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key from [platform.openai.com](https://platform.openai.com) |

---

##  Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ by <a href="https://github.com/richyfabz">richyfabz</a></p>