// Import Firestore functions from the Firebase SDK
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Initialize Firestore
const db = getFirestore();
const auth = getAuth();

// Function to submit the incident report
export function submitReport(disasterType, location, description) {
    // Check if the user is logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is authenticated, proceed to submit the report
            try {
                const docRef = addDoc(collection(db, "incidentReports"), {
                    disasterType: disasterType,
                    location: location,
                    description: description,
                    userId: user.uid,  // Associate the report with the logged-in user
                    timestamp: new Date()  // Add a timestamp
                });

                alert("Report submitted successfully!");
                // Optionally, redirect to another page after submission
                window.location.href = '/Home/Index';
            } catch (e) {
                console.error("Error adding document: ", e);
                alert("Error submitting the report. Please try again.");
            }
        } else {
            // User is not authenticated
            alert("You need to be logged in to submit a report.");
            window.location.href = '/User/Login'; // Redirect to login if user is not authenticated
        }
    });
}
