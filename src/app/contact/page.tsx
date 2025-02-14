'use server'
import Contact from "@/components/contact/contact"

export default async function page() {
    return(
        <div className='max-w-2xl mx-auto py-12 px-4'>
            <div className='border p-6 rounded-lg shadow-md'>
                <div className='mb-6'>
                    <span className="text-center mt-2 text-2xl font-bold">Get in Touch</span>
                    <div className=' border-b-[2px] w-[70px] border-foreground'></div>
                </div>
                <Contact />
            </div>
        </div>
    )
}
