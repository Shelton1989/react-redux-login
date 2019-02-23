// Mock database
const userDatabase = {
    user1: {
        username: 'Mark',
        password: 'Facebook'
    },
    user2: {
        username: 'Jack',
        password: 'Twitter'
    },
    user3: {
        username: 'Larry',
        password: 'Alphabet'
    },
    user4: {
        username: 'Sundar',
        password: 'Google'
    },
};
  
  // Mock API call with delay
async function apiCall(time=1500) {
    await new Promise(resolve => setTimeout(resolve, time));
};
export const database = async ()=>{
    let data = userDatabase;
    await apiCall();
    return data;
};

export default database;