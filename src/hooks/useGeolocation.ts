import { useState, useEffect } from 'react';

// Simulated geolocated offers
const GEO_OFFERS = [
    {
        id: 'geo-1',
        title: '¡Estás cerca de un Crepes & Waffles!',
        description: 'Paga con tu tarjeta Bancolombia y recibe un postre gratis.',
        category: 'Restaurantes',
        bank: 'Bancolombia'
    },
    {
        id: 'geo-2',
        title: '¡Salas VIP en El Dorado!',
        description: 'Tienes acceso gratuito con tu Visa LifeMiles Platinum. ¡Aprovecha antes de tu vuelo!',
        category: 'Viajes',
        bank: 'Bancolombia'
    }
];

export function useGeolocation() {
    const [currentOffer, setCurrentOffer] = useState<typeof GEO_OFFERS[0] | null>(null);

    useEffect(() => {
        // Simulate finding a geolocated offer after 5 seconds of using the app
        const timer = setTimeout(() => {
            // Pick a random offer to simulate
            const randomOffer = GEO_OFFERS[Math.floor(Math.random() * GEO_OFFERS.length)];
            setCurrentOffer(randomOffer);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const dismissOffer = () => setCurrentOffer(null);

    return { currentOffer, dismissOffer };
}
