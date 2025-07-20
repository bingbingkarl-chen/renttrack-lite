const properties = [
  {
    id: 1,
    title: "Modern Apartment in Berlin",
    location: "Berlin, Germany",
    rent: "€1,200",
    deposit: "€2,400",
    isPaid: true, // ✅
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&h=300&q=80",
    tenant: {
      name: "John",
      moveInDate: "2024-03-15",
    },
    description:
      "A modern, bright apartment in the heart of Berlin. Close to public transport and shopping.",
    rentRecords: [
      { month: "Jan", paid: false },
      { month: "Feb", paid: false },
      { month: "Mar", paid: false },
      { month: "Apr", paid: false },
      { month: "May", paid: false },
      { month: "Jun", paid: false },
      { month: "Jul", paid: false },
      { month: "Aug", paid: false },
      { month: "Sep", paid: false },
      { month: "Oct", paid: false },
      { month: "Nov", paid: false },
      { month: "Dec", paid: false },
    ],
  },
  {
    id: 2,
    title: "Cozy Flat in Guangxi",
    location: "Qinzhou, China",
    rent: "¥2,800",
    deposit: "¥5,600",
    isPaid: false, // ❌
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    tenant: {
      name: "John",
      moveInDate: "2024-03-15",
    },
    description:
      "A cozy flat with a beautiful view of the city. Perfect for students or young professionals.",
    rentRecords: [
      { month: "Jan", paid: false },
      { month: "Feb", paid: false },
      { month: "Mar", paid: false },
      { month: "Apr", paid: false },
      { month: "May", paid: false },
      { month: "Jun", paid: false },
      { month: "Jul", paid: false },
      { month: "Aug", paid: false },
      { month: "Sep", paid: false },
      { month: "Oct", paid: false },
      { month: "Nov", paid: false },
      { month: "Dec", paid: false },
    ],
  },
];

export default properties;
