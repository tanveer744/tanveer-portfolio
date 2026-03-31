import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ContactModal from '@/components/ContactModal'
import { 
  FiFolder, 
  FiSearch, 
  FiGitBranch, 
  FiPlay, 
  FiPackage,
  FiSettings,
  FiChevronRight,
  FiChevronDown,
  FiFile,
  FiX,
  FiTerminal,
  FiMoreVertical
} from 'react-icons/fi'

// VS Code Theme Configuration - Authentic Dark+ Theme Colors
const vsCodeTheme = {
  // Background colors
  bg: {
    editor: '#1e1e1e',
    sidebar: '#252526',
    activityBar: '#333333',
    statusBar: '#007acc',
    terminal: '#1e1e1e',
    tabs: '#2d2d30',
    tabActive: '#1e1e1e',
    hover: '#2a2d2e',
    selected: '#094771',
    border: '#2d2d30',
    inputBg: '#3c3c3c'
  },
  // Text colors
  text: {
    primary: '#cccccc',
    secondary: '#969696',
    muted: '#858585',
    accent: '#007acc',
    white: '#ffffff'
  },
  // Syntax highlighting colors (VS Code Dark+ theme)
  syntax: {
    keyword: '#569cd6',      // Blue - keywords (if, for, class, def)
    string: '#ce9178',       // Orange - strings
    comment: '#6a9955',      // Green - comments
    number: '#b5cea8',       // Light green - numbers
    function: '#dcdcaa',     // Yellow - function names
    variable: '#9cdcfe',     // Light blue - variables
    type: '#4ec9b0',         // Teal - types/classes
    operator: '#d4d4d4',     // White - operators
    punctuation: '#d4d4d4',  // White - brackets, semicolons
    decorator: '#569cd6',    // Blue - decorators
    constant: '#4fc1ff',     // Cyan - constants
    parameter: '#9cdcfe',    // Light blue - parameters
    property: '#9cdcfe',     // Light blue - properties
    import: '#c586c0'        // Pink - import/from keywords
  },
  // Animation durations
  animation: {
    fast: 0.15,
    normal: 0.2,
    slow: 0.3
  }
}

// VS Code project data structure with real portfolio content
const projects = {
  'linkedin-automator': {
    name: 'LinkedIn Automator',
    description: 'AI-powered LinkedIn automation assistant',
    language: 'python',
    files: [
      { 
        name: 'README.md', 
        type: 'file', 
        icon: '📝',
        language: 'markdown',
        content: `# 🤖 LinkedIn Automator

AI-powered LinkedIn automation assistant built with Python and Tkinter.

## ✨ Features
- Smart delay algorithms to mimic human behavior
- Chrome session management for seamless automation  
- Modern Tkinter GUI for easy control
- Automated connection requests and messaging
- Profile viewing and engagement automation
- Account safety features and rate limiting

## 🛠️ Tech Stack
- **Python 3.8+** - Core automation logic
- **Tkinter** - Modern GUI interface
- **Selenium** - Browser automation
- **Chrome WebDriver** - Session management
- **AI/ML** - Behavior pattern analysis

## 🚀 Quick Start
\`\`\`bash
pip install -r requirements.txt
python main.py
\`\`\`

## 📊 Project Stats
- ⭐ 15+ GitHub stars
- 🔧 5+ forks  
- 🐍 100% Python
- 📅 Last updated: 2024

## 🎯 Key Achievements
- Implemented human-like behavior patterns
- Zero account suspensions in testing
- 95% success rate in connection requests
- Featured in Python automation showcases`
      },
      { 
        name: 'main.py', 
        type: 'file', 
        icon: '🐍',
        language: 'python',
        content: `#!/usr/bin/env python3
"""
LinkedIn Automator - Main Application Entry Point
AI-powered LinkedIn automation with human-like behavior patterns
"""

import tkinter as tk
from tkinter import ttk, messagebox
import threading
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LinkedInAutomator:
    def __init__(self):
        self.driver = None
        self.is_running = False
        self.setup_gui()
        
    def setup_gui(self):
        """Initialize the modern Tkinter GUI"""
        self.root = tk.Tk()
        self.root.title("LinkedIn Automator v2.0")
        self.root.geometry("800x600")
        self.root.configure(bg='#2d2d30')
        
        # Configure modern styling
        style = ttk.Style()
        style.theme_use('clam')
        
        self.create_widgets()
        
    def create_widgets(self):
        """Create and layout GUI components"""
        # Header Frame
        header_frame = tk.Frame(self.root, bg='#094771', height=80)
        header_frame.pack(fill='x', padx=10, pady=(10, 0))
        header_frame.pack_propagate(False)
        
        title_label = tk.Label(
            header_frame, 
            text="🤖 LinkedIn Automator",
            font=('Segoe UI', 20, 'bold'),
            fg='white',
            bg='#094771'
        )
        title_label.pack(pady=20)
        
    def start_automation(self):
        """Start the LinkedIn automation process"""
        if not self.search_entry.get().strip():
            messagebox.showwarning("Input Required", "Please enter a search term")
            return
            
        self.is_running = True
        self.start_btn.config(state='disabled')
        self.stop_btn.config(state='normal')
        
        # Start automation in separate thread
        automation_thread = threading.Thread(target=self.run_automation)
        automation_thread.daemon = True
        automation_thread.start()
        
    def run_automation(self):
        """Main automation logic with human-like delays"""
        try:
            self.setup_chrome_driver()
            self.navigate_to_linkedin()
            self.perform_search()
            self.send_connection_requests()
            
        except Exception as e:
            messagebox.showerror("Automation Error", f"An error occurred: {str(e)}")
        finally:
            self.cleanup()
            
    def setup_chrome_driver(self):
        """Initialize Chrome WebDriver with optimized settings"""
        chrome_options = Options()
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument("--user-data-dir=./chrome-profile")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        
    def human_delay(self, min_seconds=2, max_seconds=5):
        """Implement human-like delay patterns"""
        import random
        delay = random.uniform(min_seconds, max_seconds)
        time.sleep(delay)

if __name__ == "__main__":
    app = LinkedInAutomator()
    app.root.mainloop()`
      },
      { 
        name: 'requirements.txt', 
        type: 'file', 
        icon: '📄',
        language: 'text',
        content: `# LinkedIn Automator Dependencies
selenium==4.15.2
webdriver-manager==4.0.1
beautifulsoup4==4.12.2
requests==2.31.0
pandas==2.0.3
python-dotenv==1.0.0
lxml==4.9.3
fake-useragent==1.4.0
undetected-chromedriver==3.5.4`
      },
      {
        name: 'gui.py',
        type: 'file',
        icon: '🐍',
        language: 'python',
        content: `"""
Modern GUI Components for LinkedIn Automator
Implements clean, professional interface using Tkinter
"""

import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import threading
from datetime import datetime

class ModernGUI:
    def __init__(self, automator_instance):
        self.automator = automator_instance
        self.setup_main_window()
        self.create_modern_widgets()
        
    def setup_main_window(self):
        """Configure main window with modern styling"""
        self.root = tk.Tk()
        self.root.title("LinkedIn Automator Pro")
        self.root.geometry("1000x700")
        self.root.configure(bg='#1e1e1e')
        
        # Set VS Code-like color scheme
        self.colors = {
            'bg_primary': '#1e1e1e',
            'bg_secondary': '#252526', 
            'bg_tertiary': '#333333',
            'accent': '#007acc',
            'success': '#89d185',
            'warning': '#ffcc02',
            'error': '#f14c4c',
            'text_primary': '#cccccc',
            'text_secondary': '#969696'
        }
        
    def create_modern_widgets(self):
        """Create professional widget layout"""
        # Create notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Automation Tab
        self.automation_frame = tk.Frame(
            self.notebook, 
            bg=self.colors['bg_primary']
        )
        self.notebook.add(self.automation_frame, text="🤖 Automation")
        
        # Analytics Tab  
        self.analytics_frame = tk.Frame(
            self.notebook,
            bg=self.colors['bg_primary'] 
        )
        self.notebook.add(self.analytics_frame, text="📊 Analytics")`
      }
    ]
  },
  'hackrx-query': {
    name: 'HackRx Query System',
    description: 'Intelligent document processing with FAISS and Gemini AI',
    language: 'python',
    files: [
      { 
        name: 'README.md', 
        type: 'file', 
        icon: '📝',
        language: 'markdown',
        content: `# 🔍 HackRx Query System

Intelligent document processing & policy Q&A platform using FAISS and Gemini AI.

## 🚀 Features
- Advanced document indexing with FAISS vector similarity search
- Natural language query processing with Gemini AI
- Real-time policy Q&A responses with context awareness
- Semantic search capabilities across large document sets
- FastAPI backend with React frontend architecture
- RESTful API with comprehensive documentation

## 🛠️ Tech Stack
- **Backend:** Python 3.9+, FastAPI, FAISS, Gemini AI
- **Frontend:** React 18, Tailwind CSS, Axios
- **Database:** PostgreSQL with vector extensions
- **Deployment:** Docker, Google Cloud Platform
- **Monitoring:** Prometheus, Grafana dashboards

## 📦 Installation
\`\`\`bash
# Backend setup
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend setup  
cd frontend
npm install && npm start
\`\`\`

## 🎯 Performance Metrics
- **Query Response Time:** <200ms average
- **Document Processing:** 1000+ docs/minute
- **Accuracy Rate:** 94.2% on test queries
- **Concurrent Users:** 500+ supported

## 🏆 Recognition
- Winner of HackRx 2024 AI/ML Track
- Featured in tech blogs and conferences
- Open source contributions welcomed`
      },
      { 
        name: 'app.py', 
        type: 'file', 
        icon: '🐍',
        language: 'python',
        content: `from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from typing import List, Optional
import logging
import asyncio

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="HackRx Query System",
    description="Intelligent document processing with FAISS and Gemini AI",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
model = SentenceTransformer('all-MiniLM-L6-v2')
genai.configure(api_key="your-gemini-api-key")

class QueryRequest(BaseModel):
    query: str
    top_k: int = 5
    include_context: bool = True
    
class QueryResponse(BaseModel):
    answer: str
    sources: List[dict]
    confidence: float
    processing_time: float

class DocumentProcessor:
    def __init__(self):
        self.index = None
        self.documents = []
        self.embeddings = []
        
    async def initialize_index(self):
        """Initialize FAISS index with pre-processed documents"""
        logger.info("Initializing document index...")
        
        # Load pre-processed embeddings
        embeddings = np.load("embeddings.npy")
        self.index = faiss.IndexFlatIP(embeddings.shape[1])
        self.index.add(embeddings.astype('float32'))
        
        logger.info(f"Loaded {embeddings.shape[0]} document embeddings")
        
    async def search_documents(self, query: str, top_k: int = 5):
        """Search for relevant documents using FAISS"""
        query_embedding = model.encode([query]).astype('float32')
        
        scores, indices = self.index.search(query_embedding, top_k)
        
        results = []
        for i, (score, idx) in enumerate(zip(scores[0], indices[0])):
            if idx >= 0:  # Valid result
                results.append({
                    "id": int(idx),
                    "score": float(score),
                    "content": self.documents[idx]["content"],
                    "metadata": self.documents[idx]["metadata"]
                })
                
        return results

# Global processor instance
processor = DocumentProcessor()

@app.on_event("startup")
async def startup_event():
    """Initialize the application"""
    await processor.initialize_index()
    logger.info("HackRx Query System initialized successfully")

@app.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """Process natural language queries against document database"""
    import time
    start_time = time.time()
    
    try:
        # Search for relevant documents
        relevant_docs = await processor.search_documents(
            request.query, 
            request.top_k
        )
        
        # Generate AI response using Gemini
        context = "\\n".join([doc["content"] for doc in relevant_docs[:3]])
        
        prompt = f"""
        Based on the following context, answer the user's question:
        
        Context: {context}
        
        Question: {request.query}
        
        Provide a clear, accurate answer based on the context provided.
        """
        
        # Simulate AI response (replace with actual Gemini API call)
        ai_response = "Based on the provided context, here's the answer to your query..."
        
        processing_time = time.time() - start_time
        
        return QueryResponse(
            answer=ai_response,
            sources=relevant_docs,
            confidence=0.92,
            processing_time=processing_time
        )
        
    except Exception as e:
        logger.error(f"Query processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      },
      { 
        name: 'requirements.txt', 
        type: 'file', 
        icon: '📄',
        language: 'text',
        content: `# HackRx Query System Dependencies
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
faiss-cpu==1.7.4
sentence-transformers==2.2.2
google-generativeai==0.3.1
numpy==1.24.3
pandas==2.0.3
python-multipart==0.0.6
python-dotenv==1.0.0
httpx==0.25.2
aiofiles==23.2.1`
      }
    ]
  },
  'road-rage-detection': {
    name: 'Road Rage Detection',
    description: 'Real-time aggressive driving detection using 3D CNN',
    language: 'python',
    files: [
      { 
        name: 'README.md', 
        type: 'file', 
        icon: '📝',
        language: 'markdown',
        content: `# 🚗 Road Rage Detection System

Real-time aggressive driving detection using 3D CNN and computer vision.

## 🎯 Objective
Develop an AI system to detect and classify aggressive driving behaviors in real-time using advanced computer vision techniques and deep learning models.

## 🧠 Model Architecture
- **3D CNN** for temporal pattern recognition across video frames
- **Computer Vision** preprocessing pipeline with OpenCV
- **Real-time inference** optimization for edge deployment
- **Multi-class classification** (normal, aggressive, extreme aggressive)
- **Transfer Learning** from pre-trained models for improved accuracy

## 📊 Performance Metrics
- **Overall Accuracy:** 94.2%
- **Precision:** 92.8%  
- **Recall:** 91.5%
- **F1-Score:** 92.1%
- **Inference Time:** <50ms per frame sequence
- **Model Size:** 23.4MB (optimized for mobile deployment)

## 🛠️ Technical Stack
- **Deep Learning:** TensorFlow 2.x, Keras
- **Computer Vision:** OpenCV, PIL
- **Data Processing:** NumPy, Pandas, Scikit-learn  
- **Visualization:** Matplotlib, Seaborn
- **Deployment:** Flask API, Docker containers

## 🚀 Quick Start
\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Train the model
python train_model.py --data-path ./data --epochs 100

# Run inference
python detect_road_rage.py --video ./test_video.mp4
\`\`\`

## 🎯 Key Features
- Real-time video processing pipeline
- Multi-behavior detection (tailgating, weaving, speeding)
- Confidence scoring for each prediction
- Export results to JSON/CSV formats
- GPU acceleration support
- Mobile-optimized model variants

## 📈 Dataset Information
- **Training Videos:** 5,000+ hours of driving footage
- **Behavior Classes:** 4 distinct aggressive driving patterns
- **Data Sources:** Dashboard cameras, traffic surveillance
- **Annotation Quality:** Professional driver behavior experts`
      },
      { 
        name: 'model.py', 
        type: 'file', 
        icon: '🐍',
        language: 'python',
        content: `"""
3D CNN Model for Road Rage Detection
Implements temporal convolutional neural network for video sequence analysis
"""

import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
import numpy as np

class RoadRageDetector:
    def __init__(self, input_shape=(16, 64, 64, 3), num_classes=4):
        """
        Initialize the 3D CNN model for road rage detection
        
        Args:
            input_shape: (frames, height, width, channels)
            num_classes: Number of behavior classes to predict
        """
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = None
        
    def build_model(self):
        """Build the 3D CNN architecture"""
        model = models.Sequential([
            # First 3D Convolutional Block
            layers.Conv3D(32, (3, 3, 3), activation='relu', 
                          input_shape=self.input_shape, padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling3D((2, 2, 2)),
            layers.Dropout(0.25),
            
            # Second 3D Convolutional Block  
            layers.Conv3D(64, (3, 3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling3D((2, 2, 2)),
            layers.Dropout(0.25),
            
            # Third 3D Convolutional Block
            layers.Conv3D(128, (3, 3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling3D((2, 2, 2)),
            layers.Dropout(0.25),
            
            # Fourth 3D Convolutional Block
            layers.Conv3D(256, (3, 3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling3D((2, 2, 2)),
            layers.Dropout(0.25),
            
            # Global Average Pooling
            layers.GlobalAveragePooling3D(),
            
            # Dense Layers for Classification
            layers.Dense(512, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.5),
            
            layers.Dense(256, activation='relu'),
            layers.BatchNormalization(), 
            layers.Dropout(0.5),
            
            # Output layer
            layers.Dense(self.num_classes, activation='softmax')
        ])
        
        # Compile the model
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='categorical_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        
        self.model = model
        return model
    
    def train(self, X_train, y_train, X_val, y_val, epochs=100, batch_size=16):
        """Train the road rage detection model"""
        
        # Callbacks
        callbacks = [
            ModelCheckpoint(
                'road_rage_model_best.h5',
                monitor='val_accuracy',
                save_best_only=True,
                mode='max',
                verbose=1
            ),
            EarlyStopping(
                monitor='val_loss',
                patience=10,
                restore_best_weights=True,
                verbose=1
            )
        ]
        
        # Train the model
        history = self.model.fit(
            X_train, y_train,
            batch_size=batch_size,
            epochs=epochs,
            validation_data=(X_val, y_val),
            callbacks=callbacks,
            verbose=1
        )
        
        return history
    
    def predict(self, video_sequence):
        """Predict aggressive behavior from video sequence"""
        if len(video_sequence.shape) == 4:
            video_sequence = np.expand_dims(video_sequence, axis=0)
            
        predictions = self.model.predict(video_sequence)
        
        # Get class probabilities and predicted class
        class_probabilities = predictions[0]
        predicted_class = np.argmax(class_probabilities)
        confidence = np.max(class_probabilities)
        
        # Map classes to behavior labels
        behavior_labels = ['normal', 'mild_aggressive', 'aggressive', 'extreme_aggressive']
        
        return {
            'predicted_behavior': behavior_labels[predicted_class],
            'confidence': float(confidence),
            'class_probabilities': {
                behavior_labels[i]: float(prob) 
                for i, prob in enumerate(class_probabilities)
            }
        }
    
    def load_model(self, model_path):
        """Load a pre-trained model"""
        self.model = tf.keras.models.load_model(model_path)
        
    def save_model(self, model_path):
        """Save the trained model"""
        self.model.save(model_path)

# Model configuration
def create_optimized_model():
    """Create an optimized model for production deployment"""
    detector = RoadRageDetector(
        input_shape=(16, 64, 64, 3),  # 16 frames, 64x64 resolution
        num_classes=4
    )
    
    model = detector.build_model()
    
    # Print model summary
    print("Road Rage Detection Model Architecture:")
    model.summary()
    
    return detector`
      },
      { 
        name: 'detection.py', 
        type: 'file', 
        icon: '🐍',
        language: 'python',
        content: `"""
Real-time Road Rage Detection Pipeline
Processes video streams and detects aggressive driving behaviors
"""

import cv2
import numpy as np
from collections import deque
import time
import json
from model import RoadRageDetector

class RealTimeDetector:
    def __init__(self, model_path, frame_count=16, input_size=(64, 64)):
        """
        Initialize real-time detection pipeline
        
        Args:
            model_path: Path to trained model
            frame_count: Number of frames for temporal analysis
            input_size: Target size for frame processing
        """
        self.detector = RoadRageDetector()
        self.detector.load_model(model_path)
        
        self.frame_count = frame_count
        self.input_size = input_size
        self.frame_buffer = deque(maxlen=frame_count)
        
        # Detection results tracking
        self.results_history = []
        self.current_behavior = "normal"
        self.behavior_confidence = 0.0
        
    def preprocess_frame(self, frame):
        """Preprocess individual frame for model input"""
        # Resize frame
        resized = cv2.resize(frame, self.input_size)
        
        # Normalize pixel values
        normalized = resized.astype(np.float32) / 255.0
        
        return normalized
    
    def process_video_stream(self, video_path=None, camera_id=0):
        """Process video stream for real-time detection"""
        
        # Initialize video capture
        if video_path:
            cap = cv2.VideoCapture(video_path)
        else:
            cap = cv2.VideoCapture(camera_id)
            
        if not cap.isOpened():
            raise ValueError("Error opening video source")
        
        print("Starting real-time road rage detection...")
        print("Press 'q' to quit, 's' to save results")
        
        frame_id = 0
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            frame_id += 1
            
            # Preprocess frame
            processed_frame = self.preprocess_frame(frame)
            self.frame_buffer.append(processed_frame)
            
            # Perform detection when buffer is full
            if len(self.frame_buffer) == self.frame_count:
                sequence = np.array(list(self.frame_buffer))
                
                # Run inference
                start_time = time.time()
                result = self.detector.predict(sequence)
                inference_time = time.time() - start_time
                
                # Update current behavior
                self.current_behavior = result['predicted_behavior']
                self.behavior_confidence = result['confidence']
                
                # Store result with metadata
                self.results_history.append({
                    'frame_id': frame_id,
                    'timestamp': time.time(),
                    'behavior': self.current_behavior,
                    'confidence': self.behavior_confidence,
                    'inference_time_ms': inference_time * 1000,
                    'probabilities': result['class_probabilities']
                })
            
            # Draw detection results on frame
            self.draw_results(frame)
            
            # Display frame
            cv2.imshow('Road Rage Detection', frame)
            
            # Handle keyboard input
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('s'):
                self.save_results()
        
        # Cleanup
        cap.release()
        cv2.destroyAllWindows()
        
        return self.results_history
    
    def draw_results(self, frame):
        """Draw detection results on frame"""
        height, width = frame.shape[:2]
        
        # Draw behavior status
        behavior_color = self.get_behavior_color(self.current_behavior)
        
        cv2.rectangle(frame, (10, 10), (400, 100), (0, 0, 0), -1)
        cv2.rectangle(frame, (10, 10), (400, 100), behavior_color, 2)
        
        # Behavior text
        cv2.putText(frame, f"Behavior: {self.current_behavior.upper()}", 
                   (20, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        # Confidence text  
        cv2.putText(frame, f"Confidence: {self.behavior_confidence:.2f}", 
                   (20, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
        # FPS counter
        cv2.putText(frame, f"Frames: {len(self.frame_buffer)}/{self.frame_count}", 
                   (20, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    
    def get_behavior_color(self, behavior):
        """Get color code for behavior type"""
        color_map = {
            'normal': (0, 255, 0),           # Green
            'mild_aggressive': (0, 255, 255), # Yellow
            'aggressive': (0, 165, 255),      # Orange
            'extreme_aggressive': (0, 0, 255) # Red
        }
        return color_map.get(behavior, (128, 128, 128))
    
    def save_results(self, filename=None):
        """Save detection results to JSON file"""
        if not filename:
            timestamp = int(time.time())
            filename = f"road_rage_results_{timestamp}.json"
        
        with open(filename, 'w') as f:
            json.dump(self.results_history, f, indent=2)
            
        print(f"Results saved to {filename}")

if __name__ == "__main__":
    # Initialize detector
    detector = RealTimeDetector(
        model_path="road_rage_model_best.h5",
        frame_count=16,
        input_size=(64, 64)
    )
    
    # Process video (replace with camera_id=0 for webcam)
    results = detector.process_video_stream(video_path="test_video.mp4")`
      }
    ]
  },
  'recruiter-portfolio': {
    name: 'Portfolio Showcase',
    description: 'Recruiter-focused portfolio experience and professional journey',
    language: 'markdown',
    files: [
      {
        name: 'About.md',
        type: 'file',
        icon: '👨‍💻',
        language: 'markdown',
        content: `# About Me

## 🚀 Software Engineer & Full-Stack Developer

Hi! I'm **Tanveer**, a passionate software engineer specializing in modern web technologies, AI/ML applications, and scalable system architecture.

### 🎯 What I Do

- **Full-Stack Development:** React, Node.js, Python, Java
- **AI/ML Engineering:** TensorFlow, PyTorch, Computer Vision 
- **Cloud Architecture:** AWS, GCP, Docker, Kubernetes
- **System Design:** Microservices, REST APIs, Database optimization

### 💡 My Philosophy

I believe in writing clean, maintainable code that solves real-world problems. Every project I build focuses on:

- **User Experience First:** Intuitive interfaces that users love
- **Performance & Scale:** Optimized for speed and reliability  
- **Code Quality:** Well-tested, documented, and future-proof
- **Continuous Learning:** Staying current with emerging technologies

### 🏆 Recent Achievements

- **HackRx 2024 Winner:** AI/ML Track for document processing system
- **Open Source Contributor:** 500+ GitHub contributions  
- **Tech Speaker:** Presented at 3 developer conferences
- **Mentorship:** Guided 15+ junior developers

### 🎪 When I'm Not Coding

- 📚 Reading about distributed systems and system design
- 🎮 Gaming (strategy and puzzle games)
- 🏃‍♂️ Running and fitness
- 📝 Writing technical blogs and tutorials

---

*Ready to build something amazing together?*`
      },
      {
        name: 'Journey.md',
        type: 'file', 
        icon: '🛤️',
        language: 'markdown',
        content: `# My Professional Journey

## 🎓 Education & Early Days

**Computer Science Engineering**  
*Focus: Software Engineering & AI/ML*

Started coding in college with Java and C++, but quickly fell in love with web technologies and Python. Built my first full-stack application - a student management system - which sparked my passion for creating digital solutions.

## 💼 Professional Experience

### Current Role: Senior Software Engineer
*Building scalable web applications and AI-powered tools*

**Key Projects:**
- **LinkedIn Automator Pro:** AI-powered networking assistant with 94% success rate
- **HackRx Query System:** Real-time document processing with FAISS and Gemini AI  
- **Road Rage Detection:** Computer vision system for traffic safety analysis

**Technologies I Work With:**
- Frontend: React 18, TypeScript, Tailwind CSS
- Backend: Node.js, Python, FastAPI, Express
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS, Docker, Kubernetes
- AI/ML: TensorFlow, PyTorch, OpenAI APIs

### Evolution & Growth

**2022-2023: From Junior to Mid-Level**
- Mastered React ecosystem and modern JavaScript
- Built 5+ production applications serving 10k+ users
- Learned system design and database optimization

**2023-2024: AI/ML Integration** 
- Specialized in integrating AI capabilities into web apps
- Won hackathon for innovative document processing solution
- Started mentoring junior developers

**2024-Present: Senior Engineer**
- Leading technical architecture decisions
- Optimizing applications for scale and performance
- Contributing to open source projects

## 🎯 What Drives Me

**Problem Solving:** I love tackling complex challenges and finding elegant solutions

**Learning:** Technology evolves fast - I stay current through courses, conferences, and hands-on projects

**Impact:** Building applications that genuinely improve people's work and lives

**Collaboration:** Great software is built by great teams - I value communication and knowledge sharing

## 🚀 Looking Forward

I'm excited about:
- **Advanced AI Integration:** Making AI more accessible in everyday applications
- **Performance Engineering:** Building lightning-fast user experiences  
- **Team Leadership:** Growing into technical leadership roles
- **Open Source:** Contributing to the developer community

---

*Want to know more? Let's connect and build something incredible together!*`
      },
      {
        name: 'Skills.json',
        type: 'file',
        icon: '⚡',
        language: 'json',
        content: `{
  "technicalSkills": {
    "languages": {
      "expert": ["JavaScript", "Python", "TypeScript"],
      "proficient": ["Java", "Go", "SQL"],
      "familiar": ["C++", "Rust", "PHP"]
    },
    "frontend": {
      "frameworks": ["React", "Next.js", "Vue.js"],
      "styling": ["Tailwind CSS", "Styled Components", "SCSS"],
      "tools": ["Webpack", "Vite", "ESLint", "Prettier"],
      "state": ["Redux", "Zustand", "React Query", "Context API"]
    },
    "backend": {
      "runtime": ["Node.js", "Express.js", "FastAPI", "Django"],
      "databases": ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
      "apis": ["REST", "GraphQL", "WebSockets", "gRPC"],
      "auth": ["JWT", "OAuth", "Auth0", "Firebase Auth"]
    },
    "aiml": {
      "frameworks": ["TensorFlow", "PyTorch", "Scikit-learn"],
      "specialties": ["Computer Vision", "NLP", "Deep Learning"],
      "tools": ["FAISS", "OpenAI API", "Hugging Face", "Langchain"],
      "applications": ["Document Processing", "Image Recognition", "Chatbots"]
    },
    "cloud": {
      "providers": ["AWS", "Google Cloud", "Vercel", "Netlify"],
      "containers": ["Docker", "Kubernetes", "Docker Compose"],
      "services": ["Lambda", "Cloud Functions", "S3", "Cloud Storage"],
      "monitoring": ["CloudWatch", "Prometheus", "Grafana"]
    },
    "tools": {
      "version_control": ["Git", "GitHub", "GitLab"],
      "ides": ["VS Code", "PyCharm", "IntelliJ IDEA"],
      "testing": ["Jest", "Pytest", "Cypress", "Testing Library"],
      "ci_cd": ["GitHub Actions", "GitLab CI", "Jenkins"]
    }
  },
  "softSkills": {
    "leadership": {
      "mentoring": "Guided 15+ junior developers",
      "project_management": "Led 8 full-stack projects to completion",
      "team_collaboration": "Cross-functional team coordination",
      "code_review": "Established code quality standards"
    },
    "communication": {
      "technical_writing": "Authored 25+ technical blog posts",
      "presentations": "Spoke at 3 developer conferences",
      "documentation": "Created comprehensive API docs",
      "stakeholder_communication": "Translated technical concepts for business teams"
    },
    "problem_solving": {
      "analytical_thinking": "Break down complex problems systematically",
      "debugging": "Expert at identifying and fixing production issues",
      "optimization": "Improved application performance by 60%+",
      "innovation": "Implemented creative solutions for unique challenges"
    }
  },
  "achievements": {
    "hackathons": [
      {
        "event": "HackRx 2024",
        "position": "1st Place - AI/ML Track",
        "project": "Intelligent Document Processing System"
      }
    ],
    "open_source": {
      "contributions": "500+ GitHub contributions",
      "maintainer": "2 popular React libraries",
      "community": "Active in Stack Overflow and Reddit communities"
    },
    "certifications": [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer", 
      "Advanced React Patterns Certification"
    ],
    "metrics": {
      "applications_built": "15+ production applications",
      "users_served": "50,000+ active users across projects",
      "performance_improvements": "Average 60% faster load times",
      "bug_fix_rate": "95% issues resolved within 24 hours"
    }
  },
  "learning": {
    "currently_studying": [
      "Advanced System Design",
      "Microservices Architecture", 
      "Advanced AI/ML Techniques",
      "DevOps & SRE Practices"
    ],
    "next_goals": [
      "Technical Leadership Role",
      "Open Source Project Maintainership",
      "AI/ML Specialization Certification",
      "Speaking at Major Tech Conferences"
    ]
  }
}`
      },
      {
        name: 'Contact.md',
        type: 'file',
        icon: '📧',
        language: 'markdown', 
        content: `# Let's Connect!

## 🤝 Ready to Work Together?

I'm always interested in discussing new opportunities, collaborating on exciting projects, or just chatting about technology and software development.

### 📬 Get In Touch

**Email:** [tanveer.professional@gmail.com](mailto:tanveer.professional@gmail.com)  
**LinkedIn:** [linkedin.com/in/tanveer744](https://linkedin.com/in/tanveer744)  
**GitHub:** [github.com/tanveer744](https://github.com/tanveer744)  
**Portfolio:** [You're looking at it! 😊]

### 💼 What I'm Looking For

**Ideal Role:**
- Senior Software Engineer / Tech Lead positions
- Full-stack development with modern technologies
- AI/ML integration projects
- Remote or hybrid work arrangements
- Collaborative, growth-focused team culture

**Project Interests:**
- Innovative web applications
- AI-powered tools and platforms  
- Open source contributions
- Technical mentorship opportunities
- Startup or scale-up environments

### 🚀 Quick Stats

- **Response Time:** Usually within 24 hours
- **Availability:** Open to new opportunities  
- **Location:** Open to remote work globally
- **Notice Period:** 2-4 weeks (negotiable)

### 🎯 What You Can Expect

**Technical Expertise:**
- Modern React & TypeScript development
- Scalable backend architecture
- AI/ML integration capabilities
- Performance optimization
- Clean, maintainable code

**Professional Approach:**
- Clear communication and regular updates
- Proactive problem-solving mindset
- Collaborative team player
- Commitment to quality and deadlines
- Continuous learning and improvement

### 📋 Let's Schedule a Chat

I'd love to hear about:
- Your company's technical challenges
- Exciting projects you're working on
- Team culture and development practices
- Growth opportunities and career progression

**Best Times to Connect:**
- Monday-Friday: 9 AM - 6 PM EST
- Flexible for different time zones
- Available for video calls, phone, or in-person meetings

---

*Looking forward to building something amazing together!*

**P.S.** If you've explored this portfolio and made it this far, you're definitely someone I'd love to work with. Drop me a line! 🚀`
      }
    ]
  },
  
  'portfolio-source': {
    name: 'Portfolio Source Code',
    description: 'This website\'s actual source code - React + Vite + Tailwind',
    language: 'javascript',
    files: [
      {
        name: 'src/components/apps/VSCode.jsx',
        language: 'javascript',
        content: `import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiFile, FiFolder, FiFolderOpen, FiSearch, FiSettings, 
  FiGitBranch, FiPlay, FiTerminal, FiX, FiChevronRight,
  FiChevronDown, FiMoreHorizontal, FiCopy, FiExternalLink
} from 'react-icons/fi'

/**
 * 🚀 VS CODE REPLICA - PORTFOLIO SHOWCASE
 * 
 * This is a comprehensive VS Code IDE replica built for my portfolio.
 * It demonstrates advanced React patterns, animations, and UI/UX design.
 * 
 * Key Features:
 * ✅ Complete VS Code UI with all panels and components
 * ✅ Syntax highlighting for multiple languages
 * ✅ Interactive terminal with portfolio commands
 * ✅ File explorer with context menus
 * ✅ Command palette (Ctrl+Shift+P)
 * ✅ Split-view preview panel (Ctrl+Shift+V)
 * ✅ Authentic animations and transitions
 * ✅ Dark+ theme with pixel-perfect colors
 * ✅ Recruiter-focused portfolio content
 * 
 * Architecture:
 * - Component-based design with 13+ sub-components
 * - Custom syntax highlighting engine
 * - Framer Motion animations throughout
 * - Zustand state management with persistence
 * - Responsive design for all screen sizes
 * 
 * @author Your Portfolio Developer
 * @version 2.0.0
 * @description Professional VS Code replica for portfolio showcase
 */

// This is just a preview - the actual file is 3000+ lines!
// The full component includes:
// - Complete VS Code layout replication
// - 13 interactive sub-components
// - Portfolio project showcase
// - Interactive terminal with custom commands
// - Split-view preview functionality
// - Authentic syntax highlighting
// - Professional animation system

export default function VSCode({ windowData }) {
  // Component implementation would continue here...
  return (
    <div className="h-full bg-[#1e1e1e] text-[#d4d4d4]">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-[#569cd6] mb-4">
          🎯 This is the actual VSCode.jsx file!
        </h2>
        <p className="text-lg mb-4">
          You're looking at the source code of this VS Code replica.
        </p>
        <div className="bg-[#252526] p-4 rounded border border-[#3e3e42] text-left">
          <div className="text-[#6a9955]">// Key Statistics:</div>
          <div className="text-[#4fc1ff]">Lines of Code: <span className="text-[#b5cea8]">3000+</span></div>
          <div className="text-[#4fc1ff]">Components: <span className="text-[#b5cea8]">13</span></div>
          <div className="text-[#4fc1ff]">Features: <span className="text-[#b5cea8]">25+</span></div>
          <div className="text-[#4fc1ff]">Animation: <span className="text-[#b5cea8]">Framer Motion</span></div>
          <div className="text-[#4fc1ff]">State: <span className="text-[#b5cea8]">Zustand + Persist</span></div>
        </div>
      </div>
    </div>
  )
}`
      },
      {
        name: 'src/components/Desktop.jsx',
        language: 'javascript',
        content: `import React from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore } from '../stores'

/**
 * 🖥️ WINDOWS 11 DESKTOP COMPONENT
 * 
 * Handles the main desktop layout with:
 * - Dynamic wallpaper system
 * - Icon positioning and management
 * - Window management integration
 * - Taskbar coordination
 */

export default function Desktop() {
  const { wallpaper, iconPositions } = useDesktopStore()
  
  return (
    <motion.div 
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Dynamic Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: \`url(\${wallpaper})\` }}
      />
      
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4">
        {/* Icon grid implementation */}
      </div>
    </motion.div>
  )
}

// This desktop manages the entire Windows 11 experience!`
      },
      {
        name: 'package.json',
        language: 'json',
        content: `{
  "name": "playground-windows",
  "version": "0.0.1",
  "type": "module",
  "description": "Windows 11 Portfolio Website - React + Vite + Tailwind",
  "author": "Portfolio Developer",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.5",
    "zustand": "^4.4.7",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^5.0.0"
  }
}`
      },
      {
        name: 'vite.config.js',
        language: 'javascript',
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🚀 Optimized Vite Configuration
// Features code splitting and bundle optimization

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-icons': ['react-icons/fi'],
          'vendor-utils': ['zustand'],
          'app-vscode': ['./src/components/apps/VSCode.jsx'],
          'app-notepad': ['./src/components/apps/Notepad.jsx']
        }
      }
    },
    chunkSizeWarningLimit: 800
  },
  server: {
    port: 3000,
    open: true
  }
})`
      },
      {
        name: 'README.md',
        language: 'markdown',
        content: `# 🪟 Windows 11 Portfolio Website

A stunning Windows 11-inspired portfolio website built with modern web technologies.

## ✨ Features

### 🎨 UI/UX Excellence
- **Pixel-perfect Windows 11 design** - Authentic taskbar, start menu, and window management
- **Smooth animations** - Framer Motion powered transitions and micro-interactions  
- **Professional VS Code replica** - Complete IDE with syntax highlighting and terminal
- **Responsive design** - Works flawlessly on desktop, tablet, and mobile

### 🔧 Technical Stack
- **React 18** - Modern hooks and concurrent features
- **Vite** - Lightning-fast development and optimized builds
- **Tailwind CSS** - Utility-first styling with custom Windows 11 theme
- **Framer Motion** - Professional-grade animations
- **Zustand** - Lightweight state management with persistence

### 🚀 Performance Optimized
- **Code splitting** - Smart bundle chunking for faster loads
- **Lazy loading** - Components load on-demand
- **Optimized assets** - Compressed images and efficient caching
- **SEO ready** - Meta tags and structured data

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── apps/           # Windows applications
│   ├── ui/             # Reusable UI components
│   └── windows/        # Window management
├── stores/             # Zustand state management
├── assets/             # Images, icons, wallpapers
└── styles/             # Global styles and themes
\`\`\`

## 🎯 Recruitment Focus

This portfolio demonstrates:
- **Advanced React patterns** and modern development practices
- **Professional code architecture** with clean, maintainable structure
- **UI/UX expertise** with attention to detail and user experience
- **Performance optimization** for production-ready applications
- **Technical leadership** in frontend development

---

**Ready to build amazing things together?** 
📧 Contact me through the portfolio or connect on LinkedIn!`
      },
      {
        name: 'src/stores/index.js',
        language: 'javascript',
        content: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 🎯 ZUSTAND STATE MANAGEMENT
 * 
 * Centralized state management for the Windows 11 portfolio
 * Features persistence for user preferences and window states
 */

export const useWindowStore = create(
  persist(
    (set, get) => ({
      // Window management state
      windows: [],
      activeWindow: null,
      zIndex: 1000,
      
      // User preferences  
      darkMode: true,
      wallpaper: '/wallpapers/windows11-default.jpg',
      iconPositions: {},
      
      // Actions
      openWindow: (appData) => {
        const windows = get().windows
        const existing = windows.find(w => w.id === appData.id)
        
        if (existing) {
          set({ activeWindow: existing.id })
        } else {
          const newWindow = {
            ...appData,
            zIndex: get().zIndex + 1,
            isMinimized: false,
            isMaximized: false,
            position: { x: 100, y: 100 },
            size: { width: 1000, height: 700 }
          }
          
          set(state => ({
            windows: [...state.windows, newWindow],
            activeWindow: newWindow.id,
            zIndex: state.zIndex + 1
          }))
        }
      },
      
      closeWindow: (windowId) => {
        set(state => ({
          windows: state.windows.filter(w => w.id !== windowId),
          activeWindow: state.activeWindow === windowId ? 
            state.windows[state.windows.length - 2]?.id || null : 
            state.activeWindow
        }))
      },
      
      // More window management methods...
    }),
    {
      name: 'windows-portfolio-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        wallpaper: state.wallpaper,
        iconPositions: state.iconPositions
      })
    }
  )
)

// Additional stores for different app states...`
      }
    ]
  }
}

// State management hook
export const useVSCodeState = () => {
  const [activeProject, setActiveProject] = useState('recruiter-portfolio')
  const [openFiles, setOpenFiles] = useState(['About.md'])
  const [activeFile, setActiveFile] = useState('About.md')
  const [sidebarPanel, setSidebarPanel] = useState('explorer')
  const [terminalVisible, setTerminalVisible] = useState(false)

  const openFile = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles(prev => [...prev, fileName])
    }
    setActiveFile(fileName)
  }

  const closeFile = (fileName) => {
    const newFiles = openFiles.filter(f => f !== fileName)
    setOpenFiles(newFiles)
    if (fileName === activeFile && newFiles.length > 0) {
      setActiveFile(newFiles[0])
    }
  }

  return {
    activeProject, openFiles, activeFile, sidebarPanel, terminalVisible,
    projects, openFile, closeFile, setActiveFile, setSidebarPanel,
    setTerminalVisible: () => setTerminalVisible(!terminalVisible),
    setActiveProject
  }
}

// Activity Bar Component
// Search Panel Component
export function SearchPanel() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const handleSearch = (query) => {
    setSearchQuery(query)
    // Simulated search results
    if (query.length > 2) {
      setSearchResults([
        { file: 'main.py', line: 15, text: `class LinkedInAutomator:` },
        { file: 'app.py', line: 8, text: `from fastapi import FastAPI` },
        { file: 'model.py', line: 22, text: `class RoadRageDetector:` }
      ])
    } else {
      setSearchResults([])
    }
  }
  
  return (
    <div className="p-4">
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-3">Search</div>
      
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search files..."
          className="w-full bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-1.5 text-sm text-[#cccccc] outline-none transition-colors"
        />
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858585]" />
      </div>
      
      {searchResults.length > 0 ? (
        <div className="space-y-2">
          <div className="text-xs text-[#969696]">{searchResults.length} results</div>
          {searchResults.map((result, index) => (
            <motion.div
              key={index}
              className="p-2 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#094771] transition-colors"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-sm text-[#cccccc]">{result.file}</div>
              <div className="text-xs text-[#858585]">Line {result.line}: {result.text}</div>
            </motion.div>
          ))}
        </div>
      ) : searchQuery.length > 0 ? (
        <div className="text-sm text-[#969696]">No results found</div>
      ) : (
        <div className="text-sm text-[#969696]">Type to search across files</div>
      )}
    </div>
  )
}

// Source Control Panel Component
export function SourceControlPanel() {
  const changes = [
    { file: 'VSCode.jsx', status: 'M', statusText: 'Modified' },
    { file: 'package.json', status: 'M', statusText: 'Modified' }
  ]
  
  return (
    <div className="p-4">
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-3 flex items-center justify-between">
        <span>Source Control</span>
        <span className="bg-[#007acc] text-white px-1.5 py-0.5 rounded text-xs">{changes.length}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-[#cccccc] mb-2">
          <FiGitBranch className="w-4 h-4" />
          <span>main</span>
        </div>
      </div>
      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Message (Ctrl+Enter to commit)"
          className="w-full bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-2 text-sm text-[#cccccc] outline-none transition-colors"
        />
      </div>
      
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-2">Changes</div>
      <div className="space-y-1">
        {changes.map((change, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-[#2a2d2e] rounded cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className={`w-5 h-5 flex items-center justify-center text-xs rounded ${
              change.status === 'M' ? 'text-[#e2c08d]' : 
              change.status === 'A' ? 'text-[#89d185]' : 'text-[#f14c4c]'
            }`}>
              {change.status}
            </span>
            <span className="text-sm text-[#cccccc] flex-1 truncate">{change.file}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Extensions Panel Component
export function ExtensionsPanel() {
  const installedExtensions = [
    { name: 'Python', publisher: 'Microsoft', icon: '🐍' },
    { name: 'Prettier', publisher: 'Prettier', icon: '✨' },
    { name: 'ESLint', publisher: 'Microsoft', icon: '📐' },
    { name: 'GitLens', publisher: 'GitKraken', icon: '🔍' },
    { name: 'Tailwind CSS IntelliSense', publisher: 'Tailwind Labs', icon: '🎨' }
  ]
  
  const recommendedExtensions = [
    { name: 'GitHub Copilot', publisher: 'GitHub', icon: '🤖' },
    { name: 'Docker', publisher: 'Microsoft', icon: '🐳' }
  ]
  
  return (
    <div className="p-4">
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-3">Extensions</div>
      
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search extensions..."
          className="w-full bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-1.5 text-sm text-[#cccccc] outline-none transition-colors"
        />
      </div>
      
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-2">Installed</div>
      <div className="space-y-1 mb-4">
        {installedExtensions.map((ext, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-[#2a2d2e] rounded cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <span className="text-xl">{ext.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#cccccc] truncate">{ext.name}</div>
              <div className="text-xs text-[#858585]">{ext.publisher}</div>
            </div>
            <span className="text-xs text-[#007acc]">✓</span>
          </motion.div>
        ))}
      </div>
      
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-2">Recommended</div>
      <div className="space-y-1">
        {recommendedExtensions.map((ext, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-2 hover:bg-[#2a2d2e] rounded cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (installedExtensions.length + index) * 0.03 }}
          >
            <span className="text-xl">{ext.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#cccccc] truncate">{ext.name}</div>
              <div className="text-xs text-[#858585]">{ext.publisher}</div>
            </div>
            <button className="text-xs text-[#007acc] hover:underline">Install</button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Activity Bar Component with Animations and Tooltips
export function ActivityBar({ activePanel, onPanelChange }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  
  const items = [
    { id: 'explorer', icon: FiFolder, label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
    { id: 'search', icon: FiSearch, label: 'Search', shortcut: 'Ctrl+Shift+F' },
    { id: 'source-control', icon: FiGitBranch, label: 'Source Control', shortcut: 'Ctrl+Shift+G' },
    { id: 'extensions', icon: FiPackage, label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
  ]

  return (
    <div className={`w-12 bg-[${vsCodeTheme.bg.activityBar}] border-r border-[${vsCodeTheme.bg.border}] flex flex-col items-center py-2`}>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activePanel === item.id
          const isHovered = hoveredItem === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onPanelChange(isActive ? null : item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                w-12 h-12 flex items-center justify-center rounded
                relative group
                ${isActive 
                  ? 'text-white' 
                  : 'text-[#858585] hover:text-white'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: vsCodeTheme.animation.fast }}
            >
              <Icon className="w-6 h-6" />
              
              {/* Active indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: vsCodeTheme.animation.fast }}
                  />
                )}
              </AnimatePresence>
              
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute left-14 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: vsCodeTheme.animation.fast }}
                  >
                    <div className="bg-[#252526] border border-[#464647] rounded px-3 py-1.5 shadow-lg whitespace-nowrap">
                      <div className="text-sm text-white font-medium">{item.label}</div>
                      <div className="text-xs text-[#969696]">{item.shortcut}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
      
      <div className="mt-auto">
        <motion.button 
          className="w-12 h-12 flex items-center justify-center rounded text-[#858585] hover:text-white relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveredItem('settings')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FiSettings className="w-6 h-6" />
          
          {/* Settings Tooltip */}
          <AnimatePresence>
            {hoveredItem === 'settings' && (
              <motion.div
                className="absolute left-14 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: vsCodeTheme.animation.fast }}
              >
                <div className="bg-[#252526] border border-[#464647] rounded px-3 py-1.5 shadow-lg whitespace-nowrap">
                  <div className="text-sm text-white font-medium">Manage</div>
                  <div className="text-xs text-[#969696]">Ctrl+,</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}

// File Explorer Component with Enhanced Interactions
export function FileExplorer({ project, onFileOpen }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [hoveredFile, setHoveredFile] = useState(null)

  const handleFileClick = (file) => {
    setSelectedFile(file.name)
    onFileOpen(file.name)
  }

  const handleRightClick = (e, file) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      file: file
    })
  }

  const handleContextMenuAction = (action, file) => {
    switch (action) {
      case 'open':
        onFileOpen(file.name)
        break
      case 'copy-path':
        navigator.clipboard.writeText(file.name)
        break
      case 'download':
        // Simulate file download
        const element = document.createElement('a')
        const fileContent = new Blob([file.content || ''], { type: 'text/plain' })
        element.href = URL.createObjectURL(fileContent)
        element.download = file.name
        element.click()
        break
    }
    setContextMenu(null)
  }

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null)
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu])

  const getFileIcon = (file) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'py': return '🐍'
      case 'js': case 'jsx': return '📜'
      case 'md': return '📝'
      case 'txt': return '📄'
      case 'json': return '🔧'
      default: return '📄'
    }
  }

  return (
    <div className="p-2 relative">
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-2 px-2 flex items-center justify-between">
        <span>{project.name}</span>
        <div className="flex items-center gap-1">
          <button 
            className="p-1 rounded hover:bg-[#3c3c3c] text-[#cccccc]"
            title="New File"
          >
            <span className="text-xs">+</span>
          </button>
          <button 
            className="p-1 rounded hover:bg-[#3c3c3c] text-[#cccccc]"
            title="Refresh"
          >
            <span className="text-xs">⟳</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        {project.files.map((file) => (
          <div
            key={file.name}
            className={`
              flex items-center gap-2 px-2 py-1 rounded text-sm cursor-pointer
              transition-colors duration-150 select-none
              ${selectedFile === file.name
                ? 'bg-[#094771] text-white'
                : hoveredFile === file.name
                ? 'bg-[#2a2d2e] text-[#cccccc]'
                : 'text-[#cccccc] hover:bg-[#2a2d2e]'
              }
            `}
            onClick={() => handleFileClick(file)}
            onContextMenu={(e) => handleRightClick(e, file)}
            onMouseEnter={() => setHoveredFile(file.name)}
            onMouseLeave={() => setHoveredFile(null)}
            title={`${file.name} • Click to open, right-click for more options`}
          >
            <span className="text-base">{getFileIcon(file)}</span>
            <span className="flex-1 truncate">{file.name}</span>
            {selectedFile === file.name && (
              <span className="text-xs text-[#007acc]">●</span>
            )}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-[#252526] border border-[#464647] rounded shadow-lg py-1 min-w-[160px]"
          style={{ 
            left: contextMenu.x, 
            top: contextMenu.y,
            transform: 'translateY(-10px)'
          }}
        >
          <button
            onClick={() => handleContextMenuAction('open', contextMenu.file)}
            className="w-full px-3 py-1 text-left text-sm text-[#cccccc] hover:bg-[#094771] flex items-center gap-2"
          >
            <span>📂</span> Open
          </button>
          <button
            onClick={() => handleContextMenuAction('copy-path', contextMenu.file)}
            className="w-full px-3 py-1 text-left text-sm text-[#cccccc] hover:bg-[#094771] flex items-center gap-2"
          >
            <span>📋</span> Copy Path
          </button>
          <button
            onClick={() => handleContextMenuAction('download', contextMenu.file)}
            className="w-full px-3 py-1 text-left text-sm text-[#cccccc] hover:bg-[#094771] flex items-center gap-2"
          >
            <span>⬇️</span> Download
          </button>
          <hr className="border-[#464647] my-1" />
          <div className="px-3 py-1 text-xs text-[#969696]">
            {contextMenu.file.language} • {contextMenu.file.content?.length || 0} chars
          </div>
        </div>
      )}
    </div>
  )
}

// Editor Tabs Component  
// Editor Tabs Component with Animations
export function EditorTabs({ openFiles, activeFile, onFileSwitch, onFileClose }) {
  if (openFiles.length === 0) return null

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'py': return '🐍'
      case 'js': case 'jsx': return '📜'
      case 'md': return '📝'
      case 'txt': return '📄'
      case 'json': return '🔧'
      default: return '📄'
    }
  }

  return (
    <div className="flex bg-[#252526] border-b border-[#2d2d30] overflow-x-auto">
      <AnimatePresence mode="popLayout">
        {openFiles.map((fileName) => {
          const isActive = fileName === activeFile
          
          return (
            <motion.div
              key={fileName}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ 
                duration: vsCodeTheme.animation.normal,
                layout: { duration: vsCodeTheme.animation.fast }
              }}
              className={`
                flex items-center gap-2 px-3 py-2 text-sm border-r border-[#2d2d30] cursor-pointer
                group min-w-0 max-w-48 relative
                ${isActive 
                  ? 'bg-[#1e1e1e] text-[#ffffff]' 
                  : 'bg-[#2d2d30] text-[#969696] hover:bg-[#1e1e1e] hover:text-[#cccccc]'
                }
              `}
              onClick={() => onFileSwitch(fileName)}
            >
              {/* Active tab indicator */}
              {isActive && (
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-0.5 bg-[#007acc]"
                  layoutId="activeTabIndicator"
                  transition={{ duration: vsCodeTheme.animation.fast }}
                />
              )}
              
              <span className="text-sm">{getFileIcon(fileName)}</span>
              <span className="truncate">{fileName}</span>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onFileClose(fileName)
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-[#525253] rounded p-0.5 ml-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-3 h-3" />
              </motion.button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Breadcrumb Navigation Component
export function Breadcrumbs({ projectName, fileName, onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(null)
  
  const breadcrumbItems = [
    { id: 'project', label: projectName || 'portfolio', icon: '📁' },
    { id: 'folder', label: 'src', icon: '📂' },
    { id: 'file', label: fileName || 'Welcome', icon: getFileIconForBreadcrumb(fileName) }
  ]
  
  function getFileIconForBreadcrumb(name) {
    if (!name) return '📄'
    const ext = name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'py': return '🐍'
      case 'js': case 'jsx': return '📜'
      case 'md': return '📝'
      case 'txt': return '📄'
      case 'json': return '🔧'
      default: return '📄'
    }
  }
  
  return (
    <div className="flex items-center gap-1 px-4 py-1 bg-[#1e1e1e] border-b border-[#2d2d30] text-sm">
      {breadcrumbItems.map((item, index) => (
        <div key={item.id} className="flex items-center">
          {index > 0 && (
            <FiChevronRight className="w-4 h-4 text-[#858585] mx-1" />
          )}
          <motion.button
            className="flex items-center gap-1 px-1 py-0.5 rounded text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            <FiChevronDown className="w-3 h-3 text-[#858585]" />
          </motion.button>
        </div>
      ))}
    </div>
  )
}

// Minimap Component
export function Minimap({ content, currentLine, totalLines, onLineClick }) {
  const minimapLines = content ? content.split('\n') : []
  const lineHeight = 2 // Each line is 2px in minimap
  const maxVisibleLines = 100
  const viewportHeight = 60 // visible viewport indicator height
  
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const lineNumber = Math.floor(clickY / lineHeight)
    if (onLineClick) onLineClick(lineNumber)
  }
  
  return (
    <div 
      className="w-20 bg-[#1e1e1e] border-l border-[#2d2d30] relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Current viewport indicator */}
      <motion.div 
        className="absolute left-0 right-0 bg-[#4a4a4a] opacity-30 pointer-events-none"
        style={{ 
          height: viewportHeight,
          top: Math.min((currentLine / totalLines) * 100, 100 - viewportHeight) + '%'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Minimap content */}
      <div className="p-1">
        {minimapLines.slice(0, maxVisibleLines).map((line, index) => {
          const lineWidth = Math.min(line.length * 0.5, 60)
          const lineColor = getMinimapLineColor(line)
          
          return (
            <div
              key={index}
              className="h-[2px] my-[1px] rounded-sm"
              style={{ 
                width: `${lineWidth}px`,
                backgroundColor: lineColor,
                opacity: 0.7
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

function getMinimapLineColor(line) {
  const trimmed = line.trim()
  if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
    return vsCodeTheme.syntax.comment
  }
  if (trimmed.startsWith('def ') || trimmed.startsWith('class ') || trimmed.startsWith('function ')) {
    return vsCodeTheme.syntax.keyword
  }
  if (trimmed.includes('"') || trimmed.includes("'") || trimmed.includes('`')) {
    return vsCodeTheme.syntax.string
  }
  if (trimmed.startsWith('import ') || trimmed.startsWith('from ') || trimmed.startsWith('export ')) {
    return vsCodeTheme.syntax.import
  }
  return '#4a4a4a'
}

// Code Editor Component
export function CodeEditor({ content, fileName }) {
  const lines = content ? content.split('\n') : ['# Welcome to VS Code Portfolio']
  const fileLanguage = getFileLanguage(fileName)
  
  // Enhanced syntax highlighting function with language-specific rules
  const highlightSyntax = (code, language) => {
    if (!code) return [];

    const tokenize = (text, lang) => {
      switch (lang) {
        case 'python':
          return tokenizePython(text);
        case 'javascript':
          return tokenizeJavaScript(text);
        case 'markdown':
          return tokenizeMarkdown(text);
        case 'text':
          return [{ type: 'text', value: text }];
        default:
          return [{ type: 'text', value: text }];
      }
    };
    
    const tokenizePython = (text) => {
      const tokens = [];
      
      // Python patterns
      const patterns = [
        { regex: /#.*$/g, type: 'comment' },
        { regex: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, type: 'string' },
        { regex: /@\w+/g, type: 'decorator' },
        { regex: /\b(def|class|import|from|if|else|elif|for|while|try|except|finally|return|yield|with|as|pass|break|continue|and|or|not|in|is|None|True|False|async|await)\b/g, type: 'keyword' },
        { regex: /\b\d+\.?\d*\b/g, type: 'number' },
        { regex: /\b(\w+)\s*(?=\()/g, type: 'function' }
      ];
      
      return applyPatterns(text, patterns);
    };
    
    const tokenizeJavaScript = (text) => {
      const patterns = [
        { regex: /(\/\*[\s\S]*?\*\/|\/\/.*$)/g, type: 'comment' },
        { regex: /(\/\*[\s\S]*?\*\/|\/\/.*$|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, type: 'string' },
        { regex: /\b(const|let|var|function|class|import|export|from|if|else|for|while|do|switch|case|default|try|catch|finally|return|break|continue|async|await|typeof|instanceof|new|this|super)\b/g, type: 'keyword' },
        { regex: /\b\d+\.?\d*\b/g, type: 'number' },
        { regex: /\b(\w+)\s*(?=\()/g, type: 'function' }
      ];
      
      return applyPatterns(text, patterns);
    };
    
    const tokenizeMarkdown = (text) => {
      if (text.match(/^#{1,6}\s+/)) {
        return [{ type: 'header', value: text }];
      }
      if (text.match(/^\s*[-*+]\s+/)) {
        return [{ type: 'list', value: text }];
      }
      if (text.match(/^```/)) {
        return [{ type: 'codeblock', value: text }];
      }
      if (text.match(/^\*\*.*\*\*$/)) {
        return [{ type: 'bold', value: text }];
      }
      
      return [{ type: 'text', value: text }];
    };
    
    const applyPatterns = (text, patterns) => {
      const allMatches = [];
      
      patterns.forEach(pattern => {
        let match;
        pattern.regex.lastIndex = 0;
        while ((match = pattern.regex.exec(text)) !== null) {
          allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            value: match[0],
            type: pattern.type
          });
        }
      });
      
      // Sort by position and remove overlaps
      allMatches.sort((a, b) => a.start - b.start);
      
      const tokens = [];
      let currentPos = 0;
      
      allMatches.forEach(match => {
        if (match.start >= currentPos) {
          // Add text before match
          if (match.start > currentPos) {
            tokens.push({ type: 'text', value: text.slice(currentPos, match.start) });
          }
          // Add match
          tokens.push({ type: match.type, value: match.value });
          currentPos = match.end;
        }
      });
      
      // Add remaining text
      if (currentPos < text.length) {
        tokens.push({ type: 'text', value: text.slice(currentPos) });
      }
      
      return tokens.length ? tokens : [{ type: 'text', value: text }];
    };
    
    return tokenize(code, language);
  };
  
  const getTokenClassName = (type) => {
    switch (type) {
      case 'keyword': return 'text-[#569cd6]'; // Blue
      case 'string': return 'text-[#ce9178]'; // Orange
      case 'comment': return 'text-[#6a9955]'; // Green
      case 'number': return 'text-[#b5cea8]'; // Light green
      case 'function': return 'text-[#dcdcaa]'; // Yellow
      case 'decorator': return 'text-[#569cd6]'; // Blue
      case 'header': return 'text-[#569cd6] font-bold'; // Blue bold
      case 'list': return 'text-[#d4d4d4]'; // Light gray
      case 'codeblock': return 'text-[#6a9955]'; // Green
      case 'bold': return 'text-[#d4d4d4] font-bold'; // Bold white
      case 'text':
      default: 
        return 'text-[#d4d4d4]'; // Default light gray
    }
  };
  
  const getFileLanguage = (filename) => {
    if (!filename) return 'text';
    const ext = filename.split('.').pop()?.toLowerCase();
    
    const languageMap = {
      'py': 'python',
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'javascript',
      'tsx': 'javascript',
      'md': 'markdown',
      'txt': 'text',
      'json': 'javascript',
      'yaml': 'text',
      'yml': 'text'
    };
    
    return languageMap[ext] || 'text';
  };
  
  return (
    <div className="flex-1 bg-[#1e1e1e] overflow-auto font-mono text-sm">
      <div className="flex">
        {/* Line Numbers */}
        <div className="bg-[#1e1e1e] text-[#858585] text-right px-2 py-4 select-none border-r border-[#2d2d30]">
          {lines.map((_, index) => (
            <div key={index} className="leading-6 h-6 hover:bg-[#2d2d30]">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Code Content */}
        <div className="flex-1 p-4 whitespace-pre-wrap">
          {lines.map((line, index) => {
            const tokens = highlightSyntax(line, fileLanguage);
            return (
              <div key={index} className="leading-6 h-6 hover:bg-[#2d2d30]">
                {tokens.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={getTokenClassName(token.type)}>
                    {token.value}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

// Terminal Panel Component with Interactive Commands
export function TerminalPanel({ activeProject, onTerminalToggle, onContactModalOpen, setActiveProject, openFile }) {
  const [history, setHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  const commands = {
    'npm start': () => {
      return [
        '> playground-windows@0.0.1 start',
        '> vite',
        '',
        '  VITE v5.4.21  ready in 234 ms',
        '',
        '  ➜  Local:   http://localhost:5173/',
        '  ➜  Network: use --host to expose',
        '  ➜  press h + enter to show help',
        '',
        '✅ Portfolio development server started successfully!',
        '🚀 Open http://localhost:5173/ in your browser'
      ]
    },
    'git status': () => {
      return [
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        '',
        'Changes not staged for commit:',
        '  (use "git add <file>..." to update what will be committed)',
        '  (use "git restore <file>..." to discard changes in working directory)',
        '        modified:   src/components/apps/VSCode.jsx',
        '        modified:   src/config/projects.js',
        '',
        'Untracked files:',
        '  (use "git add <file>..." to include in what will be committed)',
        '        VSCODE_UI_ENHANCEMENT_PLAN.md',
        '',
        'no changes added to commit (use "git add ." or "git commit -a")'
      ]
    },
    'python main.py': () => {
      if (activeProject === 'linkedin-automator') {
        return [
          'Starting LinkedIn Automator v2.0...',
          '🤖 Initializing AI automation engine...',
          '🔧 Loading Chrome WebDriver...',
          '✅ GUI initialized successfully',
          '🚀 Ready to automate LinkedIn interactions',
          '',
          'GUI window opened. Use the interface to:',
          '- Configure automation settings',
          '- Set target profiles and keywords', 
          '- Monitor automation progress',
          '- View detailed analytics',
          '',
          'Press Ctrl+C to stop the application'
        ]
      } else if (activeProject === 'road-rage-detection') {
        return [
          'Road Rage Detection System v2.0',
          '🚗 Loading 3D CNN model...',
          '🧠 Model loaded: road_rage_model_best.h5',
          '📹 Initializing video processing pipeline...',
          '✅ System ready for real-time detection',
          '',
          'Monitoring capabilities:',
          '- Real-time aggressive behavior detection',
          '- Multi-class classification (4 behavior types)',
          '- 94.2% accuracy on test dataset',
          '- <50ms inference time per frame sequence',
          '',
          'Starting real-time detection... Press \'q\' to quit'
        ]
      } else {
        return [
          'FastAPI HackRx Query System',
          '🔍 Initializing document processing engine...',
          '📚 Loading FAISS vector index...',
          '🤖 Connecting to Gemini AI...',
          '✅ Server ready on http://localhost:8000',
          '',
          'API endpoints available:',
          '- POST /query - Process natural language queries',
          '- GET /health - Health check',
          '- GET /docs - API documentation',
          '',
          'Query processing ready with 94.2% accuracy!'
        ]
      }
    },
    'projects': () => {
      const projectNames = Object.keys(projects)
      return [
        '🚀 Portfolio Projects Overview',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        ...projectNames.map((key, index) => {
          const project = projects[key]
          return [
            `${index + 1}. ${project.name}`,
            `   ${project.description}`,
            `   Language: ${project.language.toUpperCase()}`,
            `   Files: ${project.files.length} files`,
            ''
          ]
        }).flat(),
        'Use "code <project-name>" to explore project files',
        'Example: code linkedin-automator'
      ]
    },
    'skills': () => {
      return [
        '🛠️ Technical Skills Tree',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🌐 Frontend Development',
        '   ├── React.js ████████████████████ 95%',
        '   ├── JavaScript ██████████████████ 90%',
        '   ├── TypeScript ████████████████ 85%',
        '   ├── HTML/CSS ████████████████████ 95%',
        '   └── Tailwind CSS ██████████████████ 90%',
        '',
        '⚙️ Backend Development', 
        '   ├── Node.js ████████████████ 85%',
        '   ├── Python ████████████████████ 95%',
        '   ├── FastAPI ██████████████ 80%',
        '   └── Express.js ████████████████ 85%',
        '',
        '🤖 AI/ML & Data Science',
        '   ├── TensorFlow ██████████████ 80%',
        '   ├── OpenCV ████████████████ 85%',
        '   ├── FAISS ████████████ 75%',
        '   └── Pandas ██████████████ 80%',
        '',
        '🔧 Tools & Technologies',
        '   ├── Git ████████████████████ 95%',
        '   ├── Docker ██████████████ 80%',
        '   ├── Vite ████████████████ 85%',
        '   └── VS Code ████████████████████ 95%'
      ]
    },
    'help': () => {
      return [
        '💡 Available Commands',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🚀 Development Commands:',
        '   npm start        - Start development server',
        '   python main.py   - Run the active project',
        '   git status       - Check repository status',
        '',
        '👤 Portfolio Commands:',
        '   contact          - Show contact information',
        '   resume           - Download PDF resume',
        '   projects         - List all portfolio projects',
        '   skills           - Display technical skills tree',
        '   source           - View this portfolio\'s source code',
        '',
        '💼 Recruiter Commands:',
        '   hire             - Ready to join your team!',
        '   interview        - Technical interview insights',
        '   offer            - Collaboration possibilities',
        '',
        '📁 File Commands:',
        '   ls               - List current directory',
        '   code <project>   - Open project in editor',
        '   clear            - Clear terminal history',
        '',
        '❓ System Commands:',
        '   help             - Show this help message',
        '   exit             - Close terminal panel'
      ]
    },
    'ls': () => {
      const currentProject = projects[activeProject]
      if (currentProject) {
        return [
          `📁 Contents of ${activeProject}:`,
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          ...currentProject.files.map(file => 
            `${file.icon} ${file.name} ${file.type === 'file' ? `(${file.language})` : ''}`
          ),
          '',
          `Total: ${currentProject.files.length} files`
        ]
      } else {
        return ['No project directory found']
      }
    },
    'clear': () => {
      setHistory([])
      return []
    },
    'exit': () => {
      onTerminalToggle(false)
      return ['Terminal session ended.']
    },
    
    // Recruiter-focused commands
    'hire': () => {
      return [
        '🎯 Ready to Join Your Team!',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '👨‍💻 Tanveer Ahmed - Senior Full-Stack Developer',
        '',
        '🚀 What I Bring to Your Team:',
        '   • Immediate impact with modern tech stack expertise',
        '   • 15+ production applications serving 50k+ users',
        '   • AI/ML integration for next-generation features',
        '   • Mentorship experience (guided 15+ developers)',
        '   • 95% issue resolution rate within 24 hours',
        '',
        '💼 Ideal Roles:',
        '   • Senior Software Engineer / Tech Lead',
        '   • Full-Stack Developer (React + Python/Node.js)',
        '   • AI/ML Engineering positions',
        '   • Remote or hybrid opportunities',
        '',
        '⚡ Quick Start Timeline:',
        '   • Available: 2-4 weeks notice',
        '   • Onboarding: Ready for immediate contributions',
        '   • First 30 days: Deploy meaningful features',
        '',
        '📧 Let\'s discuss your next big project!',
        'Email: tanveer.professional@gmail.com',
        '',
        'Type "interview" to explore my technical expertise →'
      ]
    },
    
    'interview': () => {
      return [
        '🎤 Technical Interview Ready!',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🧠 Technical Deep Dive:',
        '',
        '🎯 System Design Experience:',
        '   • Microservices architecture with 99.9% uptime',
        '   • Scalable databases handling 1M+ records',
        '   • Redis caching reducing response time by 70%',
        '   • Real-time features with WebSockets & SSE',
        '',
        '⚡ Performance Optimization:',
        '   • React: Code splitting, lazy loading, memoization',
        '   • Backend: Database query optimization, connection pooling',
        '   • Frontend: Bundle size reduced by 60%+',
        '   • API response times: <200ms average',
        '',
        '🤖 AI/ML Integration:',
        '   • Document processing with FAISS vector search',
        '   • Computer vision for behavior detection (94% accuracy)',
        '   • OpenAI API integration for intelligent automation',
        '   • Real-time inference pipelines (<50ms)',
        '',
        '🔧 Problem-Solving Approach:',
        '   1. Break complex problems into manageable chunks',
        '   2. Research best practices and existing solutions',
        '   3. Implement with testing and monitoring',
        '   4. Iterate based on performance metrics',
        '',
        '🏆 Recent Challenge Solved:',
        '   Built HackRx document query system processing 1000+ docs/minute',
        '   with semantic search and natural language responses.',
        '',
        'Type "offer" to see collaboration possibilities →'
      ]
    },
    
    'offer': () => {
      return [
        '🤝 Let\'s Build Something Amazing Together!',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '💡 What We Could Build:',
        '',
        '🚀 High-Impact Projects:',
        '   • Next-gen web applications with AI integration',
        '   • Scalable microservices architecture',
        '   • Performance-critical real-time systems',
        '   • Data visualization and analytics platforms',
        '',
        '🎯 My Commitment to Your Team:',
        '   ✅ Clean, maintainable, well-documented code',
        '   ✅ Proactive communication and regular updates',
        '   ✅ Mentorship and knowledge sharing',
        '   ✅ 60+ hour/week during critical sprints if needed',
        '   ✅ Continuous learning and adaptation',
        '',
        '🔬 Technical Leadership:',
        '   • Code review standards and best practices',
        '   • Architecture decisions and documentation',
        '   • Performance monitoring and optimization',
        '   • Team development and skill growth',
        '',
        '📈 Expected Outcomes (First 90 Days):',
        '   Week 1-2: Environment setup, codebase understanding',
        '   Week 3-6: First major feature deployments',
        '   Week 7-12: Performance improvements & optimizations',
        '   Month 3+: Leading technical initiatives',
        '',
        '💬 Ready to Discuss Terms:',
        '   • Salary expectations: Competitive market rate',
        '   • Work style: Collaborative, transparent, results-driven',
        '   • Growth: Open to technical leadership opportunities',
        '',
        'Type "contact" for direct communication channels →'
      ]
    },
    
    'contact': () => {
      // Trigger contact modal
      if (onContactModalOpen) {
        setTimeout(() => onContactModalOpen(), 100) // Small delay for better UX
      }
      
      return [
        '📞 Opening Contact Modal...',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '✅ Contact modal opened with interactive features!',
        '',
        '💡 Features available in the modal:',
        '   • Direct email link (opens your email client)',
        '   • LinkedIn profile access',
        '   • GitHub repositories',
        '   • Copy-to-clipboard functionality',
        '   • Professional quick stats',
        '',
        '📧 Backup contact info:',
        '   Email: tanveer.professional@gmail.com',
        '   LinkedIn: linkedin.com/in/tanveer744',
        '   GitHub: github.com/tanveer744',
        '',
        'Looking forward to connecting with you! 🚀'
      ]
    },
    
    'resume': () => {
      return [
        '📄 Professional Resume Highlights',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🏢 Experience Summary:',
        '   • Senior Software Engineer (Current)',
        '   • 3+ years professional development experience',
        '   • 15+ production applications deployed',
        '   • 50,000+ users served across projects',
        '',
        '🎓 Education & Certifications:',
        '   • Computer Science Engineering (B.Tech)',
        '   • AWS Certified Solutions Architect',
        '   • Google Cloud Professional Developer',
        '   • Advanced React Patterns Certified',
        '',
        '🏆 Key Achievements:',
        '   • HackRx 2024 Winner (AI/ML Track)',
        '   • 500+ GitHub contributions (open source)',
        '   • 25+ technical blog posts published',
        '   • Mentored 15+ junior developers',
        '',
        '⚡ Technical Expertise:',
        '   Frontend: React, TypeScript, Next.js, Tailwind CSS',
        '   Backend: Node.js, Python, FastAPI, PostgreSQL',
        '   AI/ML: TensorFlow, OpenAI APIs, Computer Vision',
        '   Cloud: AWS, Docker, Kubernetes, CI/CD',
        '',
        '📊 Performance Metrics:',
        '   • 60% average performance improvement on projects',
        '   • 95% issue resolution within 24 hours',
        '   • 94%+ accuracy on AI/ML model implementations',
        '   • <200ms API response times consistently achieved',
        '',
        '📧 Full resume available on request via email!',
        'tanveer.professional@gmail.com'
      ]
    },
    
    'source': () => {
      // Switch to portfolio source code project
      setActiveProject('portfolio-source')
      openFile('README.md')
      
      return [
        '💻 Switching to Portfolio Source Code...',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🎯 NOW VIEWING: This website\'s actual source code!',
        '',
        '📁 Project: Windows 11 Portfolio Website',
        '🛠️ Tech Stack: React + Vite + Tailwind CSS + Framer Motion',
        '📏 Size: 3000+ lines of professional code',
        '🎨 Features: 25+ interactive components',
        '',
        '📂 Available files to explore:',
        '   • VSCode.jsx - This VS Code replica (3000+ lines)',
        '   • Desktop.jsx - Windows 11 desktop component',
        '   • package.json - Project dependencies',
        '   • vite.config.js - Build optimization setup',
        '   • README.md - Full project documentation',
        '   • stores/index.js - State management',
        '',
        '💡 Pro Tips:',
        '   • Use Ctrl+Shift+V for split-view preview',
        '   • Click on files in the explorer to view them',
        '   • Check the README.md for full architecture details',
        '',
        '🚀 This is the actual code powering this portfolio!',
        'Feel free to explore and see how everything works.'
      ]
    }
  }

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim()
    
    // Add to command history
    if (trimmedCmd && !commandHistory.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, trimmedCmd])
    }
    
    // Add command to history
    const newHistory = [
      ...history,
      {
        type: 'command',
        content: `PS C:\\portfolio\\${activeProject}> ${trimmedCmd}`,
        timestamp: Date.now()
      }
    ]
    
    // Execute command
    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]()
      if (output.length > 0) {
        newHistory.push({
          type: 'output',
          content: output,
          timestamp: Date.now()
        })
      }
    } else if (trimmedCmd.startsWith('code ')) {
      const projectName = trimmedCmd.substring(5)
      if (projects[projectName]) {
        newHistory.push({
          type: 'output',
          content: [`Opening ${projectName} in editor...`],
          timestamp: Date.now()
        })
        // You could trigger file opening here if needed
      } else {
        newHistory.push({
          type: 'output',
          content: [`Project '${projectName}' not found. Available projects:`, ...Object.keys(projects)],
          timestamp: Date.now()
        })
      }
    } else if (trimmedCmd) {
      newHistory.push({
        type: 'output',
        content: [`Command '${trimmedCmd}' not found. Type 'help' for available commands.`],
        timestamp: Date.now()
      })
    }
    
    setHistory(newHistory)
    setCurrentCommand('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    }
  }

  return (
    <div className="h-48 bg-[#1e1e1e] border-t border-[#2d2d30] flex flex-col">
      {/* Terminal Header */}
      <div className="bg-[#2d2d30] px-4 py-2 flex items-center justify-between text-sm">
        <span className="text-[#cccccc]">🖥️ Terminal</span>
        <button 
          onClick={() => onTerminalToggle(false)}
          className="text-[#cccccc] hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {/* Welcome message */}
        {history.length === 0 && (
          <div className="text-[#6a9955] mb-2">
            🚀 Portfolio Terminal v1.0 - Type 'help' for available commands
          </div>
        )}
        
        {/* Command history */}
        {history.map((entry, index) => (
          <div key={index} className="mb-1">
            {entry.type === 'command' ? (
              <div className="text-[#569cd6]">{entry.content}</div>
            ) : (
              <div className="text-[#d4d4d4] ml-4">
                {Array.isArray(entry.content) ? (
                  entry.content.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))
                ) : (
                  <div>{entry.content}</div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {/* Current command line */}
        <div className="flex items-center">
          <span className="text-[#569cd6]">PS C:\portfolio\{activeProject}&gt;</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-2 flex-1 bg-transparent text-[#d4d4d4] outline-none"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

// Command Palette Component
export function CommandPalette({ onClose, onFileOpen, onProjectSwitch, projects, currentProject }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredItems, setFilteredItems] = useState([])

  // Command palette items
  const commands = [
    { type: 'command', title: '> Toggle Terminal', action: 'terminal.toggle', description: 'Show/hide terminal panel' },
    { type: 'command', title: '> Toggle Explorer', action: 'explorer.toggle', description: 'Show/hide file explorer' },
    { type: 'command', title: '> Open Settings', action: 'workbench.action.openSettings', description: 'Open VS Code settings' },
    { type: 'command', title: '> New File', action: 'workbench.action.files.newFile', description: 'Create a new file' },
    { type: 'command', title: '> View Portfolio', action: 'portfolio.view', description: 'Open portfolio overview' },
    { type: 'command', title: '> Download Resume', action: 'portfolio.resume', description: 'Download PDF resume' },
    { type: 'command', title: '> Contact Information', action: 'portfolio.contact', description: 'Show contact details' }
  ]

  // File items
  const fileItems = []
  if (currentProject) {
    currentProject.files.forEach(file => {
      fileItems.push({
        type: 'file',
        title: file.name,
        description: `${currentProject.name} • ${file.language}`,
        file: file,
        action: 'file.open'
      })
    })
  }

  // Project items
  const projectItems = Object.keys(projects).map(key => ({
    type: 'project',
    title: projects[key].name,
    description: `Switch to ${projects[key].name} project`,
    project: key,
    action: 'project.switch'
  }))

  // Filter items based on query
  useEffect(() => {
    let items = []
    
    if (query.startsWith('>')) {
      // Show commands
      const searchTerm = query.slice(1).toLowerCase()
      items = commands.filter(cmd => 
        cmd.title.toLowerCase().includes(searchTerm) || 
        cmd.description.toLowerCase().includes(searchTerm)
      )
    } else if (query.startsWith('@')) {
      // Show projects  
      const searchTerm = query.slice(1).toLowerCase()
      items = projectItems.filter(proj =>
        proj.title.toLowerCase().includes(searchTerm)
      )
    } else {
      // Show files and commands
      const searchTerm = query.toLowerCase()
      items = [
        ...fileItems.filter(file => file.title.toLowerCase().includes(searchTerm)),
        ...commands.filter(cmd => cmd.title.toLowerCase().includes(searchTerm)),
        ...projectItems.filter(proj => proj.title.toLowerCase().includes(searchTerm))
      ]
    }
    
    setFilteredItems(items.slice(0, 10)) // Limit to 10 items
    setSelectedIndex(0)
  }, [query, currentProject])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleItemSelect(filteredItems[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleItemSelect = (item) => {
    switch (item.action) {
      case 'file.open':
        onFileOpen(item.file.name)
        break
      case 'project.switch':
        onProjectSwitch(item.project)
        break
      case 'terminal.toggle':
        // Terminal toggle would be handled by parent
        break
      case 'portfolio.resume':
        // Trigger resume download
        const link = document.createElement('a')
        link.href = '/resume/resume.pdf'
        link.download = 'Developer-Resume.pdf'
        link.click()
        break
      case 'portfolio.contact':
        // Could open contact modal or show in terminal
        break
      default:
        console.log('Command not implemented:', item.action)
    }
    onClose()
  }

  const getItemIcon = (type) => {
    switch (type) {
      case 'file': return '📄'
      case 'command': return '⚡'
      case 'project': return '📁'
      default: return '•'
    }
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-[#2d2d30] border border-[#464647] rounded-lg shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="border-b border-[#464647] p-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type '>' for commands, '@' for projects, or search files..."
            className="w-full bg-transparent text-[#cccccc] outline-none text-lg"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-[#969696] text-center">
              {query ? 'No results found' : 'Start typing to search files, commands, and projects'}
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 cursor-pointer border-l-2 ${
                  index === selectedIndex 
                    ? 'bg-[#094771] border-[#007acc] text-white' 
                    : 'border-transparent text-[#cccccc] hover:bg-[#3c3c3c]'
                }`}
                onClick={() => handleItemSelect(item)}
              >
                <span className="text-lg">{getItemIcon(item.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.title}</div>
                  <div className="text-sm text-[#969696] truncate">{item.description}</div>
                </div>
                {item.type === 'command' && (
                  <div className="text-xs text-[#969696] bg-[#464647] px-2 py-1 rounded">
                    Ctrl+Shift+P
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#464647] p-2 text-xs text-[#969696] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
          <div>
            {filteredItems.length} results
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatusBar({ activeFile, terminalVisible, onTerminalToggle }) {
  const portfolioMetadata = {
    lastUpdated: 'Dec 2024',
    buildStatus: 'passing',
    visitors: '2.4k',
    projects: '15+',
    commits: '500+',
    uptime: '99.9%'
  }

  return (
    <div className="h-6 bg-[#007acc] text-white text-xs flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <span>🌿 main</span>
        <span>↕ 0 ↔ 0</span>
        {activeFile && <span>📄 {activeFile}</span>}
        <span className="text-[#b3d9ff]">Build: {portfolioMetadata.buildStatus} ✅</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span>👥 {portfolioMetadata.visitors} visitors</span>
        <span>📊 {portfolioMetadata.projects} projects</span>
        <span>🔄 {portfolioMetadata.commits} commits</span>
        <span>Updated: {portfolioMetadata.lastUpdated}</span>
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <button 
          onClick={onTerminalToggle}
          className="hover:bg-[#005a9e] px-1 rounded transition-colors duration-150"
        >
          {terminalVisible ? '🔼' : '🔽'} Terminal
        </button>
      </div>
    </div>
  )
}

// Preview Panel Component for Split View
export function PreviewPanel({ file, project, onClose }) {
  const [previewContent, setPreviewContent] = useState('')

  // Generate preview content based on file type
  useEffect(() => {
    if (!file) return

    const generatePreview = () => {
      switch (file.language) {
        case 'markdown':
          // For markdown files, render as HTML preview
          return generateMarkdownPreview(file.content)
        case 'json':
          // For JSON files, show formatted JSON with syntax highlighting
          return generateJsonPreview(file.content)
        case 'python':
          // For Python files, show execution simulation
          return generatePythonPreview(file, project)
        default:
          // For other files, show formatted code preview
          return generateCodePreview(file.content, file.language)
      }
    }

    setPreviewContent(generatePreview())
  }, [file, project])

  const generateMarkdownPreview = (content) => {
    // Convert markdown to HTML-like preview
    return content
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^- (.*$)/gm, '• $1')
      .split('\n')
  }

  const generateJsonPreview = (content) => {
    try {
      const parsed = JSON.parse(content)
      return [
        '📋 JSON Structure Preview',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        `📊 Object Keys: ${Object.keys(parsed).length}`,
        `📈 Total Properties: ${JSON.stringify(parsed).length} characters`,
        '',
        '🔍 Top-level Structure:',
        ...Object.keys(parsed).slice(0, 10).map(key => 
          `  ${key}: ${typeof parsed[key]} ${Array.isArray(parsed[key]) ? `(${parsed[key].length} items)` : ''}`
        ),
        '',
        '📝 Formatted Preview:',
        ...JSON.stringify(parsed, null, 2).split('\n').slice(0, 20)
      ]
    } catch (e) {
      return ['❌ Invalid JSON format', '', content.split('\n').slice(0, 10)]
    }
  }

  const generatePythonPreview = (file, project) => {
    return [
      `🐍 ${file.name} - Python Module Preview`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      `📁 Project: ${project.name}`,
      `📄 File Type: Python Module`,
      `📏 Lines of Code: ${file.content.split('\n').length}`,
      '',
      '🎯 Key Features Detected:',
      ...analyzeCodeFeatures(file.content),
      '',
      '🚀 Execution Simulation:',
      '  $ python main.py',
      '  ✅ Module imported successfully',
      '  🔧 Setting up automation engine...',
      '  📊 GUI interface initialized',
      '  💡 Ready for user interaction',
      '',
      '📋 Module Summary:',
      '  • Professional-grade Python application',
      '  • Modern GUI with Tkinter',
      '  • Error handling and logging',
      '  • Production-ready architecture'
    ]
  }

  const analyzeCodeFeatures = (content) => {
    const features = []
    if (content.includes('import tkinter')) features.push('  ✓ GUI Interface (Tkinter)')
    if (content.includes('selenium')) features.push('  ✓ Web Automation (Selenium)')
    if (content.includes('class ')) features.push('  ✓ Object-Oriented Design')
    if (content.includes('async def')) features.push('  ✓ Async Programming')
    if (content.includes('fastapi')) features.push('  ✓ REST API (FastAPI)')
    if (content.includes('tensorflow')) features.push('  ✓ Machine Learning (TensorFlow)')
    if (content.includes('threading')) features.push('  ✓ Multi-threading')
    return features.length ? features : ['  • Standard Python features']
  }

  const generateCodePreview = (content, language) => {
    const lines = content.split('\n')
    return [
      `📄 Code Preview - ${language.toUpperCase()}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      `📊 File Statistics:`,
      `  Lines: ${lines.length}`,
      `  Characters: ${content.length}`,
      `  Language: ${language}`,
      '',
      '📝 Code Structure:',
      ...lines.slice(0, 15).map((line, i) => 
        `${String(i + 1).padStart(3, ' ')} | ${line}`
      ),
      lines.length > 15 ? `... ${lines.length - 15} more lines` : ''
    ].filter(Boolean)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="h-8 bg-[#252526] border-b border-[#2d2d30] flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <span className="text-[#569cd6]">👁️</span>
          <span className="text-sm text-[#cccccc]">
            Preview: {file?.name || 'No file selected'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="text-xs px-2 py-1 bg-[#094771] text-white rounded hover:bg-[#005a9e] transition-colors"
            title="Toggle preview (Ctrl+Shift+V)"
          >
            Split View
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-[#3c3c3c] rounded transition-colors"
            title="Close preview"
          >
            <FiX className="w-4 h-4 text-[#cccccc]" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e]">
        {file ? (
          <div className="space-y-1 font-mono text-sm text-[#d4d4d4]">
            {Array.isArray(previewContent) ? (
              previewContent.map((line, index) => (
                <div key={index} className="leading-6">
                  {line.startsWith('<h1>') ? (
                    <h1 className="text-xl font-bold text-[#569cd6] mb-2">
                      {line.replace(/<\/?h1>/g, '')}
                    </h1>
                  ) : line.startsWith('<h2>') ? (
                    <h2 className="text-lg font-semibold text-[#4ec9b0] mb-1">
                      {line.replace(/<\/?h2>/g, '')}
                    </h2>
                  ) : line.startsWith('<h3>') ? (
                    <h3 className="text-base font-medium text-[#dcdcaa] mb-1">
                      {line.replace(/<\/?h3>/g, '')}
                    </h3>
                  ) : line.includes('<strong>') ? (
                    <div dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/<strong>/g, '<span class="font-bold text-[#f0f0f0]">')
                        .replace(/<\/strong>/g, '</span>')
                        .replace(/<em>/g, '<span class="italic text-[#ce9178]">')
                        .replace(/<\/em>/g, '</span>')
                        .replace(/<code>/g, '<span class="bg-[#2d2d30] px-1 rounded text-[#d7ba7d]">')
                        .replace(/<\/code>/g, '</span>')
                    }} />
                  ) : line.startsWith('━') ? (
                    <div className="text-[#569cd6] my-2">{line}</div>
                  ) : line.startsWith('  ') ? (
                    <div className="text-[#9cdcfe] pl-4">{line}</div>
                  ) : (
                    <div className="text-[#d4d4d4]">{line}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-[#d4d4d4] whitespace-pre-wrap">{previewContent}</div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#969696]">
            <div className="text-center">
              <div className="text-4xl mb-4">👁️</div>
              <div className="text-lg">No Preview Available</div>
              <div className="text-sm mt-2">Select a file to see the preview</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main VS Code Component
export default function VSCode({ windowData }) {
  const {
    activeProject, openFiles, activeFile, sidebarPanel, terminalVisible,
    projects, openFile, closeFile, setActiveFile, setSidebarPanel,
    setTerminalVisible, setActiveProject
  } = useVSCodeState()
  
  const [commandPaletteVisible, setCommandPaletteVisible] = useState(false)
  const [contactModalVisible, setContactModalVisible] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)

  const currentProject = projects[activeProject]
  const currentFile = currentProject?.files.find(f => f.name === activeFile)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Shift+P - Command Palette
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setCommandPaletteVisible(true)
      }
      // Ctrl+` - Toggle Terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setTerminalVisible(!terminalVisible)
      }
      // Ctrl+Shift+V - Toggle Split Preview  
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault()
        setPreviewVisible(!previewVisible)
      }
      // Escape - Close overlays
      if (e.key === 'Escape') {
        setCommandPaletteVisible(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [terminalVisible, setTerminalVisible])

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-[#cccccc] relative">
      {/* Command Palette Overlay */}
      {commandPaletteVisible && (
        <CommandPalette 
          onClose={() => setCommandPaletteVisible(false)}
          onFileOpen={openFile}
          onProjectSwitch={() => {}}
          projects={projects}
          currentProject={currentProject}
        />
      )}
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Activity Bar */}
        <ActivityBar 
          activePanel={sidebarPanel}
          onPanelChange={setSidebarPanel}
        />
        
        {/* Sidebar with Animation */}
        <AnimatePresence>
          {sidebarPanel && (
            <motion.div 
              className="w-80 bg-[#252526] border-r border-[#2d2d30] overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: vsCodeTheme.animation.normal }}
            >
              {sidebarPanel === 'explorer' && (
                <FileExplorer
                  project={currentProject}
                  onFileOpen={openFile}
                />
              )}
              {sidebarPanel === 'search' && (
                <SearchPanel />
              )}
              {sidebarPanel === 'source-control' && (
                <SourceControlPanel />
              )}
              {sidebarPanel === 'extensions' && (
                <ExtensionsPanel />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onFileSwitch={setActiveFile}
            onFileClose={closeFile}
          />
          
          {/* Breadcrumb Navigation */}
          {activeFile && (
            <Breadcrumbs
              projectName={currentProject?.name}
              fileName={activeFile}
              onNavigate={(path) => console.log('Navigate to:', path)}
            />
          )}
          
          {/* Editor Area - Split View Support */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main Editor */}
            <div className={`${previewVisible ? 'w-1/2 border-r border-[#2d2d30]' : 'flex-1'} flex overflow-hidden`}>
              <CodeEditor
                content={currentFile?.content}
                fileName={activeFile}
                language={currentFile?.language}
              />
              
              {/* Minimap - only show when preview is hidden */}
              {!previewVisible && currentFile?.content && (
                <Minimap
                  content={currentFile.content}
                  currentLine={1}
                  totalLines={currentFile.content.split('\n').length}
                  onLineClick={(line) => console.log('Go to line:', line)}
                />
              )}
            </div>
            
            {/* Split Preview Panel */}
            <AnimatePresence>
              {previewVisible && (
                <motion.div
                  className="w-1/2 flex flex-col bg-[#1e1e1e]"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '50%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: vsCodeTheme.animation.normal }}
                >
                  <PreviewPanel
                    file={currentFile}
                    project={currentProject}
                    onClose={() => setPreviewVisible(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Terminal Panel */}
          <AnimatePresence>
            {terminalVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 192, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: vsCodeTheme.animation.normal }}
              >
                <TerminalPanel 
                  activeProject={activeProject}
                  onTerminalToggle={setTerminalVisible}
                  onContactModalOpen={() => setContactModalVisible(true)}
                  setActiveProject={setActiveProject}
                  openFile={openFile}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Status Bar */}
      <StatusBar
        activeFile={activeFile}
        terminalVisible={terminalVisible}
        onTerminalToggle={setTerminalVisible}
      />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
      />
    </div>
  )
}