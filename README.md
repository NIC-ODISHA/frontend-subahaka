# Subahaka Weather Dashboard - Frontend

The Subahaka frontend is a React weather dashboard built with Vite. It provides a responsive interface for current conditions, forecasts, popular cities, search history, favorite cities, charts, and the weather map.

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- The Subahaka backend running on `http://localhost:8080`

## Installation

From this directory, install the dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in a browser. Requests to `/api` are proxied to the backend at `http://localhost:8080`, so no frontend API URL configuration is required for local development.

Start the backend before loading weather data in the dashboard.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 5173 |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── api/              Axios client and backend API calls
├── components/       Layout, map, and weather components
├── hooks/            Data-fetching hooks
├── pages/            Application pages
└── utils/            Shared weather helpers and icon mappings
```


## Backend API Used

The frontend uses these endpoints through the `/api` proxy:

- `GET /api/weather/current`
- `GET /api/weather/popular-cities`
- `GET /api/forecast/daily`
- `GET /api/forecast/hourly`
- `GET /api/user/history`
- `GET /api/user/favorites`
- `POST /api/user/favorites`
- `DELETE /api/user/favorites/{id}`


## Production Notes

The Vite development proxy is configured only for local development. For production, serve the built files from a web server and configure that server to forward `/api` requests to the deployed backend, or update the Axios base URL in `src/api/weatherApi.js` to match the deployment architecture.


## Troubleshooting

- If the dashboard shows network errors, confirm that the backend is running on port `8080`.
- If the page cannot load, check that the frontend is running on port `5173` and that another process is not using that port.
- Run `npm run lint` and `npm run build` before creating a production deployment.
