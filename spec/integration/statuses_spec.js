const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/groceries/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;
const User = require("../../src/db/models").User;
const Status = require("../../src/db/models").Status;

describe("routes : statuses", () => {

 beforeEach((done) => {

   this.user;
   this.grocery;

   sequelize.sync({force: true}).then((res) => {
     User.create({
       email: "starman@tesla.com",
       password: "Trekkie4lyfe"
     })
     .then((res) => {
       this.user = res;

       Grocery.create({
         item: "Milk",
       }, {
         include: {
           model: Grocery,
           as: "groceries"
         }
       })
       .then((res) => {
         this.grocery = res
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });
 });

 describe("guest attempting to change status on a grocery item", () => {

    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 0
        }
      },
        (err, res, body) => {
          done();
        }
      );
    });

    describe("POST /groceries/:groceryId/statuses/create", () => {

      it("should not create a new status", (done) => {
        const options = {
          url: `${base}${this.grocery.id}/statuses/create`
        };

        let statusCountBeforeCreate;
        this.grocery.getStatuses()
        .then((statuses) => {
          statusCountBeforeCreate = statuses.length;

          request.grocery(options,(err, res, body) => {
              Status.all()
              .then((status) => {
                expect(statusCountBeforeCreate).toBe(status.length);
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            };
          )
        });
      });

    });

  });

  describe("signed in user favoriting a post", () => {

     beforeEach((done) => {  // before each suite in this context
       request.get({         // mock authentication
         url: "http://localhost:3000/auth/fake",
         form: {
           role: "member",     // mock authenticate as member user
           userId: this.user.id
         }
       },
         (err, res, body) => {
           done();
         }
       );
     });

     describe("POST /topics/:topicId/posts/:postId/favorites/create", () => {

       it("should create a favorite", (done) => {
         const options = {
           url: `${base}${this.topic.id}/posts/${this.post.id}/favorites/create`
         };
         request.post(options,
           (err, res, body) => {
             Favorite.findOne({
               where: {
                 userId: this.user.id,
                 postId: this.post.id
               }
             })
             .then((favorite) => {               // confirm that a favorite was created
               expect(favorite).not.toBeNull();
               expect(favorite.userId).toBe(this.user.id);
               expect(favorite.postId).toBe(this.post.id);
               done();
             })
             .catch((err) => {
               console.log(err);
               done();
             });
           }
         );
       });
     });

     describe("POST /topics/:topicId/posts/:postId/favorites/:id/destroy", () => {

       it("should destroy a favorite", (done) => {
         const options = {
           url: `${base}${this.topic.id}/posts/${this.post.id}/favorites/create`
         };

         let favCountBeforeDelete;

         request.post(options, (err, res, body) => {
           this.post.getFavorites()
           .then((favorites) => {
             const favorite = favorites[0];
             favCountBeforeDelete = favorites.length;

             request.post(`${base}${this.topic.id}/posts/${this.post.id}/favorites/${favorite.id}/destroy`,
               (err, res, body) => {
                 this.post.getFavorites()
                 .then((favorites) => {
                   expect(favorites.length).toBe(favCountBeforeDelete - 1);
                   done();
                 });
               }
             );
           });
         });
       });
     });


});
