import { gql } from 'apollo-boost';

export const LOGIN = gql`
mutation login($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
        accessToken
    }
}
`;

export const CREATE_REVIEW = gql`
mutation createreview($review: CreateReviewInput) {
    createReview(review: $review) {
        repositoryId
    }
}
`;

export const CREATE_USER = gql`
mutation createuser($user: CreateUserInput) {
    createUser(user: $user) {
        username
    }
}`;

export const DELETE_REVIEW = gql`
mutation deletereview($id: ID!) {
    deleteReview(id: $id)
}`;