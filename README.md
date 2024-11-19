# E-MAIL DATA BREACH CONTROL

This is a [Next.js](https://nextjs.org) application styled with [`Tailwind CSS`](https://tailwindcss.com/) that allows users to check if their email has been compromised in any data breaches. The app leverages the [`Have I Been Pwned (HIBP) API`](https://haveibeenpwned.com/API/v3) for reliable breach data.

## Features
- **Email Breach Search:** Quickly search for breaches associated with an email.
- **Real-time Results:** Instant response from the HIBP API.
- **Privacy-focused:** Only uses the HIBP API; no data is stored or shared.

## Getting Started

### Prerequisites
- **Node.js:** Ensure you have Node.js installed (version 18+ recommended).
- **API Key:** Obtain a Have I Been Pwned API key from [`HIBP's website.`](https://haveibeenpwned.com/API/Key)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IYTE-Yazilim-Toplulugu/hibpwned.git
cd email-data-breach-checker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables: Create a .env.local file in the project root and add the following:
```env
HIBP_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
``` 

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Enter an email address into the search bar.
2. Click the "Check" button.
3. View breach details or confirmation of no breaches.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [`Tailwind CSS`](https://tailwindcss.com/)
- **API:** [`Have I Been Pwned (HIBP) API`](https://haveibeenpwned.com/API/v3)

## Licence
This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.