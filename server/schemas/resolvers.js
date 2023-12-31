const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// import the dotenv package and the .env file
require ("dotenv").config();
// access stripe using the secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  // Queries for allUsers, categories, products, product, user, order, and checkout
  Query: {

    allUsers: async () => {
      return await User.find();
    },

    categories: async () => {
      return await Category.find();
    },

    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      // populate() method to populate the category field with the associated category data instead of just an _id
      return await Product.find(params).populate("category");
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    user: async (parent, args, context) => {
      if (context.user) {
        // find a user and populate their orders
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        // sort the orders in descending order by the purchaseDate value
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];
      // We loop through the products array and push each item into the line_items array.
      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      // We then create a new Stripe checkout session using the line_items array.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    // Mutations for addUser, addOrder, addReview, removeReview, updateUser, updateProduct, and login
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },

    addReview: async (parent, { productId, reviewText }) => {
      return Product.findOneAndUpdate(
        { _id: productId },
        {
          $addToSet: { reviews: { reviewText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeReview: async (parent, { productId, reviewId }) => {
      return Product.findOneAndUpdate(
        { _id: productId },
        { $pull: { reviews: { _id: reviewId } } },
        { new: true }
      )
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;
