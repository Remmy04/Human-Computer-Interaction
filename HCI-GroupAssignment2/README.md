# 🌱 Replate

Replate is a high fidelity interactive prototype of a mobile application concept that reduces food waste by helping users discover discounted surplus food from local restaurants and shops. This repository contains an alpha level prototype built using HTML, CSS, and JavaScript, with enhanced interaction feedback through standard Web APIs for both visuals and audio. The goal of this prototype is to demonstrate how a user interface can be designed and developed with multimedia techniques to improve clarity, engagement, and perceived responsiveness in line with Human Computer Interaction principles.

---

## ✨ What this prototype includes

This prototype implements three connected screens that represent a realistic user flow.

On the Home Screen, users can view their current location, browse discounted items under Discovery, and see previously visited shops and community posts. Selecting the Sushi item opens the Item Details Screen as an overlay. On the Item Details Screen, users can change the quantity using plus and minus controls and observe the price updating in real time. When the user selects Add to Cart, a success notification appears as a confirmation message. These interactions are intentionally scoped to match an alpha prototype, meaning most elements are visually represented but only key buttons are functional.

---

## 🎨 Visual and audio techniques

Replate applies visual hierarchy and consistency through card based layouts, spacing, typography, and a cohesive colour palette that reinforces the sustainability theme. Gradient text styling is used to emphasize key information such as headings and pricing. Overlays and modal layers are implemented to simulate a real mobile application experience, including a bottom sheet style Item Details screen and a centered success notification popup. Visual micro interactions are used to make the interface feel responsive and polished, supporting recognition and reducing user uncertainty during interactions.

Audio feedback is used to reinforce user actions. Interactions such as clicking an item, changing quantity, and successfully adding to cart trigger sound feedback. This provides immediate confirmation and improves perceived responsiveness. Audio is intentionally triggered only from user gestures to comply with modern browser policies that restrict autoplay behaviour.

---

## 🧩 Standard Web APIs used

This prototype demonstrates the use of standard Application Programming Interfaces available in modern browsers, focusing on the Canvas 2D API for visual feedback and the Web Audio API for dynamic sound feedback.

### 🖼️ Canvas 2D API

The Canvas 2D API is a W3C standard graphics interface that enables real time drawing and animation on an HTML canvas element using JavaScript. In Replate, the Canvas 2D API is used to support animated visual feedback elements that enhance the experience without requiring WebGL or external libraries. Typical usage includes creating a 2D rendering context, drawing shapes and paths, generating gradients, and continuously updating frames using requestAnimationFrame. This makes it suitable for lightweight decorative animations or interaction effects such as subtle motion, pulsing elements, or background animations that match the app’s branding.

The implementation approach follows a common animation loop pattern. A frame update is scheduled using requestAnimationFrame, the canvas is cleared, and visual elements are redrawn based on time driven calculations. Simple mathematical functions such as sine and cosine can be used to generate smooth organic movement, which fits the sustainability concept by creating calm natural motion. Since Canvas rendering is a standard browser feature, the visual enhancements remain widely compatible across major modern browsers.

### 🔊 Web Audio API

The Web Audio API is a standard browser API for advanced audio processing and real time audio synthesis. Instead of relying only on pre recorded audio files, Web Audio allows the prototype to generate tones dynamically using oscillator nodes and control loudness through gain nodes. In Replate, the Web Audio API is used to create distinct audio cues for different interaction types, supporting consistent multi sensory feedback. For example, click and navigation actions can be represented by a crisp tone, quantity decrements can use a slightly lower tone, and successful confirmations can use a short ascending sequence that feels celebratory and positive.

A typical Web Audio implementation uses an AudioContext, then creates an OscillatorNode to generate a waveform such as sine or square. The oscillator is connected to a GainNode to apply an audio envelope, which shapes the sound into a natural attack, sustain, and release rather than an abrupt beep. The oscillator is then started and stopped after a short duration, and nodes are disconnected to avoid resource leaks. This approach produces clean responsive audio feedback with minimal asset requirements, and it can also serve as a fallback if audio files are not available.

### 🌟 Why these APIs matter for the prototype

Canvas 2D and Web Audio work well together for interactive prototypes because they provide immediate feedback across multiple sensory channels. Visual motion and audio cues help users understand that an input was received, reduce uncertainty, and improve perceived performance. Using standard Web APIs also demonstrates that an engaging interface can be created without external frameworks, while still following good interaction design practices.

---

## 🛠️ Technologies used

This prototype is built with:
- 🧱 HTML5 for semantic structure and overlay screen composition  
- 🎛️ CSS3 for layout, typography, colour styling, and transitions  
- ⚙️ JavaScript for event handling, DOM manipulation, and interaction logic  
- 🖌️ Canvas 2D API for dynamic visual rendering where implemented  
- 🎵 Web Audio API for synthesized audio feedback where implemented  

---

💚 Built for an HCI assignment with a sustainability focus: reduce waste, support local shops, and make interaction delightful.
