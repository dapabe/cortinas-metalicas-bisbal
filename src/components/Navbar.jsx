import Link from "next/link";
import React from "react";

export function Navbar() {
	return (
		<div className="flex-1 p-2">
			<nav className="navbar bg-base-100 shadow-xl rounded-2xl sticky top-0">
				<div className="navbar-start"></div>
				<div className="navbar-center gap-x-4">
					<Link href={"/"}>Inicio</Link>
					{/* <Link
						href={"/"}
						className="link no-underline text-xl items-center justify-items-center"
					>
						<span className="block flex-1">CORTINAS METÁLICAS</span>{" "}
						<span>BISBAL</span>
					</Link> */}
					<a href="#trabajos">Trabajos Realizados</a>
				</div>
				<div className="navbar-end"></div>
			</nav>
		</div>
	);
}
