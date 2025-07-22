const transactions = [
  {
    id: 1,
    propertyId: 1,
    type: "income", // income/expense
    category: "rent", // rent, loan, utility, management, other
    amount: 1200,
    currency: "EUR",
    date: "2024-07-20",
    description: "租金到账7月",
    source: "manual",
  },
  {
    id: 2,
    propertyId: 1,
    type: "expense",
    category: "utility",
    amount: 85,
    currency: "EUR",
    date: "2024-07-12",
    description: "Vattenfall 电费",
    source: "manual",
  },
];

export default transactions;
