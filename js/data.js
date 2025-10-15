const mockData = {
  products: [
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      price: 3499,
      image: 'https://source.unsplash.com/400x300/?handloom',
      category: 'Sarees'
    },
    {
      id: 2,
      name: 'Handwoven Cotton Shawl',
      price: 1299,
      image: 'https://source.unsplash.com/400x300/?fabric',
      category: 'Shawls'
    },
    {
      id: 3,
      name: 'Block Print Kurta Fabric',
      price: 999,
      image: 'https://source.unsplash.com/400x300/?textile',
      category: 'Fabric'
    },
    {
      id: 4,
      name: 'Chanderi Dupatta',
      price: 1899,
      image: 'https://source.unsplash.com/400x300/?loom',
      category: 'Dupatta'
    }
  ],
  blog: [
    {
      id: 1,
      title: 'Reviving Ancient Weaving',
      content: 'Discover how artisans are keeping age-old weaving traditions alive with modern designs.',
      image: 'https://source.unsplash.com/400x300/?weaving'
    },
    {
      id: 2,
      title: 'Sustainable Fabrics',
      content: 'Learn about eco-friendly dyeing techniques and fabrics that help the environment.',
      image: 'https://source.unsplash.com/400x300/?sustainable-fabric'
    },
    {
      id: 3,
      title: 'Marketing for Growth',
      content: 'SEO tips and digital marketing strategies to help handloom businesses grow globally.',
      image: 'https://source.unsplash.com/400x300/?marketing'
    }
  ],
  user: {
    name: 'Prakash',
    email: 'prakash@example.com',
    orders: [
      {
        id: 1201,
        date: '2025-08-26',
        status: 'Completed',
        total: 220.00
      },
      {
        id: 1202,
        date: '2025-08-25',
        status: 'Pending',
        total: 140.00
      }
    ]
  },
  cart: {
    items: [
        {
            productId: 1,
            name: 'Banarasi Silk Saree',
            price: 3499,
            quantity: 1,
            image: 'https://source.unsplash.com/100x100/?saree'
        },
        {
            productId: 2,
            name: 'Handwoven Cotton Shawl',
            price: 1299,
            quantity: 2,
            image: 'https://source.unsplash.com/100x100/?shawl'
        }
    ],
    subtotal: 6097,
    tax: 304.85,
    total: 6401.85
  }
};