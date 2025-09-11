import { createRoot } from 'react-dom/client'
import App from './App'
// Ensure day-picker base styles load before tailwind overrides
import 'react-day-picker/dist/style.css'
import './index.css'

// Apply dark mode by default
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
