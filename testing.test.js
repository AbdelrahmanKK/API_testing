const supertest = require('supertest');
const request = supertest('http://localhost:3000');



describe('API testing', () => {
    let token;

    test('should create new user and return a 200 response with success message and user token', async () => {
        const response = await request
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
              })
            
            .then(response => {
                console.log(response.body); // Print the response body
                console.log(response.status); // Print the response status code
                expect(response.status).toBe(200)
              });
               
    });

    test('should authenticate the user and return its token',async () =>{
        const response = await request
            .post('/api/v1/auth')
            .send({
                "email": "user@gmail.com",
                "password": "user123"
              })
            
            .then(response => {
                token = response.body.token
                console.log(response.body); // Print the response body
                console.log(response.status); // Print the response status code
                expect(response.status).toBe(200)
              });
    });

    test('should get the user using his token ', async () => {
        const response = await request
            .get("/api/v1/users")
            .set('Authorization', token) 
            .then(response => {
                console.log(response.body); // Print the response body
                console.log(response.status); // Print the response status code
                expect(response.status).toBe(200)
              })            
    });



    test('should PATCH USER BY TOKEN', async () => {
        const response = await request
        .patch ("/api/v1/users")
        .set('Authorization', token) 
        .send({
            "name": "newName",
            "email": "new_email@gmail.com",
            "password": "newpassword123"
          })
          
          .then(response => {
            console.log(response.body); // Print the response body
            console.log(response.status); // Print the response status code
            expect(response.status).toBe(200)
          })    
    });

    test('should authenticate the user and return its token',async () =>{
        const response = await request
            .post('/api/v1/auth')
            .send({
                "email": "new_email@gmail.com",
                "password": "newpassword123"
              })
            
            .then(response => {
                token = response.body.token
                console.log(response.body); // Print the response body
                console.log(response.status); // Print the response status code
                expect(response.status).toBe(200)
              });
    });

    test('DELETE USER BY TOKEN', async ()=>{
        const response = await request
        .delete ("/api/v1/users")
        .set('Authorization', token)
        
        .then(response => {
            console.log(response.body); // Print the response body
            console.log(response.status); // Print the response status code
            expect(response.status).toBe(200)
          })

    });



    test('should delete all users with valid admin key', async () => {
        const adminKey = 'keyadmin123'; // Replace with the actual admin key
        const response = await request
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })
            
    
        console.log(response.body); // Print the response body
        console.log(response.status); // Print the response status code
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Users deleted with success' });
    });
    
  
});

