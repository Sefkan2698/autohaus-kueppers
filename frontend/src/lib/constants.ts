// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const CONTENT = {
  phone: '+49 2823 3143',
  email: 'info@auto-kueppers.de',
  address: {
    street: 'Asperdener Str. 2',
    city: '47574 Goch',
    country: 'Deutschland',
  },
  hours: {
    sales: {
      weekdays: '08:00 - 18:00 Uhr',
    },
    service: {
      weekdays: '08:00 - 18:00 Uhr',
    },
    parts: '08:00 - 17:00 Uhr',
  },
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2473.8442446517374!2d6.142275076676444!3d51.68099399800694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c76e3ccb06a5f7%3A0x4548a71bb681a710!2sAutohaus%20K%C3%BCppers%20GmbH!5e0!3m2!1sde!2sde!4v1765385531288!5m2!1sde!2sde',
};