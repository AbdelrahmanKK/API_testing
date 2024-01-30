const supertest = require('supertest');
const request = supertest('http://localhost:3000');


describe('API_testing', () => {
    
    const adminKey = 'keyadmin123'; 

    
    test('should create new user and return user token', async () => {
        
        await request  // delete all users
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })

        const  response = await request  // create new user
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
              })

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('message', 'User registered with success');
            expect(response.body).toHaveProperty('token');
    });


    test('should not create new user using invalid email or password', async () => {
        
        
        await request   // delete all users
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })

        const  response = await request   // trying to create user with invalid arguments
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "usergmail.com",
                "password": ""
              })

            expect(response.status).toBe(400)

    });

    test('should create and authenticate a user and return his token',async () =>{
        
        await request  // delete all users
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })

        await request  // create new user
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
              })
        
        const response = await request  // authenticate user and get token
            .post('/api/v1/auth')
            .send({
                "email": "user@gmail.com",
                "password": "user123"
              })
            
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('token')
    });


    test('should not authenticate undefined user ',async () =>{
                
        const response = await request  // authenticate undefined user
            .post('/api/v1/auth')
            .send({
                "email": "undefined_user@gmail.com",
                "password": "user123"
              })
            
            expect(response.status).toBe(401)
            
    });



    test('should get the user using his token ', async () => {
        let token;

        await request  // delete all users
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })

        await request  // create new user
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
              })
        
        await request  // authenticate user to get token
            .post('/api/v1/auth')
            .send({
                "email": "user@gmail.com",
                "password": "user123"
              })
              .then(response => {
                token = response.body.token
        
              });

            
        const response = await request  // get user using token
            .get("/api/v1/users")
            .set('Authorization', token) 

            
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('imageUrl');
        expect(response.body).toHaveProperty('name','user');
        expect(response.body).toHaveProperty('email','user@gmail.com');
        expect(response.body).toHaveProperty('password','user123');
    });

    test('should not get the user using invalid token ', async () => {

        let token = "thisISaTrashTokEn";

        const response = await request  // get user using invalid token
            .get("/api/v1/users")
            .set('Authorization', token) 

        expect(response.status).toBe(403)        
        expect(response.body).toHaveProperty('message','Unauthorized');

    });



    test('should update name, email and password of the user using his token', async () => {

        let token;
        await request  // delete all users
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })

        await request  // create new user
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
              })
        
        await request  // authenticate user and get token
            .post('/api/v1/auth')
            .send({
                "email": "user@gmail.com",
                "password": "user123"
              })
              .then(response => {
                token = response.body.token
        
              });


        const response = await request  // update user name, email and password
            .patch ("/api/v1/users")
            .set('Authorization', token) 
            .send({
                "name": "newName",
                "email": "new_email@gmail.com",
                "password": "newpassword123"
            })

            expect(response.status).toBe(200)
            expect(response.body.data).toHaveProperty('name','newName');
            expect(response.body.data).toHaveProperty('email','new_email@gmail.com')
            expect(response.body.data).toHaveProperty('password','newpassword123')
            expect(response.body).toHaveProperty('message','User updated with success!')
            
                       
    });


    test('should not update the user using invalid token', async () => {
        
        let token = "thisISaTrashTokEn";
        
        const response = await request   // update user using invalid token
            .patch ("/api/v1/users")
            .set('Authorization', token) 
            .send({
                "name": "newName",
                "email": "new_email@gmail.com",
                "password": "newpassword123"
            })

            expect(response.status).toBe(403)
                       
    });


    test('should delete the user using his token', async ()=>{

        let token;
        await request  // delete all users
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })

        await request  // create new user
            .post('/api/v1/users')
            .send({
                "name": "user",
                "email": "user@gmail.com",
                "password": "user123"
              })
        
        await request  // authenticate user and get token
            .post('/api/v1/auth')
            .send({
                "email": "user@gmail.com",
                "password": "user123"
              })
              .then(response => {
                token = response.body.token
              });


        const delete_response = await request  // delete user using token
            .delete ("/api/v1/users")
            .set('Authorization', token)
        


        expect(delete_response.status).toBe(200)
        expect(delete_response.body).toHaveProperty('message','User deleted with success')


        const response = await request  // check if user is deleted
            .post('/api/v1/auth')
            .send({
                "email": "user@gmail.com",
                "password": "user123"
            })
          expect(response.status).toBe(401) 
        
    });



    test('should delete all users with valid admin key', async () => {
        
        const response = await request   // delete all using valid admin key
            .delete('/api/v1/all-users')
            .send({ key_admin: adminKey })
            
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Users deleted with success' });
    });


    test('should not delete users with invalid admin key', async () => {
        const invalidAdminKey = 'invalidKeyadmin123'; 
        
        const response = await request   // delete all using invalid admin key
            .delete('/api/v1/all-users')
            .send({ key_admin: invalidAdminKey })
            
    
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ message: 'Unauthorized access' });

    });
    
  
});



