async function inputData(req, bcrypt){
    const password = bcrypt.hash(req.body.password, 10);
    const confirm_password = bcrypt.hash(req.body.confirm_password, 10);
    if(await bcrypt.compare(password, confirm_password)){
        return null;
    }
    try {
        const user = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: password,
            work: req.body.work,
            location: req.body.location,
            description: req.body.description,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            linkedin: req.body.instagram,
            github: req.body.github,
        };
        return user;
    } catch (e) {
        res.redirect('/signup');
        console.log("some error occured, try again!!");
    }
}

module.exports = inputData;