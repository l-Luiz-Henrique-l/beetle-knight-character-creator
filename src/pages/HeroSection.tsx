import { Button } from '@/components/ui/button'
import { BugIcon, PlayIcon } from 'lucide-react'


function HeroSection() {
    const videoId = "foGKnHKusPs";
	return (
		<section className='bg-card bg-soft-radial'>
			<div className='container-main flex flex-col items-center text-center py-20'>
				

				<h1 className='mt-6 text-6xl text-balance font-bold text-foreground tracking-tight' style={{ fontFamily: 'MedievalSharp, cursive' }}>
                    Beetle Knight
				</h1>

				<p className='mt-6 text-muted-foreground text-xl text-balance leading-relaxed'>
					Beetle Knight é um RPG de insetos para suas mesas. Em Beetle Knight você joga com <br /> Artrópodes
                    designados por uma ordem Iridescente como protetores do reino de Litterfall.<br /> Você tem, 
                    portanto, o dever de viajar pelo mundo ajudando quem precisar. 
 
				</p>

                <Button className='mt-10' size='lg'>
                    <a href='https://discord.gg/aaeqYtFCr' target='_blank' className='flex gap-2
                    items-center w-65 h-12 justify-center'>
                    
                    <span className='uppercase tracking-wider'>
                        Junte-se ao nosso servidor!
                    </span>
                    <BugIcon className='size-4' />
                    </a>
                </Button>

				</div>
		</section>
	)
}
export default HeroSection
