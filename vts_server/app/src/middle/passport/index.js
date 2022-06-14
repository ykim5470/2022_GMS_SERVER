const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const Models = require('../../../../models')


passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.use(
    new LocalStrategy({usernameField: 'email', passwordField: 'password', session: true, passReqToCallback: true}, async(req, email, password, done) =>{
        try{
                const exUser = await Models.User.findOne({where: {email}})
                if(exUser){
                    const result = await bcrypt.compare(password, exUser.Password)
                    console.log(result)
                    if(result){
                        const sessUser = await Models.User.findOne({
                            where: { Id: exUser.Id },
                            include: [
                              {
                                model: Models.UserInfo,
                                include: [
                                  {
                                    model: Models.UserProfile,
                                    attributes: {
                                      exclude: ["Mail, PhoneNumber, Signup_Path"],
                                    },
                                  },
                                ],
                              },
                              {
                                model: Models.Authority,
                                include: [
                                  {
                                    model: Models.Auth,
                                  },
                                  {
                                    model: Models.Confirm,
                                  },
                                  {
                                    model: Models.Status,
                                  },
                                ],
                              },
                            ],
                            attributes: {
                              exclude: ["Password", "createdAt", "updatedAt", "deletedAt"],
                            },
                          });

                          let UserDict = {};
                          UserDict["Id"] = sessUser.Id;
                          UserDict["Email"] = sessUser.Email;
                          UserDict["Nick"] = sessUser.UserInfo.Nick;
                          UserDict["Auth"] = sessUser.Authority.Auth.Auth;
                          UserDict["Confirm"] = sessUser.Authority.Confirm.Confirm;
                          UserDict["Status"] = sessUser.Authority.Status.Status;
                          UserDict["ProfilePath"] = sessUser.UserInfo.UserProfile.ProfilePath;

                        done(null, UserDict)
                        
                    }else{
                        done(null, false, {message: 1})
                    }
                }else{
                    done(null, false, {message: 2})
                }
        }catch(err){
            console.error(err)
        }
    })
)



module.exports = passport

