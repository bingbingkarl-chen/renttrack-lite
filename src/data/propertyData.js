// src/data/properties.js
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Berlin",
    location: "Berlin, Germany",
    rent: "€1,200",
    deposit: "€2,400",
    isPaid: true, // ✅ 
    image: "https://source.unsplash.com/400x300/?apartment,berlin"
  },
  {
    id: 2,
    title: "Cozy Flat in Guangxi",
    location: "Qinzhou, China",
    rent: "¥2,800",
    deposit: "¥5,600",
    isPaid: false, // ❌ 
    image: "https://source.unsplash.com/400x300/?apartment,china"
  }
];

export default properties;