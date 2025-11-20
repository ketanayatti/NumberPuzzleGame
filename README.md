# 🧩 Number Puzzle Game

<div align="center">

[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge&logo=activity)](https://github.com/ketanayatti/NumberPuzzleGame)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20iOS%20%7C%20Android-blue?style=for-the-badge&logo=react)](https://expo.dev)
[![Tech Stack](https://img.shields.io/badge/Built%20With-React%20Native%20%2B%20Expo-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=open-source-initiative)](LICENSE)

<br />

**A dynamic, brain-teasing puzzle game where math meets strategy.**  
*Find the hidden combination of numbers that sum up to the target.*

<br />

[🎮 PLAY NOW](https://ketanayatti.github.io/NumberPuzzleGame/)
&nbsp;&nbsp;&nbsp;&nbsp;
[🐛 Report Bug](https://github.com/ketanayatti/NumberPuzzleGame/issues)
&nbsp;&nbsp;&nbsp;&nbsp;
[✨ Request Feature](https://github.com/ketanayatti/NumberPuzzleGame/issues)

</div>

---

## 📸 Visual Overview

<div align="center">
  <!-- Replace these with actual screenshots later -->
  <img src="https://via.placeholder.com/300x600?text=Game+Screen" alt="Game Screen" width="250" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://via.placeholder.com/300x600?text=Success+Animation" alt="Success" width="250" />
</div>

---

## ✨ Features

-   **🔢 Dynamic Puzzle Generation**: Every game is unique! The engine generates a guaranteed solvable puzzle with a random target sum and required selection count.
-   **🧠 Strategic Gameplay**: It's not just about math; it's about finding the *exact* set of numbers (e.g., "Select 4 numbers that sum to 31").
-   **🎨 Modern UI/UX**:
    -   Smooth animations using `react-native-reanimated`.
    -   Interactive feedback (shakes on error, glows on success).
    -   Clean, professional HUD with progress tracking.
-   **📱 Cross-Platform**: Runs seamlessly on Web, iOS, and Android thanks to Expo.
-   **⚡ Instant Feedback**: Visual cues for progress, success, and errors keep the gameplay fluid.

---

## 🛠️ Tech Stack

This project is built with a modern mobile development stack:

| Technology | Purpose |
| :--- | :--- |
| **React Native** | Core framework for cross-platform mobile UI |
| **Expo** | Development platform and build tools |
| **TypeScript** | Type safety and robust code structure |
| **Reanimated** | High-performance animations (60fps) |
| **React Native Web** | Web compatibility layer |

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

-   **Node.js** (v14 or newer)
-   **npm** or **yarn**
-   **Expo Go** app (for testing on physical devices)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ketanayatti/NumberPuzzleGame.git
    cd NumberPuzzleGame
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```

4.  **Run on your device**
    -   Press `w` to run in the web browser.
    -   Press `a` to run on Android Emulator.
    -   Press `i` to run on iOS Simulator.
    -   Scan the QR code with the **Expo Go** app to run on your physical phone.

---

## 🎮 How to Play

1.  **Check the Target**: Look at the top card. It shows a **Target Sum** (e.g., 31) and a **Required Count** (e.g., 4 numbers).
2.  **Select Numbers**: Tap cells in the grid to select them.
3.  **Watch the Math**: The "Current Sum" updates as you tap.
4.  **Validate**:
    -   If you select the correct amount of numbers and they equal the target, the game validates automatically (or press Validate).
    -   **Correct?** You get a success animation and move to the next puzzle instantly.
    -   **Wrong?** The grid shakes, and you can try again.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by [Ketan Ayatti](https://github.com/ketanayatti)

</div>