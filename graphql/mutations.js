import { gql } from "urql";

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
      post(input: $input) {
      id
      images
      country
      city
      title
      price
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
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
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

export const SEND_MESSAGE = gql`
  mutation sendMessage($sender: ID!, $receiver: ID!, $conversation: ID!, $content: String!) {
    sendMessage(sender: $sender, receiver: $receiver, conversation: $conversation, content: $content) {
      id
      content
      createdAt
    }
  }
`;

export const SET_FAVORATIE = gql`
  mutation setFavorites($input: CreateFavInput!) {
    setFavorites(input: $input) {
      id
      post {
        id
      }
    }
  }
`;

export const REMOVE_FAVORATIE = gql`
  mutation removeFavorites($input: CreateFavInput!) {
    removeFavorites(input: $input) {
      id
      post {
        id
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      name
      mobile_number
      country
      city
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($avatarUrl: String!) {
  updateAvatar(avatarUrl: $avatarUrl) {
    id
    name
    image
  }
}
`;

export const SET_STATUS = gql`
  mutation updateStatus($postId: ID!, $status: String!) {
    updateStatus(postId: $postId, status: $status) {
      id
      images
      title
      paid
      status
      user {
        id
      }
    }
  }
`;

// ✅ Create a new conversation
export const CREATE_CONVERSATION = gql`
  mutation createConversation($user1: ID!, $user2: ID!) {
    createConversation(user1: $user1, user2: $user2) {
      id
      participants {
        id
        name
        image
      }
    }
  }
`;

// ✅ Create a new conversation
export const UPDATE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      participants {
        id
        name
        image
      }
    }
  }
`;

export const DeleteMyUser = gql`
  mutation DeleteMyUser {
    deleteMyUser
}
`;
