# 🎮 Gamer's Haven – MERN Stack eCommerce Website

**Gamer's Haven** is a full-featured eCommerce platform for gamers, built using the **MERN (MongoDB, Express.js, React, Node.js)** stack. The site will provide a smooth and engaging shopping experience tailored to video game enthusiasts.

---

## 🧩 Project Structure

- **Frontend**: React.js + Redux Toolkit (or Context API)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Payment Integration**: Stripe or Razorpay
- **Admin Dashboard**: For product and order management

---

## 🚀 Core Features

### 🛍️ Customer Features

- **Homepage**

  - Promotional banners
  - Featured games and accessories
  - Categories (e.g., PC, PlayStation, Xbox, Nintendo)

- **Product Listing Page**

  - Search, filter (price, platform, genre), and sort options
  - Pagination and lazy loading

- **Product Detail Page**

  - Game description, screenshots, video trailer
  - Price, stock status, reviews & ratings
  - "Add to Cart" and "Wishlist" buttons

- **Cart & Checkout**

  - Cart page with quantity update, remove item
  - Checkout flow with shipping address and payment method
  - Order summary and confirmation page

- **User Authentication**

  - Register/Login with JWT
  - Forgot/reset password
  - User profile with editable info
  - View order history

- **Wishlist**

  - Save favorite products
  - Move to cart option

- **Reviews**
  - Leave product reviews with rating and comments
  - Edit/delete own reviews

---

### 🛠️ Admin Features

- **Admin Dashboard**

  - Overview of orders, revenue, users, stock

- **Product Management**

  - Add/edit/delete products
  - Upload game trailers, screenshots

- **Order Management**

  - View all orders
  - Update delivery status

- **User Management**

  - View/delete users
  - Promote/demote users (admin roles)

- **Content Management**
  - Manage homepage banners and featured games

---

## 💸 Optional Add-ons

- **Live Chat Support** (using socket.io)
- **Email Notifications** (order confirmation, shipping)
- **Game Key Distribution** (for digital products)
- **Download Center** (for digital games with license keys)
- **Discounts & Coupons**
- **Blog Section** (for news, reviews, guides)
- **Multilingual Support**

---

## 🧱 Tech Stack

| Technology        | Description                 |
| ----------------- | --------------------------- |
| React             | Frontend UI                 |
| Redux Toolkit     | State Management            |
| Node.js + Express | Backend APIs                |
| MongoDB           | Database                    |
| Mongoose          | ODM for MongoDB             |
| JWT + bcrypt      | Authentication              |
| Stripe/Razorpay   | Payment Gateway Integration |
| Cloudinary        | Image/Video Uploads         |
| Multer            | File Upload Handling        |

---

## 📁 Folder Structure (Suggestion)

# 🎮 Reusable Component List – Gamer's Haven (MERN + Tailwind CSS)

This document outlines all reusable React components for the **Gamer's Haven** project, styled using **Tailwind CSS**.

---

## 📦 Common UI Components

| Component           | Description                                   |
| ------------------- | --------------------------------------------- |
| `Button`            | Reusable buttons: primary, secondary, outline |
| `Input`             | Text input fields with validation             |
| `Textarea`          | Multi-line input for reviews or messages      |
| `SelectDropdown`    | Used for filters, platform choices            |
| `Modal`             | For authentication, image previews, alerts    |
| `Loader`            | Spinner or skeleton screen                    |
| `ToastNotification` | Alert messages (success, error, warning)      |
| `Badge`             | Labels like "New", "Sale", "In Stock"         |
| `RatingStars`       | Star-based rating display and input           |
| `Avatar`            | User profile image placeholder                |
| `Tabs`              | Switchable views (e.g. description, reviews)  |

---

## 🧭 Navigation Components

| Component      | Description                               |
| -------------- | ----------------------------------------- |
| `Navbar`       | Main top navigation bar                   |
| `Sidebar`      | Admin dashboard or category filter nav    |
| `Breadcrumbs`  | Navigation path (e.g. Home > Xbox > Game) |
| `DropdownMenu` | User profile or admin menu                |
| `MobileMenu`   | Responsive menu drawer                    |

---

## 🛍️ Product Components

| Component         | Description                                      |
| ----------------- | ------------------------------------------------ |
| `ProductCard`     | Game box with title, image, price, rating        |
| `ProductGrid`     | Layout wrapper for multiple `ProductCard`s       |
| `ProductDetails`  | Full game details: description, trailer, reviews |
| `PriceTag`        | Consistent currency formatting                   |
| `StockIndicator`  | In-stock / out-of-stock badge                    |
| `ImageCarousel`   | Product image slider                             |
| `AddToCartButton` | Add/remove with quantity control                 |
| `WishlistButton`  | Toggle wishlist state                            |

---

## 🧾 Cart & Checkout Components

| Component               | Description                    |
| ----------------------- | ------------------------------ |
| `CartItem`              | One product in cart view       |
| `CartSummary`           | Subtotal, tax, shipping        |
| `CheckoutForm`          | Shipping and payment info      |
| `OrderSummary`          | Review order before placing    |
| `PaymentMethodSelector` | Stripe, Razorpay, etc. options |

---

## 👤 User & Auth Components

| Component          | Description                                 |
| ------------------ | ------------------------------------------- |
| `LoginForm`        | Email/password login form                   |
| `RegisterForm`     | Sign-up form                                |
| `ProfileForm`      | Update profile info                         |
| `OrderHistoryItem` | Display individual past orders              |
| `ProtectedRoute`   | Wrapper to guard routes for logged-in users |
| `UserMenu`         | Dropdown for account, logout, etc.          |

---

## 🛠️ Admin Components

| Component        | Description                                  |
| ---------------- | -------------------------------------------- |
| `DashboardCard`  | Overview cards: total orders, revenue, users |
| `ProductTable`   | Admin product listing with edit/delete       |
| `UserTable`      | Admin user management                        |
| `OrderTable`     | Admin order list with update status          |
| `AdminSidebar`   | Admin panel navigation                       |
| `BannerUploader` | Upload/update homepage banners               |
| `ProductForm`    | Form to create or update product             |
| `ImageUploader`  | Upload images or game trailers               |

---

## 📑 Page Layout Components

| Component       | Description                               |
| --------------- | ----------------------------------------- |
| `PageContainer` | Common page wrapper with spacing          |
| `SectionHeader` | Reusable heading for sections             |
| `Footer`        | Site-wide footer                          |
| `Pagination`    | For product list navigation               |
| `SearchBar`     | Global or category-level search           |
| `FilterSidebar` | Filter products by platform, genre, price |

---

## 💨 Tailwind CSS Setup

To use Tailwind CSS in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
