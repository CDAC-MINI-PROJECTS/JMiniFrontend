import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Acme Inc</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        Your trusted partner for all your business needs. We provide top-notch services to help your business grow.
      </p>
      <Link
        to="/login"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 inline-block"
      >
        Get Started
      </Link>
    </div>
  )
}
