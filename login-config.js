const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const e = require('express');
const flash = require('express-flash');
function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {message: 'No user with that mail exists!!'});
        }
        try {
            if(await bcrypt.compare(password,user.password)){
                done(null, user);
            }else{
                done(null, false, {message: 'Incorrect password!!'});
            }
        } catch (e) {
            done(e);
        }
    }

    passport.use(new localStrategy({usernameField:'email'}, authenticateUser));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser((id,done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;