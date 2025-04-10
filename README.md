# 🚀 Credit Card Fraud Detection using PSO & Machine Learning

This project implements a **fraud detection system** using **Machine Learning (Random Forest)** and **Particle Swarm Optimization (PSO)** for feature selection. The system has a **Next.js frontend** for user interaction and a **Python backend** for processing fraud detection requests.

---

## 📌 Features
✅ **PSO-based Feature Selection** – Identifies the most important transaction attributes  
✅ **Machine Learning Model** – Uses **Random Forest** for classification  
✅ **High Accuracy** – Achieves **98% accuracy** in fraud detection  
✅ **Scalable** – Handles **large datasets (1,000,000+ transactions)**  
✅ **Custom Predictions** – Allows manual transaction inputs for fraud checking  
✅ **Web-based UI** – Simple and intuitive Next.js interface for fraud predictions  

---

## 📂 Dataset
The dataset consists of **credit card transactions** with the following features:  
- `distance_from_home`  
- `distance_from_last_transaction`  
- `ratio_to_median_purchase_price`  
- `repeat_retailer`, `used_chip`, `used_pin_number`  
- **Target:** `fraud` (1 = Fraud, 0 = Not Fraud)  

---

## 🛠 Technologies Used
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Flask (Python)
- **Machine Learning:** Random Forest
- **Optimization:** Pyswarms (PSO)
- **Data Analysis:** Pandas, NumPy
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ⚡ Installation

### 🔹 Clone the Repository
```bash
git clone https://github.com/ramankumar7c/Fraud_Detection.git
cd Fraud_Detection
```

### 🔹 Install Frontend Dependencies
```bash
cd fraud-detection-app
npm install
```

### 🔹 Run the Frontend
```bash
npm run dev
```
> Access the app at `http://localhost:3000`

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.