import { gql } from "urql";

export const GET_POSTS = gql`
    query Posts {
    posts {
        count
        data {
            id
            images
            country
            price
            city
            title
            paid
            status
            createdAt
            category {
                id
                name
            }
                user {
                id
                name
                image
                }
        }
    }
    sliders {
      id
      image
      title
      link
    }
}
`;
export const GET_CATEGORIES = gql`
    query Categories {
    categories {
        id
        name
        icon
    }
}
`;

export const GET_COMMENTS = gql`
query GetComments($postId: ID!) {
  getComments(postId: $postId) {
    id
    content
    user {
      id
      name
      image
    }
    createdAt
  }
}
`;

export const GET_POST = gql`query Post($id: ID!) {
    post(id: $id) {
        id
        images
        mobile_number
        country
        city
        title
        content
        createdAt
        price
        paid
        status
        comments {
            id
            content
            createdAt
            user {
                id
                name
                image
            }
        }
        category {
            id
        }
        user {
            id
            name
            country
            city
            image
        }
    }
    posts {
        count
        data {
            id
            images
            paid
            status
            category {
                id
            }
        }
    }
}
`;

export const USER_DATA = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      mobile_number
      country
      city
      image
      createdAt
    }
    userPosts(userId: $id) {
      id
      images
      title
      paid
      status
    }
  }
`;

export const GET_MESSAGES = gql`
  query Messages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
        id
        content
        isRead
        createdAt
        sender {
            id
        }
    }
}

`;

export const ON_NEW_MESSAGE = gql`
  subscription onNewMessage($conversationId: ID!) {
    onNewMessage(conversationId: $conversationId) {
      id
      sender {
        id
        name
        image
      }
      content
      createdAt
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
        id
        createdAt
        participants {
            id
            name
            image
        }
        lastMessage {
            id
            content
            isRead
            createdAt
        }
    }
}
`;

export const GET_USER_FAV = gql`
query GetUserFav {
    getUserFav {
        id
        price
        mobile_number
        country
        city
        title
        content
        images
        createdAt
    }
}
`;

export const GET_USER_NOTIFICATIONS = gql`
query GetUserNotifications {
    getUserNotifications {
        id
        type
        content
        isRead
        createdAt
        user {
            id
            name
            image
            createdAt
        }
    }
}

`;
