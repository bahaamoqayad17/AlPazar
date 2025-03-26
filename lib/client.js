import { fetchExchange, createClient, subscriptionExchange } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_COMMENTS,
  GET_POSTS,
  GET_USER_FAV,
  USER_DATA,
} from "../graphql/queries";

// ✅ API URLs (Ensure these are defined in your `.env` file)
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/";
const WS_URL = API_URL.replace(/^http/, "ws"); // Convert HTTP URL to WS URL

// ✅ Retrieve the token dynamically from AsyncStorage
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// ✅ Custom Fetch Function (Attaches Authorization Header)
const customFetch = async (url, options) => {
  const token = await getAuthToken();

  options.headers = {
    ...options.headers,
    Authorization: token || "",
    "Apollo-Require-Preflight": "true", // Helps fix GraphQL upload issues
  };

  return fetch(url, options);
};

// ✅ WebSocket Subscription Client for Real-Time Messages
const subscriptionClient = new SubscriptionClient(`${WS_URL}graphql`, {
  reconnect: true,
  lazy: true,
  connectionParams: async () => {
    const token = await getAuthToken();
    return token ? { Authorization: token } : {};
  },
});

const cache = cacheExchange({
  updates: {
    Mutation: {
      setFavorites: (result, args, cache) => {
        if (result?.setFavorites) {
          cache.updateQuery({ query: GET_USER_FAV }, (data) => {
            if (data?.getUserFav) {
              return {
                getUserFav: [...data.getUserFav, result.setFavorites.post],
              };
            }
            return data;
          });
        }
      },
      removeFavorites: (result, args, cache) => {
        if (result?.removeFavorites) {
          cache.updateQuery({ query: GET_USER_FAV }, (data) => {
            if (data?.getUserFav) {
              return {
                getUserFav: data.getUserFav.filter(
                  (fav) => fav.id !== result.removeFavorites.post.id
                ),
              };
            }
            return data;
          });
        }
      },
      createComment: (result, args, cache) => {
        if (result?.createComment) {
          cache.updateQuery(
            { query: GET_COMMENTS, variables: { postId: args.postId } },
            (data) => {
              if (data?.getComments) {
                return {
                  getComments: [result.createComment, ...data.getComments],
                };
              }
              return data;
            }
          );
        }
      },
      createPost: (result, args, cache) => {
        if (result?.post) {
          cache.updateQuery({ query: GET_POSTS }, (data) => {
            if (data?.posts?.data) {
              return {
                posts: [result.post, ...data.posts.data],
              };
            }
            return data;
          });

          cache.updateQuery(
            { query: USER_DATA, variables: { userId: args.input.user } },
            (data) => {
              if (data?.userPosts) {
                return {
                  userPosts: [result.post, ...data.userPosts],
                };
              }
              return data;
            }
          );
        }
      },

      updateStatus: async (result, args, cache) => {
        console.log("result", result);

        if (result?.updateStatus) {
          const updatedPost = result.updateStatus;

          // ✅ Step 1: Update the `GET_POSTS` Cache
          await Promise.resolve(
            cache.updateQuery({ query: GET_POSTS }, (data) => {
              if (data?.posts?.data) {
                const updatedPosts = data.posts.data.map((post) =>
                  post.id === updatedPost.id
                    ? { ...post, status: updatedPost.status }
                    : post
                );

                return {
                  ...data,
                  posts: { ...data.posts, data: updatedPosts },
                };
              }
              return data;
            })
          );

          console.log("✅ GET_POSTS Cache Updated Successfully");

          // ✅ Step 2: Update the `USER_DATA` Cache - Wait for Step 1 to finish
          await Promise.resolve(
            cache.updateQuery(
              {
                query: USER_DATA,
                variables: { userId: result.updateStatus.user.id },
              },
              (data) => {
                console.log("User posts before update:", data?.userPosts);

                if (data?.userPosts) {
                  const updatedUserPosts = data.userPosts.map((post) =>
                    post.id === result.updateStatus.id
                      ? { ...post, status: result.updateStatus.status }
                      : post
                  );
                  console.log("User posts after update:", updatedUserPosts);
                  return { ...data, userPosts: updatedUserPosts };
                }
                return data;
              }
            )
          );

          console.log("✅ USER_DATA Cache Updated Successfully");
        }
      },
    },
  },
});

// ✅ Create the URQL Client
const client = createClient({
  url: `${API_URL}graphql`,
  exchanges: [
    cache,
    multipartFetchExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
  fetch: customFetch,
});

export default client;
