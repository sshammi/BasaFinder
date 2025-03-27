
import CategoriesPage from "@/components/shared/Category";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <Navbar></Navbar>
        <div className="sticky top-0 z-50 bg-white shadow-sm pb-5 pt-1">
        <CategoriesPage />
        </div>
         <main className="min-h-screen mx-24">{children}</main>
        <Footer></Footer>
    </>
  )
}

export default CommonLayout;