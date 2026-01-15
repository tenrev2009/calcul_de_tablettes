# Installation Instructions

1. Install Node.js
   - Go to https://nodejs.org
   - Download and install the LTS version
   - Verify installation by opening CMD and typing:
     ```
     node --version
     npm --version
     ```

2. Install Git
   - Go to https://git-scm.com/downloads
   - Download and install Git
   - Verify installation:
     ```
     git --version
     ```

3. Clone and Install Project
   ```cmd
   git clone [your-repository-url]
   cd [project-folder]
   npm install
   ```

4. Start Development Server
   ```cmd
   npm run dev
   ```

5. Build for Production
   ```cmd
   npm run build
   ```

## Troubleshooting

If you get "npm not recognized":
1. Restart your CMD
2. If still not working, add Node.js to your PATH:
   - Open System Properties
   - Click "Environment Variables"
   - Under System Variables, find PATH
   - Add the path to your Node.js installation (typically C:\Program Files\nodejs)
   - Click OK and restart CMD