import React from "react";

const UserProfile = ({ user, active, onClick }) => {
	return (
		<div id="admin-profile">
			<div
				id="admin-avatar"
				className="blur-shadow"
				style={{ backgroundImage: `url('${user.profileImage}')` }}
			></div>

			<button
				className={active ? "radius active" : "radius"}
				onClick={() => {
					onClick(active ? "" : "userProfile");
				}}
			>
				<strong>{user.name}</strong>
				<small>{user.role}</small>
			</button>

			<ul className="sub-menu blur-shadow">
				<li>
					<a href="/account/profile">
						<i className="fas fa-user-circle"></i> My Profile
					</a>
				</li>
				<li>
					<a href="/account/settings">
						<i className="fas fa-cog"></i> Account Settings
					</a>
				</li>
				<li>
					<a href="/logout">
						<i className="fas fa-sign-out-alt"></i>
						Logout
					</a>
				</li>
			</ul>
		</div>
	);
};

export default UserProfile;
