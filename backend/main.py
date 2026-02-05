from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import os
import tensorflow as tf
from tensorflow.keras.models import load_model

# Optional: Disable oneDNN optimization warnings
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained Keras model
MODEL = load_model("potato_diseases_classification_model.keras")

# Define class names for prediction output
CLASS_NAMES = ['Early blight', 'Late blight', 'Healthy']


@app.get("/ping")
async def ping():
    return {"message": "Hello, I am running. This is my first time using FastAPI. This is cool!"}


def preprocess_image(image_bytes):
    """Preprocess the uploaded image to match model input requirements."""
    image = Image.open(BytesIO(image_bytes)).convert("RGB")  # Ensure RGB format
    image = image.resize((256, 256))  # Resize to model input size
    image = np.array(image)           # Convert to NumPy array

    # Uncomment the line below if your model was trained on normalized images
    # image = image / 255.0

    return np.expand_dims(image, axis=0)  # Add batch dimension: (1, 256, 256, 3)


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read and preprocess the uploaded image
        image_bytes = await file.read()
        input_image = preprocess_image(image_bytes)

        # Make prediction
        predictions = MODEL.predict(input_image)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = round(float(np.max(predictions[0])), 2)

        return JSONResponse(content={
            "class": predicted_class,
            "confidence": confidence
        })
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
