import { CarInterface } from "../entity/CarEntity";
import { NoImageData } from "./NoImage";


export const CarData: CarInterface[] = [
    {
        id: 1,
        name: "BMW 3 Series",
        year: "2024",
        image: '/assets/images/cars/bmw_3_series.jpg',
        condition: "Used",
        mileage: "15,000 km",
        engineCapacity: "2.0L",
        fuel: "Petrol",
        transmission: "Automatic",
        price: "$45,000",
        description: `A premium compact executive sedan delivering a perfect balance of sharp handling, 
        upscale interior comfort, and advanced driver technology.`,
        properties: [
            { name: "Drive Type", value: "RWD" },
            { name: "Color", value: "Black" }
        ]
    },
    {
        id: 2,
        name: "Ford Ranger Raptor",
        year: "2025",
        image: '/assets/images/cars/ford_ranger_raptor.jpg',
        condition: "New",
        mileage: "0 km",
        engineCapacity: "3.0L V6",
        fuel: "Petrol",
        transmission: "Automatic",
        price: "$80,000",
        description: "The ultimate high-performance off-road bakkie, featuring Fox racing shocks, aggressive styling, and a powerful twin-turbo V6 engine built for desert racing.",
        properties: [
            { name: "Drive Type", value: "4WD" },
            { name: "Color", value: "Conquer Grey" }
        ]
    },
    {
        id: 3,
        image: '/assets/images/cars/honda_crv.jpg',
        name: "Honda CRV",
        year: "2023",
        condition: "Used",
        mileage: "32,000 km",
        engineCapacity: "1.5L Turbo",
        fuel: "Petrol",
        transmission: "CVT",
        price: "$31,500",
        description: "A highly reliable family SUV renowned for its cavernous cabin space, smooth ride, comprehensive safety suite, and excellent resale value.",
        properties: [
            { name: "Drive Type", value: "AWD" },
            { name: "Seats", value: 5 }
        ]
    },
    {
        id: 4,
        name: "Honda Fit",
        image: '/assets/images/cars/honda_fit.jpg',
        year: "2022",
        condition: "Used",
        mileage: "45,000 km",
        engineCapacity: "1.3L",
        fuel: "Petrol",
        transmission: "Automatic",
        price: "$14,000",
        description: "A highly practical and fuel-efficient hatchback famous for its 'Magic Seats' that configuration for maximum cargo flexibility.",
        properties: [
            { name: "Drive Type", value: "FWD" },
            { name: "Fuel Economy", value: "5.5L/100km" }
        ]
    },
    {
        id: 5,
        name: "Honda Vezel",
        image: '/assets/images/cars/honda_vezel.jpg',
        year: "2023",
        condition: "Used",
        mileage: "20,000 km",
        engineCapacity: "1.5L e:HEV",
        fuel: "Hybrid",
        transmission: "e-CVT",
        price: "$26,000",
        description: "A stylish subcompact crossover pairing sleek, coupe-like exterior lines with Honda's highly efficient e:HEV hybrid powertrain.",
        properties: [
            { name: "Drive Type", value: "FWD" },
            { name: "Battery Capacity", value: "0.84 kWh" }
        ]
    },
    {
        id: 6,
        name: "Isuzu X Rider",
        image: '/assets/images/cars/isuzu_x_rider.jpg',
        year: "2024",
        condition: "New",
        mileage: "100 km",
        engineCapacity: "1.9L Turbo",
        fuel: "Diesel",
        transmission: "Manual",
        price: "$38,500",
        description: "A striking and robust special edition double-cab utility vehicle, enhanced with black accents, custom styling elements, and proven Isuzu durability.",
        properties: [
            { name: "Drive Type", value: "4x4" },
            { name: "Cab Type", value: "Double Cab" }
        ]
    },
    {
        id: 7,
        name: "Mercedes Benz GLC",
        image: '/assets/images/cars/mercedes_benz_glc.jpg',
        year: "2025",
        condition: "New",
        mileage: "0 km",
        engineCapacity: "2.0L Turbo Inline-4",
        fuel: "Mild Hybrid",
        transmission: "9-Speed Automatic",
        price: "$59,000",
        description: "A sophisticated luxury SUV presenting a whisper-quiet cabin, cutting-edge MBUX infotainment screens, and an exceptionally refined ride quality.",
        properties: [
            { name: "Drive Type", value: "4MATIC" },
            { name: "Sunroof", value: "Panoramic" }
        ]
    },
    {
        id: 8,
        name: "Nissan NV200",
        image: '/assets/images/cars/nissan_nv200.jpg',
        year: "2021",
        condition: "Used",
        mileage: "68,000 km",
        engineCapacity: "1.6L",
        fuel: "Petrol",
        transmission: "Manual",
        price: "$12,500",
        description: "A compact commercial panel van engineered for urban delivery work, offering a low load floor, sliding side doors, and agile maneuvering.",
        properties: [
            { name: "Body Style", value: "Panel Van" },
            { name: "Payload Capacity", value: "740 kg" }
        ]
    },
    {
        id: 9,
        image: '/assets/images/cars/nissan_serena.jpg',
        name: "Nissan Serena",
        year: "2023",
        condition: "Used",
        mileage: "18,500 km",
        engineCapacity: "2.0L e-POWER",
        fuel: "Hybrid",
        transmission: "Automatic",
        price: "$29,000",
        description: "A spacious 8-seater family minivan featuring touchless sliding doors, flexible seating arrangements, and a smooth e-POWER hybrid drive system.",
        properties: [
            { name: "Seats", value: 8 },
            { name: "Drive Type", value: "FWD" }
        ]
    }
];