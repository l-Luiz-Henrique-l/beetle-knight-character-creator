import { BugIcon } from 'lucide-react'

function Brand() {
	return (
		<div className='flex items-center gap-2 py-3 px-10'>
			<div className='flex size-9 items-center justify-center bg-primary rounded-md'>
				<BugIcon className='size-5 text-primary-foreground' />
			</div>
			<span className='font-bold text-foreground text-lg gap-1 flex items-center'>
				<span className='text-primary'>Beetle Knight </span>
			</span>
		</div>
	)
}

export default Brand
