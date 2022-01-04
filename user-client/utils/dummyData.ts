export const shopList = [
    {
        name: 'Sardar',
        id: '1',
    },
    {
        name: 'Kasooriya',
        id: '2',
    },
    {
        name: 'bhandi',
        id: '3'
    },
    {
        name: 'Sardar',
        id: '4'
    },
    {
        name: 'Kasooriya',
        id: '5'
    },
    {
        name: 'bhandi',
        id: '6'
    },
    {
        name: 'Sardar',
        id: '7'
    },
    {
        name: 'Kasooriya',
        id: '8'
    },
    {
        name: 'bhandi',
        id: '9'
    },
];

export const shopInfo = {
    name: 'Sardar',
    id: '1',
    locality: 'Delhi Gate',
    type: ['fast food', 'american', 'dessert'],
    menu: [
        {
            name: 'kali daal',
            price: 40,
            id: 'sardar-1',
            category: 'pulses',
            bestSeller: true,
            weight: 1000,
        },
        {
            name: 'yellow daal',
            price: 35,
            id: 'sardar-2',
            category: 'pulses',
            bestSeller: false,
            weight: 1000,
        },
        {
            name: 'dates',
            price: 70,
            id: 'sardar-3',
            category: 'winter',
            bestSeller: true,
            perKg: false,
            weight: 1225,
        },
        {
            name: 'kali daal',
            price: 40,
            id: 'sardar-4',
            category: 'pulses',
            bestSeller: true,
            weight: 1000,
        },
        {
            name: 'yellow daal',
            price: 35,
            id: 'sardar-5',
            category: 'pulses',
            bestSeller: false,
            weight: 1000,
        },
        {
            name: 'dates',
            price: 70,
            id: 'sardar-6',
            category: 'winter',
            bestSeller: true,
            perKg: false,
            weight: 1225,
        },
        {
            name: 'yellow daal',
            price: 35,
            id: 'sardar-7',
            category: 'pulses',
            bestSeller: false,
            weight: 1000,
        },
    ]
}

export const previousOrdersDummy = [
    {
        orderDate: '21 Dec 2021',
        orderTime: '7:25 PM',
        totalPrice: 430,
        shopId: '1',
        shopName: 'Sardar',
        shopLocality: 'Delhi Gate',
        deliveryRating: 5,
        foodRating: 4,
        orderDetails: [
            {
                name: 'kali daal',
                price: 40,
                id: 'sardar-1',
                category: 'pulses',
                bestSeller: true,
                weight: 1000,
                qty: 2,
            },
            {
                name: 'yellow daal',
                price: 35,
                id: 'sardar-2',
                category: 'pulses',
                bestSeller: false,
                weight: 1000,
                qty: 4,
            },
        ]
    }
]

export const myAddressesDummy = [
    {
        id: 'address-1',
        savedAs: 'Home',
        otherName: '',
        houseAddress: '5 Adarsh Nagar',
        area: 'near Dhawan colony gurudwara',
        landmark: '',
    },
    {
        id: 'address-2',
        savedAs: 'Other',
        otherName: 'Nani House',
        houseAddress: '2 Kanshi nagri hemkunt encloave',
        area: 'near josan dairy',
        landmark: '',
    },
]