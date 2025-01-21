//server component
export const metadata = {
    title: "About Us | Blog",
    description: "description for about us page",
    keywords: "keywords for about us page",
}

export default function About(){
    return     <main className="container mx-auto px-4 py-6 min-h-lvh flex items-center flex-col justify-center">
    <h2 className="text-4xl font-bold mb-4 text-center">Welcome to Our Blog</h2>
    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</main>
}