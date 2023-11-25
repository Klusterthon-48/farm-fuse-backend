# Precision Farming Backend

Precision Farming is a solution that predicts the best time to plant and harvest crops using machine learning model, taking into account local weather conditions and soil quality. This solution will help farmers improve their yields.
Visit the [Live url](https://farm-fuse-backend.vercel.app/)

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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/22984536/2s9YeBfa1e)

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

### Forgot Password

```http
  POST /api/forgot_password
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `email`   | `string` | **Required**. Registered Email of Farmer |

### Reset Password

```http
  POST /api/reset_password
```

| Parameter     | Type     | Description                                 |
| :------------ | :------- | :------------------------------------------ |
| `newPassword` | `string` | **Required**. New Password of Farmer        |
| `email`       | `string` | **Required**. Registered Email of Farmer    |
| `token`       | `string` | **Required**. Token sent to email of Farmer |

### Prediction API

```http
  POST /api/predict
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `label`   | `string` | **Required**. Crop Name (Categories)          |
| `country` | `string` | **Required**. Location of Farmer (Categories) |

### Data

> - Available Crops (label) : `['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil', 'watermelon', 'muskmelon', 'cotton', 'jute']`

> - Available Countries (country) : `['Nigeria', 'South Africa', 'Kenya']`
