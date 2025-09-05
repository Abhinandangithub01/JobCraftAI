# JobCraft AI - Setup Guide
## DevNetwork Hackathon 2025 - Foxit Challenge

### Quick Start (Windows)
1. **Run the automated setup:**
   ```bash
   start.bat
   ```
   This will install all dependencies and start both frontend and backend servers.

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Manual Setup

#### Prerequisites
- Node.js 18+ and npm
- Microsoft Word (for creating .docx templates)
- Foxit API credentials
- Google Gemini AI API key

#### Step 1: Install Dependencies
```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install
cd ..

# Client dependencies
cd client
npm install
cd ..
```

#### Step 2: Environment Configuration
1. Copy `.env.example` to `.env` (if exists) or create `.env` file
2. Add your API credentials:
```env
# Foxit API Configuration
FOXIT_CLIENT_ID=your_foxit_client_id
FOXIT_CLIENT_SECRET=your_foxit_client_secret
FOXIT_API_BASE_URL=https://api.foxit.com

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Step 3: Create Word Templates
**IMPORTANT:** You must create actual .docx files for the Foxit Document Generation API to work.

1. **Cover Letter Template** (`server/templates/coverLetter.docx`):
   - Open Microsoft Word
   - Create a professional business letter format
   - Use the exact tokens from `server/templates/coverLetter.docx` (text file)
   - Save as .docx format

2. **Resume Template** (`server/templates/resumeOptimized.docx`):
   - Create a modern, ATS-friendly resume layout
   - Use tokens from `server/templates/resumeOptimized.docx` (text file)
   - Ensure clean formatting and proper spacing

3. **Reference Sheet** (`server/templates/referenceSheet.docx`):
   - Create a professional references document
   - Use tokens from `server/templates/referenceSheet.docx` (text file)
   - Include proper contact information layout

#### Step 4: Start Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually:
# Backend only
npm run server

# Frontend only
npm run client
```

### API Endpoints

#### Upload Resume
```
POST /api/upload
Content-Type: multipart/form-data
Body: { file: resume.pdf }
```

#### Generate Application Package
```
POST /api/generate
Content-Type: application/json
Body: { jobDescription: "job posting text..." }
```

#### Download Documents
```
GET /api/download/:type/:filename
Types: coverLetter, resumeOptimized, referenceSheet, package, zip
```

#### Check Status
```
GET /api/status/job/:jobId
GET /api/status/system
```

### Project Structure
```
JobCraft AI/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── services/      # API services
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── templates/        # Word templates
│   ├── uploads/          # File uploads
│   ├── downloads/        # Generated files
│   └── temp/            # Temporary files
├── package.json          # Root package.json
├── start.bat            # Windows startup script
└── README.md            # Project documentation
```

### Foxit API Integration

#### Document Generation API (Synchronous)
- Converts Word templates + JSON data to PDF
- Uses base64 encoding for templates and output
- Requires client_id and client_secret headers

#### PDF Services API (Asynchronous)
- Upload → Process → Status → Download workflow
- Text extraction, merging, compression
- Job-based processing with status polling

### Troubleshooting

#### Common Issues
1. **Template not found**: Ensure .docx files exist in `server/templates/`
2. **API credentials**: Verify Foxit and Gemini API keys in `.env`
3. **Port conflicts**: Change PORT in `.env` if 5000 is occupied
4. **CORS errors**: Backend includes CORS middleware for localhost:3000

#### Debug Mode
```bash
# Enable debug logging
DEBUG=jobcraft:* npm run server
```

#### File Permissions
Ensure the application has write permissions for:
- `server/uploads/`
- `server/downloads/`
- `server/temp/`

### Deployment Notes

#### Production Environment
1. Set `NODE_ENV=production` in `.env`
2. Build React app: `cd client && npm run build`
3. Serve static files from Express
4. Use process manager (PM2) for server
5. Configure reverse proxy (nginx)

#### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
FOXIT_CLIENT_ID=prod_client_id
FOXIT_CLIENT_SECRET=prod_client_secret
GEMINI_API_KEY=prod_gemini_key
```

### Hackathon Submission Checklist
- [ ] All dependencies installed
- [ ] API credentials configured
- [ ] Word templates created (.docx files)
- [ ] Frontend builds successfully
- [ ] Backend starts without errors
- [ ] End-to-end workflow tested
- [ ] Documentation complete
- [ ] Demo video recorded (if required)

### Support
For DevNetwork Hackathon 2025 support, refer to:
- Foxit API Documentation: https://developers.foxit.com
- Google Gemini AI: https://ai.google.dev
- Project Repository: [Your GitHub URL]
