// import axios from 'axios';
// import Auth from '../functions/auth'

// class CallApi {

//     //Checks if the Token is present or not (User Logged in or not)
//     header = () => {
//         const token = localStorage.getItem('AccessToken');
//         return {
//             'Authorization': "Bearer " + token,
//             'Content-Type': "application/json",
//             'Access-Control-Allow-Origin': true
//         };
//     };

//     //Generic Method to make a GET API request
//     GetAsync = async (URL) => {
//         try {
//             let response = await axios(URL, {
//                 method: 'GET',
//                 headers: this.header(),
//             })
//                 .catch(err => {
//                     if (err.response) {
//                         if(err.response.status === 401 && err.response.data.message.message === "Token Expired"){
//                             Auth.RefreshToken()
//                         }
//                         return err.response
//                     }
//                 })
//             return response;
//         }
//         catch (e) {
//             console.log(e)
//         }
//     };

//     //Generic Method to make a POST API request
//     PostAsync = async (URL, data) => {
//         try {
//             let response = await axios(URL, {
//                 method: 'POST',
//                 headers: this.header(),
//                 data: data
//             })
//                 .catch(err => {
//                     if (err.response) {
//                         if(err.response.status === 401 && err.response.data.message.message === "Token Expired"){
//                             Auth.RefreshToken()
//                         }
//                         return err.response
//                     }
//                 })
//             return response;
//         }
//         catch (e) {
//             console.log(e);
//         }
//     };

//     //Generic Method to make a PUT API request
//     PutAsync = async (URL, data) => {
//         try {
//             let response = await axios(URL, {
//                 method: 'PUT',
//                 headers: this.header(),
//                 data: data
//             })
//                 .catch(err => {
//                     if (err.response) {
//                         if(err.response.status === 401 && err.response.data.message.message === "Token Expired"){
//                             Auth.RefreshToken()
//                         }
//                         return err.response
//                     }
//                 });
//             return response;
//         }
//         catch (e) {
//             console.log(e);
//         }
//     };

//     //Generic Method to make a DELETE API request
//     DeleteAsync = async (URL) => {
//         try {
//             let response = await axios(URL, {
//                 method: 'DELETE',
//                 headers: this.header(),
//             })
//                 .catch(err => {
//                     if (err.response) {
//                         if(err.response.status === 401 && err.response.data.message.message === "Token Expired"){
//                             Auth.RefreshToken()
//                         }
//                         return err.response
//                     }
//                 });
//             return response;
//         }
//         catch (e) {
//             console.log(e);
//         }
//     };

//     CustomCall = async (URL, method, data) => {
//         try {
//             let response = await axios(URL, {
//                 method: method,
//                 headers: await this.header(),
//                 data: data
//             })
//                 .catch(err => {
//                     if (err.response) {
//                         return err.response
//                     }
//                 });
//             return response;
//         }
//         catch (e) {
//             console.log(e);
//         }
//     };
// }

// export default new CallApi();