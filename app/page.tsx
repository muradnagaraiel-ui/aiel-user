import Navbar from '@/components/Navbar';
import Hero from './Hero/page';
import Courses from './courses/page';
import EnquiryButton from '@/components/EnquiryButton';
import Gallery from './gallery/page';
import About from './about/page';
import Testimonial from './testimonials/page';
import Footer from './footer/page';

export default function HomePage() {
  return (
    <>
      {/* Dynamic Header Node */}
      <Navbar />

      <main className="pt-2">
        {/* Yahan saare sections ki IDs humne Navbar ke navLinks array 
          ke 'id' keys se exact match kar di hain.
        */}
        <section id="home">
          <Hero />
        </section>

        <section id="courses">
          <Courses />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="testimonials">
          <Testimonial />
        </section>
        <Footer />
      </main>

      {/* Triple Combined Action Float Ring Buttons Container */}
      <EnquiryButton />
    </>
  );
}