// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Container,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import { useDropzone } from "react-dropzone";

// export default function Home() {
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     setImage(file);
//     setPreviewUrl(URL.createObjectURL(file));
//     setResult(null);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'image/*': [] },
//     multiple: false,
//   });

//   const handleUpload = async () => {
//     if (!image) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", image);

//     try {
//       const res = await fetch("http://localhost:8000/predict/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Prediction failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           Potato Disease Classifier
//         </Typography>

//         <Box
//           {...getRootProps()}
//           sx={{
//             border: "2px dashed #888",
//             borderRadius: 2,
//             p: 4,
//             mb: 2,
//             bgcolor: isDragActive ? '#f0f0f0' : 'inherit',
//             cursor: "pointer",
//           }}
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <Typography>Drop the image here...</Typography>
//           ) : (
//             <Typography>
//               Drag and drop an image here, or click to select a file
//             </Typography>
//           )}
//         </Box>

//         {previewUrl && (
//           <Box sx={{ mb: 2 }}>
//             <img
//               src={previewUrl}
//               alt="Preview"
//               style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }}
//             />
//           </Box>
//         )}

//         <Button
//           variant="contained"
//           onClick={handleUpload}
//           disabled={!image || loading}
//           sx={{ mb: 2 }}
//         >
//           {loading ? <CircularProgress size={24} /> : "Predict"}
//         </Button>

//         {result && (
//           <Box>
//             <Typography variant="h6">Prediction: {result.class}</Typography>
//             <Typography>
//               Confidence: {(result.confidence * 100).toFixed(2)}%
//             </Typography>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// }


"use client";
import { useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      // sx={{
      //   minHeight: "100vh",
      //   background: "linear-gradient(135deg,rgb(61, 4, 85),rgb(185, 198, 174))",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   p: 2,
      // }}
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/Fertility-Management-on-Potato.webp')", // path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
    }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(212, 193, 193, 0.27)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          🥔 Potato Disease Classifier
        </Typography>

        <Paper
          {...getRootProps()}
          sx={{
            border: "2px dashed #aaa",
            borderRadius: "16px",
            p: 3,
            mt: 3,
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            },
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the image here ...</Typography>
          ) : (
            <Typography>
              Drag & drop an image here, or click to select one
            </Typography>
          )}
        </Paper>

        {preview && (
          <Box mt={3}>
            <img
              src={preview}
              alt="Selected"
              style={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ mt: 3 }}
          disabled={!image || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Predict"}
        </Button>

        {result && (
          <Box mt={4}>
            <Typography variant="h6">
              🔍 Prediction:{" "}
              <strong style={{ color: "#2a2a8e" }}>{result.class}</strong>
            </Typography>
            <Typography>
              🎯 Confidence: {(result.confidence * 100).toFixed(2)}%
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
