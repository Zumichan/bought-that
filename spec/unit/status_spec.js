const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const User = require("../../src/db/models").User;
const Status = require("../../src/db/models").Status;

describe("Status", () => {

 beforeEach((done) => {
   this.user;
   this.grocery;
   this.status;

   sequelize.sync({force: true}).then((res) => {
     User.create({
       email: "user@gmail.com",
       password: "123456"
     })
     .then((res) => {
       this.user = res;

       Grocery.create({
         item: "Milk",
       })
       .then((res) => {
         this.grocery = res;
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });
 });

 describe("#create()", () => {

     it("should create a status for grocery item", (done) => {
       Status.create({
         userId: this.user.id
       })
       .then((status) => {
         expect(status.groceryId).toBe(this.grocery.id);
         expect(status.userId).toBe(this.user.id);
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create status without assigned grocery item or user", (done) => {
       Status.create({
         userId: null
       })
       .then((status) => {
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Status.userId cannot be null");
         expect(err.message).toContain("Status.groceryId cannot be null");
         done();
       })
     });

   });

   describe("#setUser()", () => {

     it("should associate a status and a user together", (done) => {

       Status.create({
         groceryId: this.grocery.id,
         userId: this.user.id
       })
       .then((status) => {
         this.status = status;
         expect(status.userId).toBe(this.user.id);

         User.create({
           email: "bob@example.com",
           password: "password"
         })
         .then((newUser) => {
           this.status.setUser(newUser)
           .then((status) => {
             expect(status.userId).toBe(newUser.id);
             done();
           });
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       })
     });

   });

   describe("#getUser()", () => {

     it("should return the associated user", (done) => {
       Status.create({
         userId: this.user.id,
         groceryId: this.grocery.id
       })
       .then((status) => {
         status.getUser()
         .then((user) => {
           expect(user.id).toBe(this.user.id);
           done();
         })
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });

   describe("#setGrocery()", () => {

     it("should associate a grocery item and a status together", (done) => {

       Status.create({
         groceryId: this.grocery.id,
         userId: this.user.id
       })
       .then((status) => {
         this.status = status;

         Grocery.create({
           item: "Cheese",
           groceryId: this.grocery.id,
           userId: this.user.id
         })
         .then((newGrocery) => {
           expect(this.status.groceryId).toBe(this.grocery.id);
           this.status.setGrocery(newGrocery)
           .then((status) => {
             expect(status.groceryId).toBe(newGrocery.id);
             done();
           });
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       });
     });

   });

   describe("#getGrocery()", () => {

     it("should return the associated grocery item", (done) => {
       Status.create({
         userId: this.user.id,
         groceryId: this.grocery.id
       })
       .then((status) => {
         this.comment.getGrocery()
         .then((associatedGrocery) => {
           expect(associatedGrocery.item).toBe("Cheese");
           done();
         });
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });

});
