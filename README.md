🥔 Potato Leaf Disease Classification System

An end-to-end machine learning project for classifying potato leaf diseases from images, complete with a trained deep learning model, a FastAPI backend, and a Next.js frontend for real-world usage.

This project allows users to upload an image of a potato leaf and receive a prediction indicating whether the leaf is healthy or affected by a disease.

📌 Project Overview

Potato plants are vulnerable to diseases such as Early Blight and Late Blight, which can severely impact crop yield. Early detection is crucial.

This project provides:

A CNN-based image classification model trained on potato leaf images

A FastAPI backend to serve the model via an API

A Next.js frontend for user interaction

A modular repository structure suitable for deployment

The full system has been tested locally and works correctly.

🧱 Repository Structure
.
├── notebook/
│   └── potato_disease_classification.ipynb
│
├── backend/
│   ├── main.py
│   ├── model/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── package.json
│   └── ...
│
├── README.md

🧠 Machine Learning Model

Problem Type: Image Classification

Model Type: Convolutional Neural Network (CNN)

Framework: TensorFlow / Keras

Input: Potato leaf images

Output: Disease classification label

Supported Classes

Healthy

Potato Early Blight

Potato Late Blight

The model training, evaluation, and experimentation are documented in the Jupyter Notebook.

📂 Dataset

Image dataset of potato leaves

Labeled by disease category

Images are resized and normalized before training

⚠️ Dataset files are not included in this repository.

⚙️ Backend — FastAPI

The backend exposes a REST API for image classification.

Features

Image upload endpoint

Model loading and inference

JSON response with predicted class

Lightweight and fast inference using FastAPI

Tech Stack

FastAPI

Python

TensorFlow / Keras

Uvicorn

Run Backend Locally
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


The API will be available at:

http://127.0.0.1:8000

🖥️ Frontend — Next.js

The frontend provides a clean UI to interact with the model.

Features

Upload potato leaf images

Send requests to the FastAPI backend

Display prediction results

Responsive user interface

Tech Stack

Next.js

React

JavaScript / TypeScript

Run Frontend Locally
cd frontend
npm install
npm run dev


The frontend will be available at:

http://localhost:3000

🔄 Full Application Flow

User uploads a potato leaf image via the frontend

Frontend sends the image to the FastAPI backend

Backend runs inference using the trained ML model

Prediction is returned as a JSON response

Frontend displays the disease classification

🧪 Testing Status

✅ Machine learning model tested
✅ FastAPI backend tested locally
✅ Next.js frontend tested locally
✅ Full system integration verified

🚀 Future Improvements

Add confidence scores to predictions

Improve accuracy using transfer learning (ResNet, MobileNet)

Deploy backend and frontend to cloud services

Add support for more crop diseases

Implement user authentication and image history

🤝 Contributing

Contributions are welcome!
Feel free to fork the repository, open issues, or submit pull requests.

📜 License

This project is intended for educational and research purposes.
