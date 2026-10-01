
import { Link } from "react-router"
import Brand from "./brand"

function Footer() {
	return (
		<footer className='border-t border-border bg-card'>
			<div className='container-main py-12'>
				
				<div className='grid md:grid-cols-2 gap-12'>
					<div className="px-10">
						<Link to="/">
							<Brand />
							<p className='mt-2 px-10 text-sm text-muted-foreground text-balance leading-relaxed max-w-sm'>
								Plataforma inspirada no sistema de Beetle Knight.
								Gerenciador de ficha de personagens.
							</p>
						</Link>
					</div>

					<div className="flex gap-12">
						<div>
							<h3 className='text-foreground font-semibold text-sm mb-3'>
								Sobre
							</h3>
							<ul className='flex flex-col gap-2'>
								<li>
									<Link to="/about" className='text-muted-foreground text-sm hover:text-primary'>
										Sobre o Projeto
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='text-foreground font-semibold text-sm mb-3'>
								Contato
							</h3>
							<ul className='flex flex-col gap-2'>
								<li>
									<Link to="/contact" className='text-muted-foreground text-sm hover:text-primary'>
										Fale conosco
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='text-foreground font-semibold text-sm mb-3'>
								Legal
							</h3>
							<ul className='flex flex-col gap-2'>
								<li>
									<a href="#" className='text-muted-foreground text-sm hover:text-primary'>
										Termos de Uso
									</a>
								</li>
								<li>
									<a href="#" className='text-muted-foreground text-sm hover:text-primary'>
										Privacidade
									</a>
								</li>
							</ul>
						</div>

					</div>

				</div>

				<div className='border-t border-border mt-10 pt-6'>
					<p className='text-center text-xs text-muted-foreground'>
						&copy; 2024 Beetle Knight. Todos os direitos reservados.
					</p>
				</div>

			</div>
		</footer>
	)
}

export default Footer