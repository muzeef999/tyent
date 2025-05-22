import { headers } from 'next/headers'
 
export default async function NotFound() {
  const headersList = await headers()
  const domain = headersList.get('host')
  const data = await getSiteData(domain)
  return (
    <div className="h-screen  flex items-center justify-center">
        <div className=" max-w-md w-full bg-card  p-8 text-center  border-b-1 border-primary">
       <h2 className="text-4xl font-bold text-primary mb-2">404 - Not Found</h2>
        <p className="text-lg  mb-4">
          The page you're looking for doesn’t exist on <span className="font-semibold text-primary">{data.name}</span>.
        </p>
        
      </div>
    </div>
  )
}

function getSiteData(domain: string | null): { name: string } {
    // Replace with your actual logic to get site data based on the domain
    return { name: domain ?? 'Unknown Site' }
}
