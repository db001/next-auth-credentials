import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
	const [userProfile, setUserProfile] = useState({});

	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				setUserProfile(session.user);
			} else {
				window.location.href = "/auth";
			}
		});
	}, []);

	async function changePasswordHandler(passwordData) {
		const response = await fetch("/api/user/change-password", {
			method: "PATCH",
			body: JSON.stringify(passwordData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		console.log(data);
	}

	return (
		<section className={classes.profile}>
			<h1>
				Your User Profile - <br /> {userProfile.email}
			</h1>
			<ProfileForm onChangePassword={changePasswordHandler} />
		</section>
	);
}

export default UserProfile;
