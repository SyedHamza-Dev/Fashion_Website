import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css/bundle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../assets/images/fash.jpg';
import slide2 from '../assets/images/hijab.jpg';
import slide3 from '../assets/images/parda.jpg';
import feature1 from '../assets/images/feature1.jpg';
import feature2 from '../assets/images/feature2.jpg';
import feature3 from '../assets/images/feature3.jpg';



export default function Home() {

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Set to true if you want navigation arrows
    fade: true,    // Enables fade effect
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Navbar */}
      

        {/* Hero Section */}
        <section className="relative h-screen bg-black">
          <Slider {...sliderSettings}>

            {/* Slide 1 */}
            <div className="relative h-screen">
              <img
                src={slide2}
                alt="Slide 2"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="container mx-auto relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white max-w-2xl">
                <h1 className="text-4xl text-white font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
                Stand Out Looks
              </h1>
                  <p className="mt-4 text-gray-200">
                    Discover the power of confidence with styles tailored to fit you perfectly.
                  </p>
                  <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
                    Start Styling Now
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative h-screen">
              <img
                src={slide1}
                alt="Slide 1"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="container mx-auto relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white max-w-2xl">
                  <h1 className="text-4xl text-white font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
                    Redefine Style
                  </h1>
                  <p className="mt-4 text-gray-200">
                    Elevate your wardrobe with the latest trends and timeless classics.
                  </p>
                  <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
                    Start Styling Now
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="relative h-screen">
              <img
                src={slide3}
                alt="Slide 3"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="container mx-auto relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white max-w-2xl">
                  <h1 className="text-4xl text-white font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
                    Be Bold, Be You
                  </h1>
                  <p className="mt-4 text-gray-200">
                    Unleash your inner fashionista with curated collections.
                  </p>
                  <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
                    Start Styling Now
                  </button>
                </div>
              </div>
            </div>

          </Slider>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white text-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Fit & Flair?</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[{
                img: feature1,
                title: "Personalized Advice",
                desc: "Tailor-made suggestions based on your preferences, body type, and skin tone.",
              }, {
                img: feature2,
                title: "Cultural Sensitivity",
                desc: "Respecting your cultural and religious values in every suggestion.",
              }, {
                img: feature3,
                title: "Color Theory",
                desc: "Choosing colors that match your skin tone and the occasion for a perfect look.",
              }].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
                  <div className="w-32 h-32 mb-6">
                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       
      </div>
    </>
  );
}
