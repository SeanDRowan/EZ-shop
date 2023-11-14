const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Clothing' },
    { name: 'House Supplies' },
    { name: 'Electronics' },
    { name: 'Health & beauty' },
    { name: 'Outdoor & Adventure' },
    { name: 'Fitness' },
    { name: 'Eco-Friendly' },
    { name: 'Food & Beverage' },
    { name: 'Plants & Gardening' },
    { name: 'Offices Accessories' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Classic Leather Jacket',
      description:
        'A timeless black leather jacket for a sleek and stylish look.',
      image: 'leatherJacket.png',
      category: categories[0]._id,
      price: 199.99,
      quantity: 50
    },
    {
      name: 'Smart Watch',
      description:
        'Stay connected and monitor your health with this feature-packed smartwatch.',
      image: 'smartWatch.png',
      category: categories[2]._id,
      price: 129.99,
      quantity: 100
    },
    {
      name: 'Vintage Polaroid Camera',
      category: categories[2]._id,
      description:
        'Capture memories in retro style with this vintage Polaroid camera.',
      image: 'polaroidCamera.png',
      price: 79.99,
      quantity: 30
    },
    {
      name: 'Handcrafted Ceramic Mug',
      category: categories[1]._id,
      description:
        'Enjoy your morning coffee in a unique, handcrafted ceramic mug.',
      image: 'ceramicMug.png',
      price: 14.99,
      quantity: 200
    },
    {
      name: 'Bluetooth Headphones',
      category: categories[2]._id,
      description:
        'Immerse yourself in music with these wireless Bluetooth headphones.',
      image: 'bluetoothHeadphones.png',
      price: 49.99,
      quantity: 80
    },
    {
      name: 'Organic Lavender Essential Oil',
      category: categories[3]._id,
      description:
        'Relax and unwind with the soothing aroma of organic lavender oil',
      image: 'lavenderOil.png',
      price: 19.99,
      quantity: 150
    },
    {
      name: 'Gaming Laptop',
      category: categories[2]._id,
      description:
        'Level up your gaming experience with a high-performance gaming laptop.',
      image: 'gamingLaptop.png',
      price: 1199.99,
      quantity: 20
    },
    {
      name: 'Eco-Friendly Bamboo Toothbrush',
      category: categories[3]._id,
      description:
        'Reduce plastic waste with these eco-friendly bamboo toothbrushes.',
      image: 'bambooToothbrush.png',
      price: 3.99,
      quantity: 300
    },
    {
      name: 'Fitness Resistance Bands Set',
      category: categories[5]._id,
      description: 
        'Stay fit and tone your muscles with this set of resistance bands.',
      image: 'fitnessBands.png',
      price: 24.99,
      quantity: 100
    },
    {
      name: 'Chefs Knife Set',
      category: categories[1]._id,
      description:
        'Upgrade your kitchen with a high-quality chefs knife set.',
      image: 'knifeSet.png',
      price: 79.99,
      quantity: 50
    },
    {
      name: 'Bohemian Throw Pillow Covers',
      category: categories[1]._id,
      description:
        'Add a touch of boho chic to your home with these throw pillow covers.',
      image: 'pillowCovers.png',
      price: 16.99,
      quantity: 120
    },
    {
      name: 'Yoga Mat',
      category: categories[5]._id,
      description:
        'Achieve balance and flexibility with a durable and non-slip yoga mat.',
      image: 'yogaMat.png',
      price: 29.99,
      quantity: 70
    },
    {
      name: 'Vintage Vinyl Record Player',
      category: categories[2]._id,
      description:
        'Rediscover the magic of vinyl records with this vintage record player.',
      image: 'recordPlayer.png',
      price: 149.99,
      quantity: 40
    },
    {
      name: 'Aromatherapy Diffuser',
      category: categories[1]._id,
      description:
        'Create a calming atmosphere with this essential oil aromatherapy diffuser.',
      image: 'aromathearpyDiffuser.png',
      price: 34.99,
      quantity: 90
    },
    {
      name: 'Reusable Shopping Bags',
      category: categories[6]._id,
      description:
        'Reduce plastic waste with these durable and eco-friendly shopping bags.',
      image: 'shoppingBags.png',
      price: 9.99,
      quantity: 250
    },
    {
      name: 'Leather Travel Backpack',
      category: categories[4]._id,
      description:
        'Travel in style with this spacious and elegant leather backpack.',
      image: 'leatherBackpack.png',
      price: 89.99,
      quantity: 60
    },
    {
      name: 'Wireless Charging Pad',
      category: categories[2]._id,
      description:
        'Charge your devices wirelessly with this sleek charging pad.',
      image: 'chargingPad.png',
      price: 19.99,
      quantity: 120
    },
    {
      name: ' Wall-Mounted Floating Shelves',
      category: categories[1]._id,
      description:
        'Display your favorite items with these modern floating shelves.',
      image: 'floatingShelf.png',
      price: 26.99,
      quantity: 80
    },
    {
      name: 'Organic Matcha Green Tea',
      category: categories[7]._id,
      description:
        'Enjoy the health benefits of organic matcha green tea.',
      image: 'greenTea.png',
      price: 19.99,
      quantity: 100
    },
    {
      name: 'Noise-Canceling Headphones',
      category: categories[2]._id,
      description:
        'Block out distractions with these premium noise-canceling headphones.',
      image: 'noiseCancelling.png',
      price: 159.99,
      quantity: 40
    },
    {
      name: 'Succulent Plant Assortment',
      category: categories[8]._id,
      description:
        'Add charm to your space with a variety of potted succulents.',
      image: 'succulents.png',
      price: 24.99,
      quantity: 150
    },
    {
      name: 'French Press Coffee Maker',
      category: categories[1]._id,
      description:
        'Brew rich and flavorful coffee with this classic French press.',
      image: 'frenchCoffee.png',
      price: 29.99,
      quantity: 70
    },
    {
      name: 'Boho Tassel Earrings',
      category: categories[0]._id,
      description:
        'Elevate your style with these trendy boho tassel earrings.',
      image: 'bohoEarrings.png',
      price: 12.99,
      quantity: 200 
    },
    {
      name: 'Portable Bluetooth Speaker',
      category: categories[2]._id,
      description:
        'Take your music anywhere with this portable Bluetooth speaker.',
      image: 'bluetoothSpeaker.png',
      price: 39.99,
      quantity: 90
    },
    {
      name: 'Bamboo Laptop Stand',
      category: categories[9]._id,
      description:
        'Enhance your workspace ergonomics with this bamboo laptop stand.',
      image: 'bambooLaptop.png',
      price: 19.99,
      quantity: 120
    },
    {
      name: 'Outdoor Camping Tent',
      category: categories[4]._id,
      description:
        'Enjoy the great outdoors with this durable and spacious camping tent.',
      image: 'tent.png',
      price: 89.99,
      quantity: 30
    },
    {
      name: 'Portable External Battery Pack',
      category: categories[2]._id,
      description:
        'Keep your devices charged on the go with this high-capacity battery pack.',
      image: 'batteryPack.png',
      price: 34.99,
      quantity: 60
    },
    {
      name: 'Crystal Healing Set',
      category: categories[3]._id,
      description:
        'Harness the power of crystals with this curated crystal healing set.',
      image: 'crystalHealing.png',
      price: 29.99,
      quantity: 80
    },
    {
      name: 'Vintage Map Wall Art',
      category: categories[1]._id,
      description:
        'Add a touch of wanderlust to your home with vintage map wall art.',
      image: 'wallMap.png',
      price: 29.99,
      quantity: 100
    },
    {
      name: 'Mini Drone with HD Camera',
      category: categories[2]._id,
      description:
        'Capture breathtaking aerial shots with this mini drone.',
      image: 'miniDrone.png',
      price: 79.99,
      quantity: 40
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
