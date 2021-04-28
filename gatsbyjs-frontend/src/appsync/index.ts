//AWS-AMPLIFY
import { API } from 'aws-amplify';
import { createLabreport } from '../graphql/mutations.js';





//MUTATION FUNCTIONS
export const handleCreate = async({ id, petAnimal, petColor, petName, petAge, petGender, petWeight, petCondition, petOwnerName, petOwnerEmail, petOwnerPhone }) => {
    await API.graphql({
        query: createLabreport,
        variables: {
            id,
            petAnimal,
            petColor,
            petName,
            petAge,
            petGender,
            petWeight,
            petCondition,
            petOwnerName,
            petOwnerEmail,
            petOwnerPhone
        }
    })    
}