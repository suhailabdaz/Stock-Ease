# Stock-Ease

A real-time Inventory Management System designed to manage inventory, track sales, and generate reports. The system is built using **Vite-React** for the frontend, utilizing **RTK Query** for efficient data fetching and state management. The backend, developed with **Node.js** and **Express** in a microservice architecture, and **MongoDB** for storing inventory and customer data. **Redis**.

## Features

- **Frontend**: Vite-React with RTK Query for fast, efficient data fetching and state management.
- **Backend**: Node.js and Express microservices for managing inventory, sales, and customer data.
- **Inventory Management**: 
  - CRUD functionality to add, update, and delete items with details like name, description, quantity, and price.
- **Customer Management**: 
  - Manage customer details such as name, address, and mobile number.
- **Sales Tracking**: 
  - Record sales transactions, including date, quantity, and customer details.
- **Reporting**: 
  - Generate sales reports, inventory status, and customer transaction ledgers.
- **Data Export**: 
  - Export data in Print, Excel, PDF formats, and email reports.


## Getting Started

### Collect Environment Variables

Please contact the admin to collect the necessary environment variables required for the application to run. Create a `.env` file in the root of your project directory and populate it with the collected environment variables.


### Prerequisites

- Docker

### Installation

```bash

git clone https://github.com/suhailabdaz/Stock-Ease.git

cd Stock-Ease

docker compose up --build
```

##  Usage
Access the application frontend at http://localhost:7001.
