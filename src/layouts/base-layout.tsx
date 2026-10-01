import FloatingVideo from "@/components/shared/floatingvideo"
import Footer from "@/components/shared/footer"
import Navbar from "@/components/shared/navbar"
import { motion } from "framer-motion"
import { Outlet, useLocation } from "react-router"

function MainLayout() {
	const location = useLocation()

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<motion.main
				key={location.pathname}
				initial={{
					opacity: 0,
					filter: "blur(8px)",
					y: 10,
				}}
				animate={{
					opacity: 1,
					filter: "blur(0px)",
					y: 0,
				}}
				transition={{
					duration: 0.35,
				}}
				className="flex-1 container-main py-6"
			>
				<Outlet />
			</motion.main>

			<FloatingVideo />

			<Footer />
		</div>
	)
}

export default MainLayout