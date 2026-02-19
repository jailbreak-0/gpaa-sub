<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Version Management

The app includes an automatic version checker that prompts users to refresh when new updates are deployed.

### How it works:
- The app checks [metadata.json](metadata.json) every 5 minutes for version updates
- Also checks when the browser tab becomes visible again
- Displays a banner notification when a new version is detected
- Users can refresh immediately or dismiss and refresh later

### Deploying Updates:
When deploying new changes, update the `buildTimestamp` in [metadata.json](metadata.json):

```json
{
  "version": "1.0.0",
  "buildTimestamp": 1739923200000  // Update this with current timestamp
}
```

You can generate a new timestamp in the browser console:
```javascript
Date.now()
```

Or using Node.js:
```bash
node -e "console.log(Date.now())"
```
