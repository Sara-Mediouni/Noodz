import React, { useRef } from 'react'
import img1 from '../assets/jay-wennington-N_Y88TWmGwA-unsplash.jpg'
import img2 from '../assets/pexels-pixabay-262978.jpg'
import img3 from '../assets/pexels-elevate-1267320.jpg'
import img4 from '../assets/pexels-fotios-photos-1279330.jpg'
import img5 from '../assets/pexels-fotios-photos-1373915.jpg'
import img6 from '../assets/pexels-fariphotography-803963.jpg'
import img7 from '../assets/—Pngtree—delicious farfalle pasta with langoustine_15458835 (1).png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const About = () => {
   const image1 = useRef(null)
    const image2 = useRef(null)
    const image3 = useRef(null)
    
    const images = [image1, image2, image3]
  useGSAP(() => {
    // GSAP animation for each image on scroll
    images.forEach((card, index) => {
      gsap.fromTo(
        card.current,
        {
          y: -100,
          opacity: 0,
        },
       
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card.current,
            start: 'top bottom-=100',
            toggleActions: "play  play reset",
          },
        }
      )
    })
  }, [])

  return (
  <> 
  <div className="grid grid-cols-3 gap-4 px-4 py-12">
  <img src={img1}  ref={image1} className="w-full h-48 object-cover rounded-lg shadow-md translate-y-4 " />
  <img src={img2} ref={image2} className="w-full h-60 object-cover rounded-lg shadow-lg scale-105" />
  <img src={img3} ref={image3} className="w-full h-48 object-cover rounded-lg shadow-md -translate-y-4" />
</div>
 <div className="grid grid-cols-4 gap-4 px-4">
  <img src={img4}  ref={image1} className="w-full h-60 object-cover rounded-lg shadow-md translate-y-4 " />
  <img src={img5} ref={image2} className="w-full h-48 object-cover rounded-lg shadow-lg scale-105" />
  <img src={img6} ref={image3} className="w-full h-60 object-cover rounded-lg shadow-md -translate-y-4" />
  <img src={img7} ref={image3} className="w-full h-60 object-cover rounded-lg shadow-md -translate-y-4" />
</div>


</> 
  )
}

export default About