import axios from 'axios'

export async function connectApi(passing) {
    try {
        let connection = await axios.get(`https://api.github.com/users/${passing}`)
        let data = connection.data
        return (data)
    }
    catch(error){
        if(error.response.status === 404){
            alert("Plese Enter A Valid Github Profile")
        }
        else if(error.response.status ===500){
            alert("Server Error ! Please Stay Tuned")
        }
        return null
    }
    
}