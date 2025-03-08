import React, { useState } from "react";
import { Container, TextField, Button, Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const LoveScore = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!name1.trim() || !name2.trim()) {
      setError("Both names are required!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://score-backend-976f.onrender.com/love-score", {
        name1,
        name2,
      });
      setScore(response.data.score);
    } catch (error) {
      setError("Error fetching score. Try again!");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
        padding: 3,
      }}
    >
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold" sx={{ color: "#fff" }}>
            ❤️ Love Score Calculator ❤️
          </Typography>
          <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 3 }}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              error={!!error && !name1.trim()}
              helperText={error && !name1.trim() ? "Enter first name" : ""}
            />
            <TextField
              label="Second Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              error={!!error && !name2.trim()}
              helperText={error && !name2.trim() ? "Enter second name" : ""}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Calculating..." : "Check Love Score"}
            </Button>
          </Box>

          {score !== null && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <Card sx={{ mt: 3, p: 3, backgroundColor: "#ffebee", boxShadow: 3 }}>
                <Typography variant="h5" color="secondary" fontWeight="bold">
                  Your Love Score is: {score}%
                </Typography>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoveScore;
