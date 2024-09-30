// Import the Firebase functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCToVTfcUbtOhO52AFheZTz3v3cZDU8U7E",
    authDomain: "disasteralleviation-foundation.firebaseapp.com",
    projectId: "disasteralleviation-foundation",
    storageBucket: "disasteralleviation-foundation.appspot.com",
    messagingSenderId: "432118387996",
    appId: "1:432118387996:web:e38af69c07d6c6d45296d9",
    measurementId: "G-1JHEBQS4VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// User Registration Function
async function registerUser() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("Registration successful! Please check your email for verification.");
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Error: " + error.message);
    }
}

// User Login Function
async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Basic validation
    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        console.log("User logged in:", userCredential.user); // Debug log
        // Redirect or update UI after successful login

    } catch (error) {
        console.error("Error logging in:", error);
        switch (error.code) {
            case "auth/wrong-password":
                alert("Wrong password. Please try again.");
                break;
            case "auth/user-not-found":
                alert("No user found with this email.");
                break;
            case "auth/invalid-email":
                alert("Invalid email format.");
                break;
            default:
                alert("Error: " + error.message);
                break;
        }
    }
}

// Incident Reporting Function
async function reportIncident() {
    const disasterType = document.getElementById("disasterType").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    if (!disasterType || !location || !description) {
        alert("Please fill in all fields.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await addDoc(collection(db, "incidentReports"), {
                    disasterType: disasterType,
                    location: location,
                    description: description,
                    userId: user.uid,
                    timestamp: new Date()
                });

                alert("Report submitted successfully!");
                // Reset form fields if needed
                document.getElementById("disasterType").value = "";
                document.getElementById("location").value = "";
                document.getElementById("description").value = "";
            } catch (e) {
                console.error("Error adding document: ", e);
                alert("Error submitting the report. Please try again.");
            }
        } else {
            alert("You need to be logged in to submit a report.");
            window.location.href = '/User/Login'; // Redirect to login if user is not authenticated
        }
    });
}

// Donation Submission Function
async function submitDonation() {
    const resourceType = document.getElementById("resourceType").value;
    const quantity = document.getElementById("quantity").value;
    const donationLocation = document.getElementById("donationLocation").value;

    if (!resourceType || !quantity || !donationLocation) {
        alert("Please fill in all the required fields.");
        return;
    }

    try {
        await addDoc(collection(db, "donations"), {
            donorId: auth.currentUser ? auth.currentUser.uid : null,
            resourceType,
            quantity,
            location: donationLocation,
            status: "pending",
            date: new Date(),
        });
        alert("Donation submitted successfully!");
    } catch (error) {
        console.error("Error submitting donation: ", error);
        alert("Error: " + error.message);
    }
}

// Function to fetch and display donations
async function fetchDonations() {
    const user = auth.currentUser;
    if (!user) {
        alert("You need to be logged in to view your donations.");
        return;
    }

    try {
        const donationsRef = collection(db, "donations");
        const q = query(donationsRef, where("donorId", "==", user.uid)); // Filter donations by user ID
        const querySnapshot = await getDocs(q);

        // Clear previous donations
        const donationsList = document.getElementById("donationsList");
        donationsList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const donation = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `Resource: ${donation.resourceType}, Quantity: ${donation.quantity}, Location: ${donation.location}, Status: ${donation.status}, Date: ${donation.date.toDate()}`; // Ensure you call toDate() on the date object
            donationsList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching donations: ", error);
        alert("Error fetching donations: " + error.message);
    }
}

// Logout Function
async function logoutUser() {
    try {
        await signOut(auth);
        alert("You have been logged out.");
        window.location.href = 'index.html'; // Redirect to home after logout
    } catch (error) {
        console.error("Error logging out:", error);
        alert("Error logging out: " + error.message);
    }
}

// Expose functions globally
window.registerUser = registerUser;
window.loginUser = loginUser;
window.reportIncident = reportIncident;
window.submitDonation = submitDonation;
window.fetchDonations = fetchDonations;
window.logoutUser = logoutUser; // Make logoutUser globally accessible
