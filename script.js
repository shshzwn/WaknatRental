document.addEventListener('DOMContentLoaded', () => {
    
    // --- SHARED DATA ---
    const bikeTypes = ['Yamaha Y15ZR', 'Honda RS150', 'Kawasaki Ninja 250', 'Honda Vario', 'Benelli RFS150'];
    
    // Price Map (RM per day)
    const bikePrices = {
        'Yamaha Y15ZR': 30,
        'Honda RS150': 35,
        'Kawasaki Ninja 250': 80,
        'Honda Vario': 20,
        'Benelli RFS150': 55
    };

    // --- 1. REGISTRATION LOGIC ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPass').value;
            const repeatPassword = document.getElementById('regRepeatPass').value;

            if (!email.includes('@gmail.com')) {
                alert("Invalid Email: Must contain '@' character.");
                return;
            }
            if (password.length <= 7) {
                alert("Password too weak: Must be more than 8 characters.");
                return;
            }
            if (password !== repeatPassword) {
                alert("Error: Passwords do not match.");
                return;
            }
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            alert("Registration Successful! You can now login.");
            window.location.href = "index.html"; 
        });
    }

    // --- 2. LOGIN LOGIC ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEmail = document.getElementById('loginEmail').value;
            const inputPass = document.getElementById('loginPass').value;
            const storedEmail = localStorage.getItem('userEmail');
            const storedPass = localStorage.getItem('userPassword');

            if (inputEmail === storedEmail && inputPass === storedPass) {
                alert("Login Successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid Email or Password.");
            }
        });
    }

    // --- 3. FEEDBACK LOGIC ---
    const feedbackForm = document.getElementById('feedbackForm');
    const reviewsList = document.getElementById('reviewsList');
    if (feedbackForm && reviewsList) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('feedbackName').value;
            const rating = document.getElementById('feedbackRating').value;
            const comment = document.getElementById('feedbackComment').value;
            let starString = "";
            for(let i=0; i<rating; i++) starString += "⭐";

            const newReview = document.createElement('div');
            newReview.classList.add('review-card');
            newReview.innerHTML = `
                <div class="review-header"><strong>${name}</strong><span class="stars">${starString}</span></div>
                <p>"${comment}"</p>
            `;
            reviewsList.prepend(newReview);
            feedbackForm.reset();
            alert("Thank you for your feedback!");
        });
    }

    // --- 4. DASHBOARD LOGIC (TALLY 2025 & CURRENT MONTH) ---
    const pieCanvas = document.getElementById('pieChart');
    const barCanvas = document.getElementById('barChart');
    const totalBookingsDisplay = document.getElementById('totalYearBookings');
    const monthBookingsDisplay = document.getElementById('monthBookings');
    const famousBikeDisplay = document.getElementById('famousBike');

    if (pieCanvas && barCanvas) {
        // Base Graph Data (Simulated Database)
        const monthlyData = [65, 59, 80, 81, 56, 55, 40, 70, 95, 110, 84, 0];
        
        // 1. Get User's Personal Bookings from LocalStorage
        const userBookings = JSON.parse(localStorage.getItem('myServiceBookings')) || [];

        // 2. Calculate GRAND TOTAL (Graph + User)
        const graphTotal = monthlyData.reduce((a, b) => a + b, 0);
        const grandTotal = graphTotal + userBookings.length;
        
        if(totalBookingsDisplay) totalBookingsDisplay.textContent = grandTotal.toLocaleString();

        // 3. Calculate CURRENT MONTH TOTAL (Graph Current Month + User Current Month)
        const today = new Date();
        const currentMonthIndex = today.getMonth(); // 0 = Jan, 11 = Dec
        const currentYear = today.getFullYear();

        // Base from graph (if current month is within data range)
        const baseMonthCount = monthlyData[currentMonthIndex] || 6;

        // Count user bookings that fall in THIS month and THIS year
        const userMonthCount = userBookings.filter(b => {
            const bDate = new Date(b.date);
            return bDate.getMonth() === currentMonthIndex && bDate.getFullYear() === currentYear;
        }).length;

        const totalMonthCount = baseMonthCount + userMonthCount;
        if(monthBookingsDisplay) monthBookingsDisplay.textContent = totalMonthCount;

        // 4. Charts & Stats
        const pieDataRaw = [250, 150, 100, 195, 100]; 
        const maxVal = Math.max(...pieDataRaw);
        const maxIndex = pieDataRaw.indexOf(maxVal);
        if(famousBikeDisplay) famousBikeDisplay.textContent = bikeTypes[maxIndex];

        new Chart(pieCanvas, {
            type: 'pie',
            data: {
                labels: bikeTypes,
                datasets: [{
                    label: 'Bookings',
                    data: pieDataRaw,
                    backgroundColor: ['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)','rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)'],
                    borderWidth: 1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: 'white' } } } }
        });

        new Chart(barCanvas, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Total Bookings 2025',
                    data: monthlyData,
                    backgroundColor: 'rgba(188, 212, 229, 0.8)',
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                },
                plugins: { legend: { labels: { color: 'white' } } }
            }
        });
    }

    // --- 5. BOOKING LIST LOGIC ---
    const bookingTableBody = document.getElementById('bookingTableBody');
    const bikeFilter = document.getElementById('bikeFilter');

    if (bookingTableBody) {
        if (bikeFilter) {
            bikeTypes.forEach(bike => {
                const opt = document.createElement('option');
                opt.value = bike;
                opt.textContent = bike;
                bikeFilter.appendChild(opt);
            });
            bikeFilter.addEventListener('change', () => { renderBookingTable(bikeFilter.value); });
        }

        const bookingsData = [];
        const today = new Date(); 
        const currentMonth = today.getMonth(); 
        const currentYear = today.getFullYear();

        for (let i = 1; i <= 30; i++) {
            const randomBike = bikeTypes[Math.floor(Math.random() * bikeTypes.length)];
            const randomDay = Math.floor(Math.random() * 28) + 1; 
            const bookingDate = new Date(currentYear, currentMonth, randomDay);
            const dateStr = bookingDate.toISOString().split('T')[0];
            let status = '';
            const todayClean = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            if (bookingDate < todayClean) status = Math.random() > 0.2 ? 'Complete' : 'Cancelled';
            else if (bookingDate.getTime() === todayClean.getTime()) status = 'Progress';
            else status = 'Pending'; 

            bookingsData.push({ id: i, bike: randomBike, date: dateStr, duration: Math.floor(Math.random() * 5) + 1, status: status });
        }

        function renderBookingTable(filterBike = 'all') {
            bookingTableBody.innerHTML = '';
            bookingsData.forEach(item => {
                if (filterBike !== 'all' && item.bike !== filterBike) return;
                let statusClass = '';
                if(item.status === 'Complete') statusClass = 'status-complete';
                else if(item.status === 'Progress') statusClass = 'status-progress';
                else if(item.status === 'Cancelled') statusClass = 'status-cancelled';
                else statusClass = ''; 

                const row = `<tr>
                    <td>${item.id}</td><td>${item.bike}</td><td>${item.date}</td><td>${item.duration} Days</td>
                    <td><span class="${statusClass}">${item.status}</span></td>
                </tr>`;
                bookingTableBody.innerHTML += row;
            });
        }
        renderBookingTable();
    }

    // --- 6. SERVICE PAGE (Persistence & Price Calculation) ---
    const serviceForm = document.getElementById('serviceBookingForm');
    const myBookingList = document.getElementById('myBookingList');
    const servBikeSelect = document.getElementById('servBike');
    let userBookings = JSON.parse(localStorage.getItem('myServiceBookings')) || [];

    if (servBikeSelect) {
        bikeTypes.forEach(bike => {
            const option = document.createElement('option');
            option.value = bike;
            option.textContent = bike;
            servBikeSelect.appendChild(option);
        });
    }

    function renderBookings() {
        if (!myBookingList) return;
        myBookingList.innerHTML = '';
        if (userBookings.length === 0) {
            myBookingList.innerHTML = '<p style="text-align:center;">No bookings yet.</p>';
        } else {
            userBookings.forEach((booking, index) => {
                // PRICE CALCULATION
                const pricePerDay = bikePrices[booking.bike] || 0;
                const totalPrice = pricePerDay * booking.duration;

                const div = document.createElement('div');
                div.classList.add('booking-item');
                div.innerHTML = `
                    <div>
                        <strong>${booking.bike}</strong><br>
                        <small>${booking.date} (${booking.duration} days)</small><br>
                        <span style="color:#bcd4e5; font-weight:600;">Total: RM ${totalPrice}</span>
                    </div>
                    <div>
                        <button class="action-btn edit-btn" onclick="editBooking(${index})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteBooking(${index})">Delete</button>
                    </div>`;
                myBookingList.appendChild(div);
            });
        }
    }

    if (serviceForm) {
        renderBookings();
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('servName').value;
            const phone = document.getElementById('servPhone').value;
            const bike = document.getElementById('servBike').value;
            const date = document.getElementById('servDate').value;
            const duration = document.getElementById('servDuration').value;
            const editIndex = document.getElementById('editIndex').value;

            if (editIndex === "-1") {
                userBookings.push({ id: Date.now(), name, phone, bike, date, duration });
            } else {
                userBookings[editIndex] = { ...userBookings[editIndex], name, phone, bike, date, duration };
                document.getElementById('editIndex').value = "-1";
                document.getElementById('submitBtn').textContent = "Add Booking";
            }
            
            localStorage.setItem('myServiceBookings', JSON.stringify(userBookings));
            serviceForm.reset();
            renderBookings();
        });
    }

    window.editBooking = (index) => {
        const data = userBookings[index];
        document.getElementById('servName').value = data.name;
        document.getElementById('servPhone').value = data.phone;
        document.getElementById('servBike').value = data.bike;
        document.getElementById('servDate').value = data.date;
        document.getElementById('servDuration').value = data.duration;
        document.getElementById('editIndex').value = index;
        document.getElementById('submitBtn').textContent = "Update Booking";
    };

    window.deleteBooking = (index) => {
        if(confirm("Delete this booking?")) {
            userBookings.splice(index, 1);
            localStorage.setItem('myServiceBookings', JSON.stringify(userBookings));
            renderBookings();
        }
    };
});

// --- NAVBAR & SCROLL UTILS ---
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
if(navbarToggle) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        if(scrollBtn) scrollBtn.style.display = "block";
    } else {
        if(scrollBtn) scrollBtn.style.display = "none";
    }
};
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}