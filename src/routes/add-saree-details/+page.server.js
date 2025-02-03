// import { redirect } from '@sveltejs/kit';
//
// export async function load({ cookies }) {
// 	const allCookies = cookies.getAll();
// 	console.log('All cookies:', allCookies);
//
// 	const token = cookies.get('token');
// 	// console.log('Token in load function:', token);
//
// 	if (!token) {
// 		console.log('No token found. Redirecting to /');
// 		throw redirect(302, '/');
// 	}
//
// 	try {
// 		// Validate token
// 		const response = await fetch('/api/validate-token', {
// 			headers: {
// 				Authorization: `Bearer ${token.trim()}`
// 			}
// 		});
//
// 		console.log('Response status from /api/validate-token:', response.status);
// 		if (!response.ok) {
// 			throw redirect(302, '/');
// 		}
//
// 		const user = await response.json();
// 		return { user };
// 	} catch (error) {
// 		console.error('Error validating token:', error);
// 		throw redirect(302, '/');
// 	}
// }
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('token');
	console.log('Token in cookies:', token);

	if (!token) {
		console.error('No token found in cookies.');
		throw redirect(302, '/');
	}

	try {
		const response = await fetch('/api/validate-token', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		console.log('Validation response status:', response.status);

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Token validation failed:', errorData);
			throw redirect(302, '/');
		}

		const data = await response.json();
		console.log('Validation response data:', data);

		if (!data.isApproved) {
			console.error('User is not approved');
			throw redirect(403, '/');
		}

		return { user: data };
	} catch (error) {
		console.error('Error validating token:', error);
		throw redirect(302, '/');
	}
}
