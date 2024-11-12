# JUST DO IT NOW - Chrome Extension

A productivity-focused Chrome extension designed to help users combat procrastination and complete tasks effectively using a customizable timer system.

## Features

- **Task-Specific Timers**: Preset durations optimized for different types of tasks:
  - Research: 45 minutes
  - Programming: 35 minutes
  - Article Writing: 30 minutes
  - Content Creation: 25 minutes
  - Invoice Generation: 15 minutes

- **Flexible Timer Controls**:
  - Adjustable duration (±5 minutes)
  - Start/Pause/Reset functionality
  - Visual progress bar
  - Time remaining badge on extension icon

- **Motivational System**:
  - Progress-based motivational messages
  - Milestone notifications at key completion points (75%, 50%, 25%, etc.)
  - Task completion celebration

- **User-Friendly Interface**:
  - Clean, modern design with dark mode
  - Intuitive controls
  - Real-time progress tracking
  - Visual pause indicator

## Technical Details

### Built With
- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript
- Chrome Extension APIs

### Key Components
- `popup.html`: Main extension interface
- `popup.js`: Core timer logic and UI interactions
- `background.js`: Background processes and notifications
- `styles.css`: Custom styling and animations
- `manifest.json`: Extension configuration

### Features Implementation
- Chrome Storage API for persistence
- Chrome Alarms API for timer management
- Chrome Notifications API for alerts
- Custom SVG icons with multiple resolution support

## Installation

1. Clone the repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon to open the timer interface
2. (Optional) Select a task type for recommended duration
3. Adjust time if needed using +/- buttons
4. Click "Start" to begin the focus session
5. Use pause/reset as needed
6. Receive motivational messages and completion notification

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by Lucide
- UI components styled with Tailwind CSS
- Font: Inter by Google Fonts

---

Created by YUV.AI - Empowering Focus and Productivity 