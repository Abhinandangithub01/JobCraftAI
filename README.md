#JobCraft AI - DevNetwork Hackathon 2025

AI-powered job application automation using Foxit's REST APIs and Google Gemini AI.

## 🚀 Features

- **Smart Resume Analysis**: Upload your resume and get AI-powered insights
- **Automated Document Generation**: Create personalized cover letters, optimized resumes, and reference sheets
- **Foxit API Integration**: Leverage Document Generation API (sync) and PDF Services API (async)
- **AI-Powered Matching**: Google Gemini analyzes job descriptions and tailors applications
- **Document Optimization**: Merge, compress, and optimize final application packages

<img width="1905" height="1023" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/5c32b765-54a8-48f3-a2a8-13be2c889871" />

<img width="1905" height="1028" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/bc9af2aa-8958-41e5-9493-b33c8ae94fab" />

<img width="1901" height="1026" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/b594df5b-9b0d-4311-9a82-25a1aa9a719a" />

<img width="1896" height="1028" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/114b4c48-cdf1-4b57-99d2-5d12daade318" />

<img width="1900" height="1017" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/f27e3840-e5b2-4043-a23c-4e4dd2e29031" />

<img width="1902" height="1019" alt="Screenshot (9)" src="https://github.com/user-attachments/assets/2681f22f-ca87-400d-96a3-5b1033e3f00d" />

<img width="1916" height="1030" alt="Screenshot" src="https://github.com/user-attachments/assets/f79d5cc2-637c-4427-8f64-ab654d1c1e37" />


## 🏗️ Architecture

### Frontend (React.js)
- Single-page application with Tailwind CSS
- File upload with drag-and-drop interface
- Real-time progress tracking
- Document preview and download

### Backend (Node.js/Express)
- REST API with Foxit integration
- Chained workflow orchestration
- AI content generation with Gemini
- File management and optimization

### API Integration Flow
1. **Upload**: Resume PDF → Foxit PDF Services API
2. **Extract**: Text extraction from uploaded resume
3. **Analyze**: Gemini AI processes resume + job description
4. **Generate**: Foxit Document Generation API creates personalized documents
5. **Optimize**: PDF Services API merges and compresses final package
6. **Download**: Serve optimized application materials

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Foxit API credentials (client_id, client_secret)
- Google Gemini API key

### Installation

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create `.env` file in the root directory:

```env
# Foxit API Credentials
FOXIT_CLIENT_ID=your_foxit_client_id
FOXIT_CLIENT_SECRET=your_foxit_client_secret
FOXIT_API_BASE_URL=https://api.foxit.com

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Server
PORT=5000
```

### Development

```bash
# Run both frontend and backend concurrently
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client
```

## 📁 Project Structure

```
jobcraft-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API communication
│   │   └── utils/         # Helper functions
│   └── public/
├── server/                # Node.js backend
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── templates/        # Word document templates
│   ├── uploads/          # Temporary file storage
│   └── downloads/        # Generated documents
└── docs/                 # Documentation
```

## 🔧 API Endpoints

- `POST /api/upload` - Upload resume PDF
- `POST /api/generate` - Generate job application package
- `GET /api/download/:id` - Download generated documents
- `GET /api/status/:jobId` - Check processing status

## 🎯 Foxit API Integration

### Document Generation API (Synchronous)
- Converts Word templates with token syntax to PDF
- Immediate base64 response
- Used for cover letters, resumes, reference sheets

### PDF Services API (Asynchronous)
- Upload → Process → Status Check → Download workflow
- Text extraction, merging, compression
- Document optimization and branding

## 🤖 AI Features

- Resume content analysis and optimization suggestions
- Job description matching and skill gap identification
- Personalized cover letter generation
- Professional summary enhancement
- Reference sheet automation




