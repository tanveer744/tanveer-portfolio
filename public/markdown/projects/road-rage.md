# 🚗 Road Rage Detection using Deep Learning and Computer Vision

**Duration:** Aug 2025 – Present

## Overview

Developed an AI-driven system that detects aggressive driving behaviors and road rage incidents in real-time video streams using deep learning and computer vision. The project leverages a custom 3D Convolutional Neural Network (3D CNN) architecture and transfer learning to analyze motion patterns across video frames.

## 🔍 Key Highlights

### Two-Stage Deep Learning Pipeline

**Phase 1: General Violence Detection**
- Trained a general violence detection model using 3D CNNs on the RWF-2000 dataset
- Achieved **98% accuracy** on violence recognition

**Phase 2: Domain-Specific Transfer Learning**
- Applied transfer learning and fine-tuning on a road rage dataset
- Reached **94% accuracy** for real-world driving videos

### Real-Time Inference System

- 30-frame sliding buffer for temporal sequence analysis
- Temporal smoothing to reduce false positives
- Threshold-based alerting for violent/aggressive motion
- Optimized for real-time video processing

### Advanced Preprocessing

- Integrated OpenCV for video preprocessing and frame extraction
- RGB normalization for consistent input data
- Frame resizing and standardization

## ⚙️ Technical Stack

### Languages & Frameworks
- **Python** - Core programming language
- **TensorFlow & Keras** - Deep learning framework
- **OpenCV** - Computer vision library
- **NumPy** - Numerical computing
- **scikit-learn** - Machine learning utilities

### Model Architecture
Custom 3D CNN with the following layers:
- Conv3D layers for spatial-temporal feature extraction
- BatchNormalization for training stability
- MaxPooling3D for dimensionality reduction
- Dense layers with Dropout (0.5)
- Sigmoid activation for binary classification

### Techniques Used

- **Transfer Learning** - Leveraging pre-trained features
- **Fine-tuning** - Domain-specific adaptation
- **Temporal Smoothing** - Reducing false positives
- **Data Normalization** - Consistent preprocessing
- **Data Augmentation** - Improved generalization
- **Class Weight Balancing** - Handling imbalanced datasets
- **Early Stopping** - Preventing overfitting

## 🎯 Model Performance

### Training Results
- **General Violence Model:** 98% accuracy on RWF-2000
- **Road Rage Model:** 94% accuracy on domain-specific dataset
- **Inference Speed:** Real-time processing (30 FPS)
- **False Positive Rate:** Significantly reduced with temporal smoothing

### Evaluation Metrics
- Confusion Matrix analysis
- F1-score computation
- Precision and Recall metrics
- ROC-AUC curve analysis

## 🚀 Key Features

1. **Real-Time Detection** - Process video streams in real-time
2. **High Accuracy** - 94% accuracy on road rage scenarios
3. **Temporal Analysis** - 30-frame sliding window for context
4. **Transfer Learning** - Efficient training with pre-trained features
5. **GPU Acceleration** - Optimized for high-performance inference
6. **Robust to Variations** - Handles different lighting and angles

## 💡 Technical Innovations

- Successfully demonstrated transfer learning effectiveness from general violence to road rage detection
- Implemented temporal smoothing algorithm to reduce false positives
- Designed efficient sliding window mechanism for real-time processing
- Balanced training with class weight adjustments for imbalanced data

## 🎓 Learning Outcomes

- Deep understanding of 3D CNNs for video analysis
- Practical experience with transfer learning strategies
- Real-time video processing optimization
- Model evaluation and performance tuning
- GPU acceleration techniques for deep learning
