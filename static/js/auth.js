const API_BASE_URL = 'http://localhost:8000/api/merchant-financing';


// auth.js
async function handleLogin(event) {
	event.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const errorMessage = document.getElementById('errorMessage');

	try {
		const response = await fetch(`${API_BASE_URL}/dashboard/v2/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (!response.ok) {
			throw new Error('Login failed');
		}

		// Parse the response data
		const responseData = await response.json();
		console.log('Login Response:', responseData);  // Debug log

		// Check if responseData has the expected structure
		if (responseData && responseData.data) {
			// Store user info
			sessionStorage.setItem('userInfo', JSON.stringify({
				name: responseData.data.name,
				role: responseData.data.role,
				partner: responseData.data.partner
			}));

			window.location.href = '/dashboard';
		} else {
			throw new Error('Invalid response format');
		}

	} catch (error) {
		console.error('Login error:', error);  // Debug log
		errorMessage.textContent = 'Login failed: ' + error.message;
		errorMessage.style.display = 'block';
	}
}

//async function handleLogin(event) {
//	event.preventDefault();
//	const username = document.getElementById('username').value;
//	const password = document.getElementById('password').value;
//	const errorMessage = document.getElementById('errorMessage');
//
//	try {
//		const response = await fetch(`${API_BASE_URL}/dashboard/v2/login`, {
//			method: 'POST',
//			credentials: 'include', // Important for cookies
//			headers: {
//				'Content-Type': 'application/json',
//			},
//			body: JSON.stringify({ username, password }),
//		});
//
//		if (!response.ok) {
//			throw new Error('Login failed');
//		}
//		console.log("response login", response);
//
//		sessionStorage.setItem('userInfo', JSON.stringify({
//			name: data.data.name,
//			role: data.data.role,
//			partner: data.data.partner
//		}));
//
//		// If login successful, redirect to dashboard
//		window.location.href = '/dashboard';
//	} catch (error) {
//		errorMessage.textContent = 'Login failed. Please check your credentials.';
//		errorMessage.style.display = 'block';
//	}
//}

async function loadProfile() {
	try {
		const response = await fetch(`${API_BASE_URL}/dashboard/v2/profile`, {
			credentials: 'include', // Important for cookies
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			// If not authenticated, redirect to login
			window.location.href = '/';
			return;
		}
		console.log("response load profile", response);

		const profileData = await response.json();
		const profileInfo = document.getElementById('profileInfo');
		console.log("profileData", profileData.data);

		// Display profile information
		profileInfo.innerHTML = `
            <h3>Welcome, ${profileData.data.name}</h3>
            <p>Role: ${profileData.data.role}</p>
            <!-- Add more profile fields as needed -->
        `;
	} catch (error) {
		console.error('Error loading profile:', error);
		window.location.href = '/';
	}
}

async function handleLogout() {
	try {
		// Optional: Call logout endpoint if you have one
		await fetch(`${API_BASE_URL}/dashboard/v2/logout`, {
			method: 'POST',
			credentials: 'include',
		});

		// Redirect to login page
		window.location.href = '/';
	} catch (error) {
		console.error('Error during logout:', error);
	}
}

// Load profile when dashboard page loads
if (window.location.pathname === '/dashboard') {
	loadProfile();
}
