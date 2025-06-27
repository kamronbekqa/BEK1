
import React, { useEffect, useState } from "react";
import img1 from '../public/20.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import'./App.css'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";


function App() {
  
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [contactName, setContactName] = useState('');
  // const [contactEmail, setContactEmail] = useState('');
  // const [contactMessage, setContactMessage] = useState('');
  // const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
    }
  }, []);

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Iltimos, retsept yaratish uchun ingredientlar kiriting.");
      setRecipe("");
      return;
    }

    setLoading(true);
    setRecipe("");
    setError("");

    try {
      const prompt = `Quyidagi ingredientlar asosida qozonda pishirish uchun batafsil retsept tuzib bering (o'zbek tilida, taom nomi, ingredientlar ro'yxati va tayyorlash usuli bilan): ${ingredients}. Retsept nomi qozonda tayyorlangan taomga mos bo'lsin.`;

      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setRecipe(generatedText);
      } else {
        setError(
          "Retseptni yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
        console.error("Gemini API dan kutilmagan javob:", result);
      }
    } catch (err) {
      setError(
        "Tarmoq xatosi yoki API chaqiruvida muammo yuz berdi. Iltimos, internet aloqangizni tekshiring."
      );
      console.error("Retsept yaratishda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleContactSubmit = (e) => {
  //   e.preventDefault();
  //   setContactStatus('Xabaringiz yuborildi! Tez orada siz bilan bog‘lanamiz.');
  //   setContactName('');
  //   setContactEmail('');
  //   setContactMessage('');
  // };

   const cards = [
    {
      id: 1,
      image:img1 , 
      title: "tova",
      benefits: "🟡 Qanday foydasi bor?",
      features: "🟠 Xususiyatlari",
      sizeOptions: ["3 litr"],
      oldPrice: "800 000 so‘m",
      newPrice: "700 000 so‘m",
      note: "To‘plam narxi",
    },
    {
      id: 2,
      image: "24.png",
      title: "Qopqoq – skovorodka",
      benefits: "🟡 Qanday foydasi bor?",
      features: "🟠 Xususiyatlari",
      sizeOptions: ["12 ta six kabobli"],
      oldPrice: "399 000 so‘m",
      newPrice: "349 000 so‘m",
      note: "To‘plam narxi",
    },
    {
      id: 3,
      image: "25.png",
      title: "Qopqoq – skovorodka",
      benefits: "🟡 Qanday foydasi bor?",
      features: "🟠 Xususiyatlari",
      sizeOptions: ["12 litr"],
      oldPrice: "649 000 so‘m",
      newPrice: "600 000 so‘m",
      note: "To‘plam narxi",
    },
    {
      id: 4,
      image: "29.png",
      title: "Manti qasqon",
      benefits: "🟡 Qanday foydasi bor?",
      features: "🟠 Xususiyatlari",
      sizeOptions: ["12 litr"],
      oldPrice: "1 200 000 so‘m",
      newPrice: "999   000 so‘m",
      note: "To‘plam narxi",
    },
    {
      id: 5,
      image: "27.png",
      title: "pichoq set",
      benefits: "🟡 Qanday foydasi bor?",
      features: "🟠 Xususiyatlari",
      sizeOptions: ["8 ta dona"],
      oldPrice: "570 000 so‘m",
      newPrice: "690 000 so‘m",
      note: "To‘plam narxi",
    },
    {
      id: 6,
      image: "28.png",
      title: "Qozon ochog'",
      benefits: "🟡 Qanday foydasi bor?",
      features: "🟠 Xususiyatlari",
      // sizeOptions: ["8 litr"],
      oldPrice: "899 000 so‘m",
      newPrice: "749 000 so‘m",
      note: "To‘plam narxi",
    },
  ]
  console.log(cards);
  

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body{font-family:'Inter',sans-serif;margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        .min-h-screen{min-height:100vh}
        .bg-gray-100{background-color:#f3f4f6}
        .text-gray-800{color:#1f2937}
        .container{max-width:1280px;margin-left:auto;margin-right:auto;width:100%;padding-left:1.5rem;padding-right:1.5rem}
        @media (min-width:768px){.container{padding-left:3rem;padding-right:3rem}}
        .header{background-color:white;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05);padding:1rem 1.5rem;display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:1rem}
        @media (min-width:768px){.header{padding:1rem 3rem;flex-direction:row;gap:0}}
        .header-left,.header-right{display:flex;align-items:center;gap:1rem}
        .header-logo{font-weight:700;font-size:1.5rem;line-height:2rem;color:#ea580c}
        .header-nav{display:none;gap:1.5rem}
        @media (min-width:768px){.header-nav{display:flex}}
        .header-nav a{color:#4b5563;text-decoration:none;transition:color .3s ease}
        .header-nav a:hover{color:#ea580c}
        .contact-item{display:flex;align-items:center;gap:.5rem}
        .icon-placeholder{width:1.25rem;height:1.25rem;background-color:#ea580c;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:.8rem;font-weight:bold}
        .hero-section{position:relative;background:linear-gradient(to right,#f97316,#fbbf24);color:white;padding:4rem 1.5rem;overflow:hidden;text-align:center}
        @media (min-width:768px){.hero-section{padding:6rem 3rem}}
        .hero-content{display:flex;flex-direction:column;align-items:center;gap:2rem;max-width:100%;margin:0 auto}
        @media (min-width:768px){.hero-content{flex-direction:row;justify-content:space-between;margin:0 auto;text-align:left}.hero-content > div:first-child{text-align:left;max-width:42rem}}
        .hero-title{font-size:2.25rem;line-height:2.5rem;font-weight:800;margin-bottom:1rem;text-shadow:0 2px 4px rgba(0,0,0,0.25)}
        @media (min-width:768px){.hero-title{font-size:3rem;line-height:1.2}}
        .hero-description{font-size:1.125rem;line-height:1.75rem;margin-bottom:2rem;text-shadow:0 1px 2px rgba(0,0,0,0.1)}
        @media (min-width:768px){.hero-description{font-size:1.25rem}}
        .hero-buttons{display:flex;flex-direction:column;gap:1rem;justify-content:center}
        @media (min-width:640px){.hero-buttons{flex-direction:row}}
        @media (min-width:768px){.hero-buttons{justify-content:flex-start}}
        .hero-button{padding:.75rem 2rem;border-radius:9999px;font-weight:600;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.06);transition:all .3s ease;border:none;cursor:pointer}
        .hero-button-primary{background-color:white;color:#ea580c}
        .hero-button-primary:hover{background-color:#FF4D00}
        .hero-button-secondary{border:1px solid white;color:white;background-color:transparent}
        .hero-button-secondary:hover{background-color:white;color:#ea580c}
        .hero-image-container{position:relative;width:16rem;height:16rem;border-radius:9999px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);overflow:hidden;flex-shrink:0}
        @media (min-width:768px){.hero-image-container{width:24rem;height:24rem}}
        .hero-image-container img{width:100%;height:100%;object-fit:cover;border-radius:9999px}
        .hero-bg-elements{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
        .hero-bg-elements div{position:absolute;border-radius:9999px;opacity:.2}
        .hero-bg-elements .bottom-left{bottom:-4rem;left:-4rem;width:12rem;height:12rem;background-color:#fb923c}
        .hero-bg-elements .top-right{top:-4rem;right:-4rem;width:16rem;height:16rem;background-color:#fcd34d}
        .benefits-section{background-color:white;padding:3rem 0}
        .section-title{font-size:1.875rem;line-height:2.25rem;font-weight:700;margin-bottom:2rem;text-align:center}
        .benefits-grid{display:grid;grid-template-columns:1fr;gap:2rem}
        @media (min-width:768px){.benefits-grid{grid-template-columns:repeat(2,1fr)}}
        @media (min-width:1024px){.benefits-grid{grid-template-columns:repeat(3,1fr)}}
        .benefits-card{padding:1.5rem;background-color:#f9fafb;border-radius:.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.06);transition:all .3s ease;text-align:center}
        .benefits-card:hover{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1)}
        .benefits-card .icon-placeholder{width:3rem;height:3rem;background-color:#ea580c;border-radius:50%;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;color:white;font-size:2rem;font-weight:bold}
        .benefits-card h3{font-weight:600;font-size:1.125rem;line-height:1.75rem;margin-bottom:.5rem}
        .benefits-card p{color:#4b5563;font-size:.875rem;line-height:1.25rem}
        .recipe-generator-section{background-color:#fff;padding:3rem 0;text-align:center}
        .recipe-generator-content{display:flex;flex-direction:column;gap:1.5rem;align-items:center}
        .recipe-generator-content textarea{width:100%;max-width:600px;min-height:100px;padding:1rem;border-radius:.5rem;border:1px solid #d1d5db;font-size:1rem;line-height:1.5rem;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)}
        .recipe-generator-content button{background-color:#10b981;color:white;padding:.75rem 2rem;border-radius:9999px;font-weight:600;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.06);transition:all .3s ease;border:none;cursor:pointer;display:flex;align-items:center;gap:.5rem}
        .recipe-generator-content button:hover{background-color:#059669}
        .recipe-output{background-color:#f9fafb;padding:1.5rem;border-radius:.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.06);text-align:left;white-space:pre-wrap;max-width:800px;width:100%;min-height:150px;display:flex;align-items:center;justify-content:center;color:#4b5563}
        .loading-indicator{font-size:1.25rem;color:#6b7280;display:flex;align-items:center;gap:.5rem}
        .loading-spinner{border:4px solid #f3f3f3;border-top:4px solid #3498db;border-radius:50%;width:24px;height:24px;animation:spin 1s linear infinite}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .error-message{color:#ef4444;margin-top:1rem;font-weight:500}
        .swiper-container{width:100%;height:100%;padding-bottom:3rem}
        .swiper-slide{background-color:white;display:flex;justify-content:center;align-items:center;font-size:1.5rem;text-align:center;padding:2rem;box-sizing:border-box;border-radius:.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.06)}
        .swiper-pagination-bullet{background-color:#ea580c!important}
        .swiper-button-next,.swiper-button-prev{color:#ea580c!important}
        .swiper-button-next::after,.swiper-button-prev::after{font-size:1.5rem!important}
        .swiper-content{display:flex;flex-direction:column;align-items:center;gap:1.5rem;width:100%;text-align:center}
        .swiper-content .icon-placeholder{width:3rem;height:3rem;background-color:#ea580c;border-radius:50%;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;color:white;font-size:2rem;font-weight:bold;margin-bottom:1rem}
        .swiper-content h3{font-weight:600;font-size:1.25rem;margin-bottom:.5rem;color:#ea580c}
        .swiper-content p{color:#4b5563;font-size:.9rem}
        .swiper-content input,.swiper-content textarea,.swiper-content button{width:100%;max-width:400px;padding:.75rem;border-radius:.25rem;border:1px solid #d1d5db;font-size:1rem;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05);margin-bottom:.5rem}
        .swiper-content button{background-color:#22c55e;color:white;font-weight:600;border:none;cursor:pointer;transition:background-color .3s ease}
        .swiper-content button:hover{background-color:#16a34a}
        .swiper-content .contact-status{color:#10b981;font-weight:500}
        .gallery-section,.video-reviews-section{background-color:white;padding:3rem 0;text-align:center}
        .gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem}
        .gallery-item{background-color:#f9fafb;border-radius:.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);overflow:hidden;transition:transform .3s ease}
        .gallery-item:hover{transform:translateY(-5px)}
        .gallery-item img{width:100%;height:200px;object-fit:cover;border-bottom:1px solid #eee}
        .gallery-item p{padding:1rem;font-weight:500;color:#374151}
        .video-player-wrapper{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:800px;margin:2rem auto;border-radius:.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
        .video-player-wrapper iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:none}
        .footer{background-color:#1f2937;color:white;padding:2rem 1.5rem;text-align:center}
        @media (min-width:768px){.footer{padding:2rem 3rem}}
        .footer-promo-text{font-size:1.125rem;line-height:1.75rem;margin-bottom:1rem}
        .footer-contact-grid{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem}
        @media (min-width:768px){.footer-contact-grid{flex-direction:row;gap:2rem}}
        .footer-contact-item{display:flex;align-items:center;gap:.5rem}
        .footer-contact-item .icon-placeholder{width:1.25rem;height:1.25rem;background-color:#fdba74;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#1f2937;font-size:.8rem;font-weight:bold}
        .footer-copyright{margin-top:1.5rem;font-size:.875rem;line-height:1.25rem;color:#9ca3af}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideInUp{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
        .animate-fadeIn{animation:fadeIn 1s ease-out forwards}
        .animate-slideInUp{animation:slideInUp .8s ease-out forwards}
        .big-div {
            margin-top: 3rem;
            background-color: #f3f4f6;
            padding: 2rem;
            border-radius: 0.5rem;
        }
        .reviews-section {
            background-color: #f9fafb;
            padding: 3rem 0;
            text-align: center;
        }
        .reviews-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2rem;
        }
        @media (min-width: 768px) {
            .reviews-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .review-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .reviews-section .review-card img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .reviews-section .review-stars {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .reviews-section .star-placeholder {
          width: 1rem;
          height: 1rem;
          background-color: #fcd34d;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        .delivery-payment-section {
            background-color: white;
            padding: 3rem 0;
            text-align: center;
        }
        .delivery-payment-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2rem;
        }
        @media (min-width: 768px) {
            .delivery-payment-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .delivery-payment-card {
            background-color: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .delivery-payment-section .delivery-payment-card .icon-blue {
          background-color: #3b82f6;
        }

        .delivery-payment-section .delivery-payment-card .icon-green {
          background-color: #10b981;
        }

        .delivery-payment-section .delivery-payment-card .icon-purple {
          background-color: #a855f7;
        }

        .product-details-section {
            background-color: #f9fafb;
            padding: 3rem 0;
            text-align: center;
        }
        .product-details-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 100%;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .product-details-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            text-align: left;
          }
        }
        .product-image-container {
          flex-shrink: 0;
          width: 100%;
          max-width: 400px;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .product-image-container img {
          width: 100%;
          height: auto;
          display: block;
        }
        .product-info {
          flex-grow: 1;
          padding-left: 0;
        }
        @media (min-width: 768px) {
          .product-info {
            padding-left: 3rem;
          }
        }
        .product-info h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        .product-info p {
          color: #4b5563;
          margin-bottom: 1.5rem;
        }
        .product-features {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }
        .product-features li {
          margin-bottom: 0.5rem;
          color: #374151;
          display: flex;
          align-items: center;
        }
        .product-details-section .product-features .bullet-point {
          color: #ea580c;
          font-weight: bold;
          margin-right: 0.5rem;
        }
        .product-details-section .product-order-button {
          background-color: #f97316;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .product-details-section .product-order-button:hover {
          background-color: #ea580c;
        }
        .product-order-button-container {
            margin-top: 2rem;
            text-align: center;
        }
        .more-products-section {
          background-color: white;
          padding: 3rem 0;
          text-align: center;
        }
        .more-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .product-variation-card {
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .product-variation-card:hover {
          transform: translateY(-5px);
        }
        .product-variation-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }
        .product-variation-card h3 {
          font-weight: 600;
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }
        .product-variation-card p {
          color: #4b5563;
          font-size: 0.9rem;
        }
        .relative { position: relative; }
        .w-full { width: 100%; }
        .h-56 { height: 14rem; }
        .overflow-hidden { overflow: hidden; }
        .rounded-lg { border-radius: 0.5rem; }
        .md\\:h-96 { height: 24rem; } /* Adjusted for md breakpoint */
        .hidden { display: none; }
        .duration-700 { transition-duration: 700ms; }
        .ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        .absolute { position: absolute; }
        .block { display: block; }
        .-translate-x-1\\/2 { transform: translateX(-50%); }
        .-translate-y-1\\/2 { transform: translateY(-50%); }
        .top-1\\/2 { top: 50%; }
        .left-1\\/2 { left: 50%; }
        .z-30 { z-index: 30; }
        .flex { display: flex; }
        .bottom-5 { bottom: 1.25rem; }
        .space-x-3 > :not([hidden]) ~ :not([hidden]) { margin-right: calc(0.75rem * var(--tw-space-x-reverse)); margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse))); }
        .rtl\\:space-x-reverse { --tw-space-x-reverse: 1; }
        .w-3 { width: 0.75rem; }
        .h-3 { height: 0.75rem; }
        .rounded-full { border-radius: 9999px; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .cursor-pointer { cursor: pointer; }
        .group:hover .group-hover\\:bg-white\\/50 { background-color: rgba(255, 255, 255, 0.5); }
        .group:hover .group-hover\\:bg-gray-800\\/60 { background-color: rgba(31, 41, 55, 0.6); }
        .group:focus .group-focus\\:ring-4 { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
        .group:focus .group-focus\\:ring-white { --tw-ring-color: #fff; }
        .group:focus .group-focus\\:ring-gray-800\\/70 { --tw-ring-color: rgba(31, 41, 55, 0.7); }
        .group:focus .group-focus\\:outline-none { outline: 2px solid transparent; outline-offset: 2px; }
        .inline-flex { display: inline-flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .w-10 { width: 2.5rem; }
        .h-10 { height: 2.5rem; }
        .bg-white\\/30 { background-color: rgba(255, 255, 255, 0.3); }
        .dark\\:bg-gray-800\\/30 { background-color: rgba(31, 41, 55, 0.3); }
        .text-white { color: #fff; }
        .dark\\:text-gray-800 { color: #1f2937; }
        .rtl\\:rotate-180 { transform: rotate(180deg); }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
        .top-0 { top: 0; }
        .start-0 { left: 0; }
        .end-0 { right: 0; }
        .h-full { height: 100%; }
        `}
      </style>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>


      <div className="min-h-screen bg-gray-100  font-sans antialiased text-gray-800" style={{
        
      }}>
        <header className="header "style={{
    width: "100%",
    margin: "0 auto",
    position: "fixed",
    zIndex: 99,
   height:'80px',
    top: 0,
   
    backgroundColor: "rgba(201, 195, 195, 0.4)",
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(3px)",
     padding:'0 110px',
    borderBottom: "1px solid rgb(232, 232, 232)",
    

  }} >
          <div className="header-left">
            <div className="header-logo">QozonMarket</div>
            <nav className="header-nav">
              <a href="#">Katalog</a>
              <a href="#">Afzalliklar</a>
              <a href="#">Sharhlar</a>
              <a href="#">Aloqa</a>
            </nav>
          </div>
          <div className="header-right">
            <div className="contact-item">
              <div
                className="icon-placeholder"
                style={{ backgroundColor: "#ea580c" }}
              >
                📞
              </div>
              <span>+998 (90) 123-45-67</span>
            </div>
            <div className="contact-item">
              <div
                className="icon-placeholder"
                style={{ backgroundColor: "#ea580c" }}
              >
                ✉️
              </div>
              <span>info@qozon.uz</span>
            </div>
          </div>
        </header>

        <section className="hero-section hero-section"
          style={{
            backgroundImage: "url('../7.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="container hero-content ">
            <div data-aos="fade-up">
              <h1 className="hero-title">
                O'zbekistonning cho'yan qozonlari
                <br /> kafolat bilan
              </h1>
              <p className="hero-description">
                Bugun buyurtma bering va ertaga yetkazib berish bilan
                O'zbekistonning haqiqiy qozonlarida pishirishni boshlang!
              </p>
              <div className="hero-buttons">
                <button style={{
                  color:'#FF4D00'
                  
                }} className="hero-button hero-button-secondary ">
                  Katalogga o'tish
                </button>
                <button style={{
                  color:'#FF4D00'
                }} className="hero-button hero-button-secondary">
                  Aloqa
                </button>
              </div>
            </div>

            <img data-aos="fade-up"
              className="img1"
              src="6.png"
              alt="Qozon taom bilan"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />

          </div>
        </section>

        <section className="benefits-section">
          <div className="container">
            <h2 data-aos="fade-up" className="section-title">Nima uchun bizni tanlaysiz?</h2>
            <div className="benefits-grid">
              <div data-aos="fade-up" className="benefits-card">
                <div className="icon-placeholder">📦</div>
                <h3>Eng sifatli materiallar</h3>
                <p>
                  Biz faqat eng yuqori sifatli cho'yan va toshlardan
                  foydalanamiz.
                </p>
              </div>
              <div data-aos="fade-up" className="benefits-card">
                <div className="icon-placeholder">🏆</div>
                <h3>Kafolat</h3>
                <p>Barcha mahsulotlarimizga rasmiy kafolat beriladi.</p>
              </div>
              <div data-aos="fade-up" className="benefits-card">
                <div className="icon-placeholder">🚚</div>
                <h3>Tez yetkazib berish</h3>
                <p>O'zbekiston bo'ylab tez va ishonchli yetkazib berish.</p>
              </div>
              <div data-aos="fade-up" className="benefits-card">
                <div className="icon-placeholder">⭐</div>
                <h3>Mijozlar mamnuniyati</h3>
                <p>Minglab mamnun mijozlar bizni tavsiya qiladi.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews-section">
          <div className="container">
            <h2 data-aos="fade-up" className="section-title">
              Bizning saytimizda 400 dan ortiq ijobiy sharhlar mavjud
            </h2>
            <div className="reviews-grid">
              <div data-aos="fade-up" className="review-card">
                <img
                  src="21.png"
                  alt="Mijoz surati"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
                <p>Ali Valiyev</p>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="star-placeholder"></div>
                  ))}
                </div>
                <p>
                  "Qozon judayam ajoyib! Sifati yuqori, yetkazib berish tez.
                  Hammaga tavsiya qilaman!"
                </p>
              </div>
              <div data-aos="fade-up" className="review-card">
                <img
                  src="22.png"
                  alt="Mijoz surati"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
                <p>Dilnoza Olimova</p>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="star-placeholder"></div>
                  ))}
                </div>
                <p>
                  "Ajoyib xarid! Qozon o'zining vazifasini to'liq bajaradi. Tez
                  orada yana buyurtma beraman."
                </p>
              </div>
              <div data-aos="fade-up" className="review-card">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
                  alt="Mijoz surati"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
                <p>Jasur Hasanov</p>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="star-placeholder"></div>
                  ))}
                </div>
                <p>
                  "Men bu qozonni do'stlarimga ham tavsiya qildim. Hamma
                  xursand. Rahmat!"
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="delivery-payment-section">
          <div className="container">
            <h2 data-aos="fade-up" className="section-title">
              Yetkazib berish va to'lov usullari
            </h2>
            <div className="delivery-payment-grid">
              <div data-aos="fade-up" className="delivery-payment-card">
                <div className="icon-placeholder icon-blue">🚛</div>
                <h3>Yetkazib berish</h3>
                <p>
                  O'zbekiston bo'ylab barcha hududlarga tez va ishonchli
                  yetkazib berish.
                </p>
              </div>
              <div data-aos="fade-up" className="delivery-payment-card">
                <div className="icon-placeholder icon-green">💳</div>
                <h3>To'lov usullari</h3>
                <p>
                  Naqd pul, bank kartasi va elektron to'lovlar orqali to'lash
                  imkoniyati.
                </p>
              </div>
              <div data-aos="fade-up" className="delivery-payment-card">
                <div className="icon-placeholder icon-purple">📍</div>
                <h3>Manzil</h3>
                <p>
                  Bizning ofisimiz va omborimiz Toshkent shahrida joylashgan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="product-details-section">
          <div className="container product-details-content">
            <div data-aos="fade-up" className="product-image-container">
              <img
                className="img1"
                src="16.png"
                alt="Grand Metall Invest Qozoni"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div data-aos="fade-up" className="product-info">
              <h2>
                Grand Metall Invest kompaniyasining original <br /> O'zbekiston cho'yan
                qozonlari
              </h2>
              <p>Kafolat bilan, sifat va ishonchlilikka ega bo'ling.</p>
              <ul className="product-features">
                <li>
                  <span className="bullet-point">&bull;</span>
                  Yuqori sifatli cho'yan.
                </li>
                <li>
                  <span className="bullet-point">&bull;</span>
                  Bardoshli va uzoq umr ko'radi.
                </li>
                <li>
                  <span className="bullet-point">&bull;</span>
                  Issiqlikni bir tekis taqsimlaydi.
                </li>
                <li>
                  <span className="bullet-point">&bull;</span>
                  Turli hajmdagi qozonlar mavjud.
                </li>
                <li>
                  <span className="bullet-point">&bull;</span>
                  Oson tozalanishi.
                </li>
              </ul>
              <div className="product-order-button-container">
                <button className="product-order-button">
                  Buyurtma berish
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="more-products-section">
          <div className="container">
            <h2 data-aos="fade-up" className="section-title">Boshqa mahsulotlarimiz</h2>
            <div className="more-products-grid">
              <div data-aos="fade-up" className="product-variation-card">
                <img
                  src="18.png"
                  alt="Kichik qozon"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
                <h3>Kichik hajmli qozon</h3>
                <p>Oilaviy taomlar uchun ideal.</p>
              </div>
              <div data-aos="fade-up" className="product-variation-card">
                <img
                  src="17.png"
                  alt="O'rta qozon"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
                <h3>O'rta hajmli qozon</h3>
                <p>Mehmondorlik uchun qulay.</p>
              </div>
              <div data-aos="fade-up" className="product-variation-card">
                <img
                  src="19.png"
                  alt="Katta qozon"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
                <h3>Katta hajmli qozon</h3>
                <p>Katta oilalar va tadbirlar uchun.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="recipe-generator-section">
          <div className="container recipe-generator-content">
            <h2 className="section-title">✨ Retseptlar Generator ✨</h2>
            <textarea
              placeholder="Qozonda pishirmoqchi bo'lgan ingredientlaringizni kiriting (masalan: go'sht, kartoshka, sabzi, guruch)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
            <button onClick={generateRecipe} disabled={loading}>
              {loading ? (
                <>
                  <div className="loading-spinner"></div> Retsept
                  yaratilmoqda...
                </>
              ) : (
                "Retsept yaratish ✨"
              )}
            </button>
            {error && <p className="error-message">{error}</p>}
            {recipe && <div className="recipe-output">{recipe}</div>}
          </div>
        </section>
        <div className="big-diV">

          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-full max-w-full mx-auto"
            style={{ padding: "20px 0" }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >


            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-4 text-left mx-auto">
                  {/* Rasm joyi */}
                  <div className="w-full h-36 bg-gray-300 rounded-lg mb-4">
                    <img src={card.image} alt="xcvb " />
                  </div>

                  {/* Sarlavha */}
                  <h3 className="text-lg font-semibold mt-4">{card.title}</h3>

                  {/* Tafsilotlar */}
                  <details className="mt-2 cursor-pointer">
                    <summary className="text-sm text-orange-600">🟡 Qanday foydasi bor?</summary>
                  </details>
                  <details className="mt-1 cursor-pointer">
                    <summary className="text-sm text-orange-500">🟠 Xususiyatlari</summary>
                  </details>

                  {/* Tanlov (hajm) */}
                  <div className="mt-4">
                    <label className="block mb-1 text-sm">Hajmi</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                      <option value="8">{card.sizeOptions}</option>
                    </select>
                  </div>

                  {/* Narx qismi */}
                  <div className="mt-3 text-sm">
                    <span className="line-through text-gray-400 mr-2">{card.oldPrice}</span>
                    <span className="font-semibold text-orange-500">{card.newPrice}</span>
                    <span className="block text-gray-500 mt-1">To‘plam narxi</span>
                  </div>

                  {/* Tugmalar */}
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 text-xl rounded-full shadow">
                      Sotib olish
                    </button>
                    <button className="w-10 h-10 border border-orange-500 text-orange-500 rounded-full flex items-center justify-center text-xl font-bold">
                      <ShoppingCart size={18} />
                      <span className="-ml-1">+</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
<div className="wrapper">
          <div  data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="2500">
            <input type="text" name="" id="inp" placeholder='name' data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2600" />
            <input type="text" name="" id="inp" placeholder='e-mail' data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2700" />
            <input type="text" name="" id="inp" placeholder='phone number' data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2800" />
            <button id='btn' data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="3000">sent</button>
          </div>
          <div className="didi">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d47959.550853570654!2d69.16220809475097!3d41.29859602594643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1750353551647!5m2!1sen!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2500"></iframe>
          </div>
        </div>
        <footer className="footer">
          <p className="footer-promo-text">
            Hoziroq buyurtma bering va 10% chegirmaga ega bo'ling!
          </p>
          <div className="footer-contact-grid">
            <div className="footer-contact-item">
              <div
                className="icon-placeholder"
                style={{ backgroundColor: "#fdba74" }}
              >
                📞
              </div>
              <span>+998 (90) 123-45-67</span>
            </div>
            <div className="contact-item">
              <div
                className="icon-placeholder"
                style={{ backgroundColor: "#fdba74" }}
              >
                ✉️
              </div>
              <span>info@qozon.uz</span>
            </div>
            <div className="contact-item">
              <div
                className="icon-placeholder"
                style={{ backgroundColor: "#fdba74" }}
              >
                📍
              </div>
              <span>Toshkent shahri, O'zbekiston</span>
            </div>
          </div>
          <p className="footer-copyright">
            &copy; 2025 QozonMarket. Barcha huquqlar himoyalangan.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
