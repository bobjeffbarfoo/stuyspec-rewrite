import Head from "next/head";
import { FormEvent, useState } from "react";
import styles from "../styles/Login.module.css";
import Router from "next/router";
import { defaultProps } from "../ts_types/db_types";

const Login = (props: defaultProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (email == "" || password == "") {
			return;
		}

		const body = { email, password };
		const request = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (request.ok) {
			const rjson = await request.json();
			Router.push("/dash");
		}
	};
	return (
		<>
			<Head>
				<title>Login | The Spectator</title>
				<meta
					name="description"
					content="Staff login for The Stuyvesant Spectator"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.container}>
				<h1 id={styles.heading}>Login</h1>
				<form onSubmit={handleFormSubmit}>
					<input
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						className={styles.input}
						type="email"
						required
						placeholder="...@stuy.edu"
					/>
					<br />
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className={styles.input}
						type="password"
						required
					/>
					<br />
					<input className={styles.button} type="submit" />
				</form>
			</main>
		</>
	);
};

export default Login;
