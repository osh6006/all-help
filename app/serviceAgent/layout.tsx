export default async function ServiceAgentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="        
        flex 
        min-h-full flex-col
        justify-center 
        bg-gray-100 
        py-12 
        sm:px-6 
        lg:px-8"
    >
      {children}
    </div>
  );
}
