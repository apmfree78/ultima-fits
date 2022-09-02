## Full Stack Ecommerce Store Build with React frontend and Node.js backend

Application was built with **Next.js** full stack framework. **Keystone.js** on backend
to manage a robust **GraphQL** API and **MongoDB** database. Apollo setup on frontend to
call GraphQL API.

*Once user creates a free account they can add items to cart, purchase those items through the sliding cart
(stripe integration), post an item to sell, check their order hisotry, or search for an item with the search
bar autocomplete feature.*

All data is saved to MongoDB database.

## Clean Professional using Styled Components

## Full User Login and Authentication

Includes user sign in, login, logout, password reset (going to user email), and
persistant session that detect user reminders and show them when user is logged
in.

## Make a Purchase with Slide out Card with Stripe Integration

## Apollo Cache for Fast Load Times

Front end utilizes Apollo cache to reduce database calls. Cache is only
refreshed when uses makes a change : add/remove item from cart,
login/logout, makes a purchase, etc.
