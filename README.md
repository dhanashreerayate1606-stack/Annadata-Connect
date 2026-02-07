# Annadata Connect | Direct Farmer-to-Consumer Marketplace

Empowering Indian farmers by connecting them directly with consumers for fresh, local, and sustainable produce. Built with Next.js 15, Firebase, and Genkit AI.

## 🚀 How to Make This Live on GitHub

### 1. Initialize your repository
In your local terminal (from the project root), run:
```bash
git init
git add .
git commit -m "Initial commit of Annadata Connect"
```

### 2. Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Follow the instructions to "push an existing repository from the command line":
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Firebase App Hosting
This project includes an `apphosting.yaml` file, making it ready for **Firebase App Hosting**.
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Navigate to **Build > App Hosting**.
4. Click **Get Started** and connect the GitHub repository you just created.
5. Firebase will automatically build and deploy your site every time you push to the `main` branch.

## ✨ Features
- **AI Crop Advisory**: Personalized recommendations based on region and soil.
- **Multilingual Support**: Available in English, Hindi, Marathi, Tamil, Telugu, Kannada, and Bengali.
- **Traceability**: Scan QR codes to see the exact farm and harvest date of your produce.
- **Hyper-local Weather**: Location-enabled weather alerts for farmers.
- **Direct Marketplace**: Cut out the middleman and support local farmers.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & ShadCN UI
- **Backend**: Firebase Auth & Firestore
- **AI**: Genkit with Google Gemini
- **Icons**: Lucide React