/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLabreport = /* GraphQL */ `
  mutation CreateLabreport(
    $id: ID!
    $petAnimal: String!
    $petColor: String!
    $petName: String!
    $petAge: Int!
    $petGender: String!
    $petWeight: Int!
    $petCondition: String!
    $petOwnerName: String!
    $petOwnerEmail: String!
    $petOwnerPhone: String!
  ) {
    createLabreport(
      id: $id
      petAnimal: $petAnimal
      petColor: $petColor
      petName: $petName
      petAge: $petAge
      petGender: $petGender
      petWeight: $petWeight
      petCondition: $petCondition
      petOwnerName: $petOwnerName
      petOwnerEmail: $petOwnerEmail
      petOwnerPhone: $petOwnerPhone
    ) {
      result
    }
  }
`;
