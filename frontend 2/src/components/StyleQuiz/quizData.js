// File: /Users/harimanivannan/Documents/GitHub/ai-stylist/frontend/src/components/StyleQuiz/quizData.js

// Quiz questions with options and style points
export const quizQuestions = [
  {
    id: 'q1',
    text: 'Which color palette do you gravitate towards the most?',
    type: 'image',
    options: [
      {
        id: 'q1a1',
        text: 'Neutrals & Earth Tones',
        imageUrl: 'https://via.placeholder.com/300x300?text=Neutrals',
        stylePoints: { classic: 2, minimalist: 3, bohemian: 1 }
      },
      {
        id: 'q1a2',
        text: 'Bold & Vibrant Colors',
        imageUrl: 'https://via.placeholder.com/300x300?text=Bold+Colors',
        stylePoints: { streetwear: 2, bohemian: 2, romantic: 1 }
      },
      {
        id: 'q1a3',
        text: 'Pastels & Soft Hues',
        imageUrl: 'https://via.placeholder.com/300x300?text=Pastels',
        stylePoints: { romantic: 3, preppy: 2, minimalist: 1 }
      },
      {
        id: 'q1a4',
        text: 'Monochrome (Black, White, Gray)',
        imageUrl: 'https://via.placeholder.com/300x300?text=Monochrome',
        stylePoints: { minimalist: 3, streetwear: 2, classic: 1 }
      }
    ]
  },
  {
    id: 'q2',
    text: 'What type of shoes do you wear most often?',
    type: 'text',
    options: [
      {
        id: 'q2a1',
        text: 'Sneakers or Athletic Shoes',
        stylePoints: { casual: 3, streetwear: 2, athleisure: 3 }
      },
      {
        id: 'q2a2',
        text: 'Loafers, Oxfords, or Dress Shoes',
        stylePoints: { classic: 3, preppy: 2, minimalist: 1 }
      },
      {
        id: 'q2a3',
        text: 'Boots (Combat, Chelsea, etc.)',
        stylePoints: { streetwear: 2, bohemian: 2, casual: 1 }
      },
      {
        id: 'q2a4',
        text: 'Sandals or Open-Toed Shoes',
        stylePoints: { bohemian: 3, romantic: 2, casual: 1 }
      }
    ]
  },
  {
    id: 'q3',
    text: 'How would you describe your ideal weekend outfit?',
    type: 'text',
    options: [
      {
        id: 'q3a1',
        text: 'Comfortable athleisure (leggings/joggers, hoodie)',
        stylePoints: { athleisure: 3, casual: 2, streetwear: 1 }
      },
      {
        id: 'q3a2',
        text: 'Jeans and a nice top or button-down',
        stylePoints: { casual: 3, classic: 2, preppy: 1 }
      },
      {
        id: 'q3a3',
        text: 'Flowy dress or skirt with accessories',
        stylePoints: { romantic: 3, bohemian: 2, preppy: 1 }
      },
      {
        id: 'q3a4',
        text: 'Trendy statement pieces (oversized jacket, unique pants)',
        stylePoints: { streetwear: 3, bohemian: 1, minimalist: 1 }
      }
    ]
  },
  {
    id: 'q4',
    text: 'Which fashion icons or celebrities inspire your style the most?',
    type: 'image',
    options: [
      {
        id: 'q4a1',
        text: 'Classic Icons (Audrey Hepburn, Cary Grant)',
        imageUrl: 'https://via.placeholder.com/300x300?text=Classic+Icons',
        stylePoints: { classic: 3, minimalist: 2, preppy: 1 }
      },
      {
        id: 'q4a2',
        text: 'Streetwear Influencers (Rihanna, A$AP Rocky)',
        imageUrl: 'https://via.placeholder.com/300x300?text=Streetwear+Icons',
        stylePoints: { streetwear: 3, casual: 1, athleisure: 1 }
      },
      {
        id: 'q4a3',
        text: 'Bohemian Artists (Zoe Kravitz, Harry Styles)',
        imageUrl: 'https://via.placeholder.com/300x300?text=Bohemian+Icons',
        stylePoints: { bohemian: 3, romantic: 1, streetwear: 1 }
      },
      {
        id: 'q4a4',
        text: 'Minimalist Trendsetters (Kendall Jenner, Zendaya)',
        imageUrl: 'https://via.placeholder.com/300x300?text=Minimalist+Icons',
        stylePoints: { minimalist: 3, classic: 1, streetwear: 1 }
      }
    ]
  },
  {
    id: 'q5',
    text: 'How do you feel about patterns and prints?',
    type: 'text',
    options: [
      {
        id: 'q5a1',
        text: 'Love them! The bolder and more colorful, the better',
        stylePoints: { bohemian: 3, romantic: 2, streetwear: 1 }
      },
      {
        id: 'q5a2',
        text: 'Prefer subtle patterns like stripes or small florals',
        stylePoints: { preppy: 2, classic: 2, casual: 1 }
      },
      {
        id: 'q5a3',
        text: 'Only wear them occasionally as an accent',
        stylePoints: { minimalist: 2, classic: 2, casual: 1 }
      },
      {
        id: 'q5a4',
        text: 'Avoid them - I prefer solid colors',
        stylePoints: { minimalist: 3, athleisure: 1, classic: 1 }
      }
    ]
  }
];

// Style profiles with descriptions and recommendations
export const styleProfiles = {
  classic: {
    style: 'classic',
    title: 'Timeless Classic',
    description: 'You appreciate timeless elegance and quality over trendy pieces. Your style is sophisticated, polished, and stands the test of time.',
    characteristics: [
      'Quality over quantity',
      'Neutral color palette',
      'Tailored silhouettes',
      'Timeless pieces',
      'Sophisticated accessories'
    ],
    celebrities: [
      'Audrey Hepburn',
      'Meghan Markle',
      'George Clooney',
      'Kate Middleton'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Classic+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Tailored blazer', 'White button-down shirt', 'Dark wash jeans', 'Trench coat', 'Little black dress']
      },
      {
        category: 'Colors',
        items: ['Navy', 'Camel', 'White', 'Black', 'Gray']
      },
      {
        category: 'Accessories',
        items: ['Pearl earrings', 'Leather watch', 'Structured handbag', 'Silk scarf']
      }
    ]
  },
  casual: {
    style: 'casual',
    title: 'Effortless Casual',
    description: 'Your style is relaxed, comfortable, and approachable. You value ease and versatility in your wardrobe while still looking put-together.',
    characteristics: [
      'Comfort-focused',
      'Relaxed silhouettes',
      'Versatile pieces',
      'Practical and functional',
      'Effortless vibe'
    ],
    celebrities: [
      'Jennifer Aniston',
      'Chris Hemsworth',
      'Emma Stone',
      'Mark Wahlberg'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Casual+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Well-fitted jeans', 'T-shirts', 'Casual button-downs', 'Comfortable sweaters', 'Versatile jackets']
      },
      {
        category: 'Colors',
        items: ['Blue', 'Gray', 'White', 'Olive', 'Burgundy']
      },
      {
        category: 'Accessories',
        items: ['Leather belt', 'Canvas sneakers', 'Simple jewelry', 'Crossbody bag']
      }
    ]
  },
  bohemian: {
    style: 'bohemian',
    title: 'Free-Spirited Bohemian',
    description: 'Your style is artistic, free-spirited, and eclectic. You embrace natural fabrics, unique patterns, and globally-inspired designs.',
    characteristics: [
      'Flowy silhouettes',
      'Mixed patterns and textures',
      'Natural fabrics',
      'Artistic expression',
      'Vintage and handcrafted elements'
    ],
    celebrities: [
      'Florence Welch',
      'Sienna Miller',
      'Harry Styles',
      'Zoe Kravitz'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Bohemian+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Maxi dresses', 'Flowy blouses', 'Wide-leg pants', 'Embroidered pieces', 'Suede or fringe details']
      },
      {
        category: 'Colors',
        items: ['Earth tones', 'Turquoise', 'Rust', 'Cream', 'Mustard']
      },
      {
        category: 'Accessories',
        items: ['Statement jewelry', 'Woven bags', 'Ankle boots', 'Patterned scarves']
      }
    ]
  },
  minimalist: {
    style: 'minimalist',
    title: 'Modern Minimalist',
    description: 'Your style is clean, streamlined, and focused on simplicity. You value quality materials, clean lines, and a less-is-more approach.',
    characteristics: [
      'Clean lines',
      'Monochromatic palette',
      'Quality over quantity',
      'Thoughtful simplicity',
      'Functional design'
    ],
    celebrities: [
      'Kendall Jenner',
      'Victoria Beckham',
      'Ryan Gosling',
      'Tilda Swinton'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Minimalist+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Tailored trousers', 'Simple t-shirts', 'Sleek dresses', 'Structured coats', 'Well-cut basics']
      },
      {
        category: 'Colors',
        items: ['Black', 'White', 'Gray', 'Navy', 'Camel']
      },
      {
        category: 'Accessories',
        items: ['Simple watch', 'Sleek leather bag', 'Minimal jewelry', 'Clean-lined shoes']
      }
    ]
  },
  streetwear: {
    style: 'streetwear',
    title: 'Urban Streetwear',
    description: 'Your style is bold, contemporary, and influenced by urban culture. You embrace graphic elements, statement pieces, and the latest trends.',
    characteristics: [
      'Oversized silhouettes',
      'Graphic elements',
      'Mix of high and low fashion',
      'Sneaker culture',
      'Statement pieces'
    ],
    celebrities: [
      'Rihanna',
      'A$AP Rocky',
      'Billie Eilish',
      'Travis Scott'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Streetwear+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Graphic tees', 'Hoodies', 'Track pants', 'Bomber jackets', 'Statement sneakers']
      },
      {
        category: 'Colors',
        items: ['Black', 'White', 'Bold accents', 'Neon touches', 'Primary colors']
      },
      {
        category: 'Accessories',
        items: ['Snapback caps', 'Crossbody bags', 'Statement sneakers', 'Chain jewelry']
      }
    ]
  },
  romantic: {
    style: 'romantic',
    title: 'Soft Romantic',
    description: 'Your style is feminine, delicate, and dreamy. You embrace soft fabrics, flowing silhouettes, and subtle, pretty details.',
    characteristics: [
      'Soft silhouettes',
      'Delicate details',
      'Feminine touches',
      'Floral patterns',
      'Gentle color palette'
    ],
    celebrities: [
      'Taylor Swift',
      'Dakota Johnson',
      'Lily Collins',
      'Timothée Chalamet'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Romantic+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Floral dresses', 'Lace details', 'Soft blouses', 'A-line skirts', 'Cardigans']
      },
      {
        category: 'Colors',
        items: ['Blush pink', 'Lavender', 'Powder blue', 'Cream', 'Soft neutrals']
      },
      {
        category: 'Accessories',
        items: ['Delicate jewelry', 'Hair accessories', 'Ballet flats', 'Small structured bags']
      }
    ]
  },
  athleisure: {
    style: 'athleisure',
    title: 'Active Athleisure',
    description: 'Your style blends athletic wear with casual pieces for a sporty yet stylish look. You value comfort, functionality, and a modern aesthetic.',
    characteristics: [
      'Performance fabrics',
      'Sporty elements',
      'Comfortable yet stylish',
      'Functional design',
      'Clean lines'
    ],
    celebrities: [
      'Gigi Hadid',
      'Dwayne Johnson',
      'Hailey Bieber',
      'Michael B. Jordan'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Athleisure+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Leggings/joggers', 'Performance tops', 'Sleek hoodies', 'Sporty jackets', 'Fashionable sneakers']
      },
      {
        category: 'Colors',
        items: ['Black', 'Gray', 'White', 'Navy', 'Pops of neon']
      },
      {
        category: 'Accessories',
        items: ['Sporty watches', 'Backpacks', 'Athletic socks', 'Baseball caps']
      }
    ]
  },
  preppy: {
    style: 'preppy',
    title: 'Polished Preppy',
    description: 'Your style is clean, traditional, and put-together. You embrace classic American sportswear with a collegiate influence.',
    characteristics: [
      'Crisp, clean lines',
      'Traditional patterns',
      'Collegiate influence',
      'Polished appearance',
      'Coordinated look'
    ],
    celebrities: [
      'Reese Witherspoon',
      'Chris Evans',
      'Blake Lively',
      'Eddie Redmayne'
    ],
    imageUrl: 'https://via.placeholder.com/800x400?text=Preppy+Style',
    recommendations: [
      {
        category: 'Key Pieces',
        items: ['Oxford shirts', 'Polo shirts', 'Chinos', 'Blazers', 'Sweaters']
      },
      {
        category: 'Colors',
        items: ['Navy', 'Red', 'White', 'Kelly green', 'Pastels']
      },
      {
        category: 'Accessories',
        items: ['Loafers', 'Boat shoes', 'Pearl jewelry', 'Structured bags']
      }
    ]
  }
};