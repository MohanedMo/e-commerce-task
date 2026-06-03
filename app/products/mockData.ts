import type { Product, Category } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  { slug: "beauty", name: "Beauty", url: "" },
  { slug: "fragrances", name: "Fragrances", url: "" },
  { slug: "furniture", name: "Furniture", url: "" },
  { slug: "groceries", name: "Groceries", url: "" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "The Essence Mascara Lash Princess Volume Mascara features a unique cobra-shaped brush that covers every single lash for dramatic volume and curl.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    sku: "RCH15711",
    weight: 2,
    dimensions: { width: 23.17, height: 14.43, depth: 28.01 },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "Low Stock",
    reviews: [
      {
        rating: 2,
        comment: "Very unhappy with the purchase!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "John Doe",
        reviewerEmail: "john.doe@x.mock"
      },
      {
        rating: 5,
        comment: "Great value for money!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Nolan Evans",
        reviewerEmail: "nolan.evans@x.mock"
      }
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 24,
    meta: {
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      barcode: "9164035108688",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png"
    },
    images: ["https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"],
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
  },
  {
    id: 2,
    title: "Eyeshadow Palette with 9 shades",
    description: "The Eyeshadow Palette with 9 shades offers a versatile range of colors from matte to shimmer, perfect for creating both everyday and evening looks.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 5.5,
    rating: 4.85,
    stock: 44,
    tags: ["beauty", "eyeshadow"],
    brand: "Glamour",
    sku: "EYESH9SH",
    weight: 4,
    dimensions: { width: 12.5, height: 1.2, depth: 12.5 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 2-3 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Excellent colors and pigmentation!",
        date: "2024-05-20T10:30:00.000Z",
        reviewerName: "Sarah Connor",
        reviewerEmail: "sarah.c@x.mock"
      }
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-20T10:30:00.000Z",
      updatedAt: "2024-05-20T10:30:00.000Z",
      barcode: "1234567890123",
      qrCode: ""
    },
    images: ["https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%209%20shades/1.png"],
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%209%20shades/thumbnail.png"
  },
  {
    id: 3,
    title: "Powder Canister",
    description: "A finely milled setting powder in a convenient canister, designed to matte the skin and lock makeup in place all day.",
    category: "beauty",
    price: 14.99,
    discountPercentage: 10.12,
    rating: 4.5,
    stock: 12,
    tags: ["beauty", "powder"],
    brand: "Flawless",
    sku: "POWDCAN",
    weight: 3,
    dimensions: { width: 8.0, height: 8.0, depth: 4.5 },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "No returns",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-21T11:00:00.000Z",
      updatedAt: "2024-05-21T11:00:00.000Z",
      barcode: "3210987654321",
      qrCode: ""
    },
    images: ["https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png"],
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
  },
  {
    id: 4,
    title: "Perfume Oil",
    description: "A luxury concentrated perfume oil with a rich blend of floral and woody notes, offering a long-lasting personal fragrance experience.",
    category: "fragrances",
    price: 24.99,
    discountPercentage: 12.5,
    rating: 4.7,
    stock: 15,
    tags: ["fragrances", "perfume"],
    brand: "Al-Rehab",
    sku: "PERFOIL1",
    weight: 1,
    dimensions: { width: 4.0, height: 10.0, depth: 4.0 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2-4 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-22T09:00:00.000Z",
      updatedAt: "2024-05-22T09:00:00.000Z",
      barcode: "4567890123456",
      qrCode: ""
    },
    images: ["https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Mademoiselle%20Intense/1.png"],
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Mademoiselle%20Intense/thumbnail.png"
  },
  {
    id: 5,
    title: "Brown Perfume",
    description: "An elegant fragrance for men, with earthy undertones and notes of cedar, leather, and citrus.",
    category: "fragrances",
    price: 49.99,
    discountPercentage: 8.4,
    rating: 4.3,
    stock: 8,
    tags: ["fragrances", "men"],
    brand: "Royall",
    sku: "BROWNPERF",
    weight: 2,
    dimensions: { width: 6.0, height: 12.0, depth: 6.0 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2-4 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-22T10:00:00.000Z",
      updatedAt: "2024-05-22T10:00:00.000Z",
      barcode: "5678901234567",
      qrCode: ""
    },
    images: ["https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de5/1.png"],
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de5/thumbnail.png"
  },
  {
    id: 6,
    title: "Bedside Table",
    description: "A compact wooden bedside table with two drawers, perfect for keeping nighttime essentials close at hand.",
    category: "furniture",
    price: 89.99,
    discountPercentage: 15.0,
    rating: 4.6,
    stock: 20,
    tags: ["furniture", "bedroom"],
    brand: "OakWood",
    sku: "BEDTABLE1",
    weight: 15,
    dimensions: { width: 45.0, height: 60.0, depth: 40.0 },
    warrantyInformation: "2 years warranty",
    shippingInformation: "Ships in 1-2 weeks",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-05-23T12:00:00.000Z",
      updatedAt: "2024-05-23T12:00:00.000Z",
      barcode: "6789012345678",
      qrCode: ""
    },
    images: ["https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table/1.png"],
    thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table/thumbnail.png"
  }
];
