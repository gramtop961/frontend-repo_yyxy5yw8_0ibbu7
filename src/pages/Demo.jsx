import App from '../App'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DemoPage(){
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1"><App /></div>
      <Footer />
    </div>
  )
}
