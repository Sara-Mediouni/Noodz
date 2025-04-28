import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { assets } from '../assets/assets';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imagesRef = useRef([]);

  useGSAP(() => {
    imagesRef.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }, []);

  const images = [
    assets.img1,
    assets.img2,
    assets.img3,
    assets.img4,
    assets.img5,
    assets.img6,
    assets.img7,
  ];

  return (
    <div className="px-6 py-12 space-y-12">
      {/* Première grille : 4 images normales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.slice(0, 4).map((src, index) => (
          <img
            key={index}
            src={src}
            ref={(el) => (imagesRef.current[index] = el)}
            alt={`Dish ${index + 1}`}
            className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Deuxième grille : 3 images avec un style différent */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {images.slice(4).map((src, index) => (
          <img
            key={index + 4}
            src={src}
            ref={(el) => (imagesRef.current[index + 4] = el)}
            alt={`Dish ${index + 5}`}
            className="w-full h-80 object-cover rounded-3xl shadow-2xl hover:rotate-1 hover:scale-110 transition-all duration-500"
          />
        ))}
      </div>
    </div>
  );
};

export default About;
