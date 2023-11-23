# Precision Farming Backend

Precision Farming is a solution that predicts the best time to plant and harvest crops using machine learning model, taking into account local weather conditions and soil quality. This solution will help farmers improve their yields. Live url: https://farm-fuse-backend.vercel.app/

## Key Features

> - Farmers enter their location and crop details.
> - The system uses machine learning to predict the best planting and harvesting times for the crop.
> - The system is user-friendly so even non-tech-savvy farmers can use it.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Installation

```sh
git clone
cd farm-fuse-backend
npm install
npm start
```

## Postman Collection

https://documenter.getpostman.com/view/22984536/2s9YeBfa1e

## API Reference

### Register

```http
  POST /api/register
```

| Parameter  | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `name`     | `string` | **Required**. Name of Farmer     |
| `email`    | `string` | **Required**. Email of Farmer    |
| `password` | `string` | **Required**. Password of Farmer |
| `username` | `string` | **Required**. Username of Farmer |

### Login

```http
  POST /api/login
```

| Parameter  | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `username` | `string` | **Required**. Email of Farmer    |
| `password` | `string` | **Required**. Password of Farmer |
