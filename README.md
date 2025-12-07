# WaknatRental
Project Title: WAKNAT RENTAL

Description: WAKNAT RENTAL is a web-based motorbike rental management system designed to streamline the booking process for customers. The application provides a user-friendly interface for users to register, log in, view rental statistics, manage their own bookings (CRUD), and check rental rates. It features a responsive design, real-time data visualization for rental trends, and persistent data storage using the browser's LocalStorage.

b. Features Included
User Authentication System:
Registration: Secure sign-up with validation (requires @gmail.com email and password length > 7 characters).
Login: Authentication mechanism using credentials stored in LocalStorage.

Interactive Dashboard:
Real-Time Statistics: dynamically calculates "Total Bookings," "Most Famous Bike," and "Current Month Bookings" by combining historical data with user activity.
Data Visualization: Integrated Chart.js to display rental time shares (Pie Chart) and monthly rental trends (Bar Chart).

Booking Management (Service Page):
CRUD Functionality: Users can Create, Read, Update, and Delete their own bookings.
Automated Pricing: Automatically calculates the total rental price based on the selected bike model and duration (e.g., Yamaha Y15ZR @ RM30/day).
Data Persistence: Bookings are saved to LocalStorage, so they remain available even after refreshing the page.

Booking History:
View a list of past rental orders filtered for the current month.
Bike Filter: Dropdown to filter the history table by specific bike models.
Status Logic: Automatically assigns status (Complete/Progress/Pending) based on the booking date relative to the current date.

Feedback & About:
Interactive feedback form that allows users to post reviews dynamically to the page.
Embedded Google Map location.

Responsive Design:
Fully responsive layout with a hamburger menu for mobile navigation.
Floating labels for form inputs to prevent text overlapping.

c. Instructions to Test Login
Since the project uses LocalStorage (browser memory) instead of a backend database, you must register an account first before you can log in.
Open the Registration Page:
Open register.html in your web browser.

Create an Account:
Email: Enter a valid email address ending in @gmail.com (e.g., user@gmail.com).
Password: Enter a password longer than 7 characters.
Repeat Password: Ensure both password fields match.
Click Register. You should see a "Registration Successful" alert.

Log In:
You will be redirected to index.html (Login Page).
Enter the same email and password you just created.
Click Login.
On success, you will be redirected to dashboard.html.

d. Frameworks & Libraries Used

Core Technologies:
HTML5: Page structure and semantic layout.
CSS3: Custom styling, flexbox/grid layouts, and responsive design.
JavaScript (Vanilla): DOM manipulation, form validation, LocalStorage management, and logic for calculations.

External Libraries:
Chart.js (CDN): Used for rendering the interactive Pie and Bar charts on the Dashboard.
Ionicons (CDN): Used for all vector icons (social media, dashboard icons, form indicators).
Google Fonts: Imported 'Poppins', 'Roboto', and 'Science Gothic' for typography.
