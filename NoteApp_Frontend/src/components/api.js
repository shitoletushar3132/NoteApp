import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/auth", // Corrected baseURL
    withCredentials: true, // Set globally for all requests
});

// Function to handle Google authentication
export const googleAuth = (code) => api.get(`/google?code=${encodeURIComponent(code)}`);

// Test function with `withCredentials` configured
export const test = () => api.get("/notes");

export const logout = () => api.get("/logout");

export const addNote = (notesData) => api.post("/addNotes", notesData);
