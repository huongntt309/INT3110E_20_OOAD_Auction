# Car License Plate Auction System

## Introduction

The Car License Plate Auction System is a web application designed to facilitate the auctioning of unique and desirable license plate numbers for vehicles. 
This system provides a platform for users to bid on their desired license plate numbers and for administrators to manage the auction process.

## Features

- User Registration: Users can register an account to participate in the auction.
- License Plate Listing: The system displays a list of available license plate numbers for auction.
- Bidding System: Users can place bids on license plate numbers they are interested in.
- Auction Management: Administrators can manage the auction process, including starting and ending auctions, setting minimum bid amounts, and resolving disputes.
- Notifications: Users receive notifications about the status of their bids and auction updates.

## Installation Guide

### Prerequisites

- Node.js installed on your system.

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/huongntt309/INT3110E_20_OOAD_Auction.git
```

2. Navigate to the project directory:

```bash
cd INT3110E_20_OOAD_Auction
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the necessary environment variables such as database connection details, API keys, etc.

5. Start the backend server:

```bash
cd backend
npm start
```

6. Start the frontend development server:

```bash
cd ../frontend
npm start
```

7. Access the application in your web browser at `http://localhost:3000`.

Remember to start the backend server before the frontend server, as the backend server needs to be running for the frontend to communicate with it.

## Technologies Used

- Node.js
- Express.js
- SQLite
- React.js

## Project Structure

- `backend/`: Contains the backend code.
- `frontend/`: Contains the frontend code.
- `README.md`: This file, containing information and instructions about the application.

## Author
The Car License Plate Auction System was created by Nguyễn Hà Hoàng Anh and Nguyễn Thị Thúy Hường.
